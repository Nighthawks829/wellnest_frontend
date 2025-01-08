// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from "react";
import { AuthProvider } from "./context/AuthProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>

      <AuthProvider>
        <NotificationProvider>

          <AppNavigator />
          {/* <MedicationsScreen /> */}
        </NotificationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}