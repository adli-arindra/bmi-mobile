import { Stack, useRouter, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";

const enableSplash = true;
SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (navigationState?.key && enableSplash) {
      router.replace("/splash");
    }
    // else {
    //   console.log("done");
    //   SplashScreen.hideAsync();
    //   router.replace("/");
    // }
  }, [navigationState?.key]);

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#f8f9fa" },
                headerTintColor: "#333",
                headerTitleStyle: { fontWeight: "bold" },
                headerShown: false,
            }}
        />
    );
}
