import { Stack, useRouter, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import { AppState, AppStateStatus } from "react-native";
import { auth } from "./firebase/app/auth";
import { loadData, saveData } from "./firebase/app/db";
import { PersonProvider } from "./components/personContext";

const enableSplash = false;
// SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (navigationState?.key && enableSplash) {
      router.replace("/splash");
    }
  }, [navigationState?.key]);


  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
            // Load data when the app comes to the foreground
            const user = auth.currentUser;
            if (user) {
                const userData = await loadData(user.email!);
                if (userData) {
                    console.log("Loaded user data:", userData);
                } else {
                    console.log("No data found for this user.");
                }
            }
        } else if (nextAppState === "background") {
            // Save data when the app goes to the background
            const user = auth.currentUser;
            if (user) {
                const weight = 70; // Replace with actual data
                const height = 175; // Replace with actual data
                const result = await saveData(user.email!, weight, height);
                if (result) {
                    console.log("Data saved successfully.");
                } else {
                    console.log("Failed to save data.");
                }
            }
        }
    };

    // Listen to app state changes
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // Cleanup listener on unmount
    return () => subscription.remove();
  }, []);

    return (
        <PersonProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "#f8f9fa" },
                    headerTintColor: "#333",
                    headerTitleStyle: { fontWeight: "bold" },
                    headerShown: false,
                }}
            />
        </PersonProvider>
    );
}
