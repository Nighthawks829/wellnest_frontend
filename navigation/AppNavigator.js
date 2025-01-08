import { NavigationContainer } from "@react-navigation/native";
import FirstPage from "../src/screens/FirstPage";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../src/screens/LoginPage";
import ForgotPasswordPage from "../src/screens/ForgotPasswordPage";
import RegisterPage from "../src/screens/RegisterPage";
import MainPage from "../src/screens/ElderlyNCaregivers/MainPage"
import MedicationReminderPage from "../src/screens/ElderlyNCaregivers/MedicationReminderPage";
import AddReminder from "../src/screens/ElderlyNCaregivers/AddReminder";
const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="FirstPage"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="FirstPage" component={FirstPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={{ title: "Home" }}
            />
            <Stack.Screen
                name="MedicationReminderPage"
                component={MedicationReminderPage}
                options={{ title: "MedicationReminder" }}
            />

            <Stack.Screen name="AddReminder" component={AddReminder} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;