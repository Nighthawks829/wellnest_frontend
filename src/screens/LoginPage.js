import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "../components/styles"; // Import shared styles
import { Ionicons } from "@expo/vector-icons"; // Import icons from Expo
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../config/config";
import { useNotification } from "../../context/NotificationProvider";

const LoginPage = () => {
  const [phoneNo, setphoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false); // For toggling password visibility
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const { initializeInterval } = useNotification();
  const handleLogin = async () => {
    console.log("Handle Login");
    setphoneNo("");
    setPassword("");
    // Handle login logic here, e.g., send to backend for validation
    //console.log('Logging in with IC:', phoneNo, 'Password:', password);
    // You can add your login authentication logic here
    // If login is successful, call the handleLogin function
    // if (username === 'test' && password === 'password') {  // Replace with actual logic
    //   handleLogin();
    // } else {
    //   alert('Invalid credentials');
    // }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        phoneNo,
        password,
      });

      console.log(response.data);

      const { token, role, full_name, userId } = response.data;

      if (token && userId) {
        await login(token); // Use login function from AuthProvider to set token
        // Save the token and userId using AsyncStorage
        await AsyncStorage.setItem("token", token);
        // await AsyncStorage.setItem("userId", userId.toString());

        // Save `userId` and `full_name` in AsyncStorage
        if (userId) {
          await AsyncStorage.setItem("userId", userId.toString());
        } else {
          console.warn("UserId not found in response.");
        }

        // Optional: Save user details
        if (full_name) {
          await AsyncStorage.setItem("full_name", full_name);
        }
        console.log("Login successful. Stored userId:", userId);
        initializeInterval();

        // Navigate based on role
        if (role === "1" || role === "4") {
          navigation.navigate("MainPage");
        } else if (role === "2") {
          navigation.navigate("CommunityOrganizerMainPage");
        } else if (role === "3") {
          navigation.navigate("HealthcareProviderMainPage");
        } else {
          alert("Invalid role");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed");
    }
  };

  // useEffect(() => {
  //   const debugAsyncStorage = async () => {
  //     const storedUserId = await AsyncStorage.getItem("userId");
  //     console.log("Debug Stored userId after login:", storedUserId);
  //   };
  //   debugAsyncStorage();
  // }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}> {/* Dismiss keyboard on touch outside */}
    // <View style={{ flex: 1 }}> {/* Wrap in a single View */}
    <ImageBackground
      source={require("../../assets/LoadingBackground.png")}
      style={styles.background}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleFirstLine}>Welcome to</Text>
        <Text style={styles.titleSecondLine}>WellNest</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Welcome again!{"\n"}Please log in.</Text>

        {/* Identity Card Input with Icon */}
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNo}
            onChangeText={setphoneNo}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
        </View>

        {/* Password Input with Icon */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={24}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            placeholderTextColor="#888"
          />
          {/* Make sure TouchableOpacity wraps around the icon properly */}
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "flex-start", width: "90%" }}>
          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Link in Orange */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Don't Have An Account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    // </View>
    // </TouchableWithoutFeedback>
  );
};

export default LoginPage;
