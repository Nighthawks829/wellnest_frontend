import { NavigationContainer } from "@react-navigation/native";
import FirstPage from "../src/screens/FirstPage";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../src/screens/LoginPage";
import ForgotPasswordPage from "../src/screens/ForgotPasswordPage";
import RegisterPage from "../src/screens/RegisterPage";
import MainPage from "../src/screens/ElderlyNCaregivers/MainPage"
import MedicationReminderPage from "../src/screens/ElderlyNCaregivers/MedicationReminderPage";
import AddReminder from "../src/screens/ElderlyNCaregivers/AddReminder";
import SocialEventsScreen from "../src/screens/ElderlyNCaregivers/SocialEventsScreen";
import CommunityOrganizerMainPage from "../src/screens/CommunityOrganizers/CommunityOrganizerMainPage";
import CoProfilePage from "../src/screens/CommunityOrganizers/CoProfilePage";
import CoEditProfilePage from "../src/screens/CommunityOrganizers/CoEditProfilePage";
import CoSocialEventsManagement from "../src/screens/CommunityOrganizers/CoSocialEventsManagement";
import CoCreateEvents from "../src/screens/CommunityOrganizers/CoCreateEvents";
import CoCreateChatRoom from "../src/screens/CommunityOrganizers/CoCreateChatRoom";
import ChatRoom from "../src/screens/CommunityOrganizers/ChatRoom";
import CoManageChatRoom from "../src/screens/CommunityOrganizers/CoManageChatRoom";


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
            <Stack.Screen name="SocialEventsScreen" component={SocialEventsScreen} />
            <Stack.Screen
                name="SocialEventsManagementScreen"
                component={CoSocialEventsManagement}
            />
            <Stack.Screen
                name="CommunityOrganizerMainPage"
                component={CommunityOrganizerMainPage}
                options={{ title: "CommunityOrganizerMainPage" }}
            />
            <Stack.Screen name="CoCreateEvents" component={CoCreateEvents} />
            <Stack.Screen name="AddChatRoom" component={CoCreateChatRoom} />
            <Stack.Screen name="chatRoom" component={ChatRoom} />
            <Stack.Screen name="CoManageChatRoom" component={CoManageChatRoom} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;