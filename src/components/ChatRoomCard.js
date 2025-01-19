// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// const ChatRoomCard = ({ title, onJoin ,group_photo}) => {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.title}>{group_photo}</Text>
//       <Button title="Join" onPress={onJoin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#d6e4ff",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
// });

// export default ChatRoomCard;
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from "../../config/config";
import axios from "axios";


const ChatRoomCard = ({ group_id, title, onJoin, group_photo, fetchChatRoom }) => {

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const url = `${API_BASE_URL}/support_group/${group_id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(url, config);


      Alert.alert("Success", `Successfully removed group ${title}`);
      fetchChatRoom()
      // Update the state to remove the user from the list

    } catch (error) {
      console.log('Error deleting users:', error.message);
      Alert.alert("Error", "Failed to delete group. Try again later.");
    }
  }

  return (
    <View style={styles.card}>
      {group_photo ? (
        <Image source={{ uri: group_photo }} style={styles.groupPhoto} />
      ) : (
        <Ionicons name="medkit-outline" size={150} color="#007bff" style={styles.icon} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Join" onPress={onJoin} />
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d6e4ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  groupPhoto: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  icon: {
    width: '100%',
    height: 150,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default ChatRoomCard;
