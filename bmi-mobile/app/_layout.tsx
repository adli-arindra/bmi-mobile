import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Animated, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const bounceAnim = useState(new Animated.Value(0))[0]; // Bounce animation for final dino
  const fadeAnim = useState(new Animated.Value(1))[0]; // Fade animation for food-to-final transition
  const growAnim = useState(new Animated.Value(1))[0]; // Dino growing effect
  const textFadeAnim = useState(new Animated.Value(1))[0]; // Text fade-out effect
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter(); // Router for navigating to index.tsx

  const images = [
    require("../assets/images/dino.png"), // Initial dino
    require("../assets/images/food/Chickin.png"),
    require("../assets/images/food/Beef.png"),
    require("../assets/images/food/Salad.png"),
    require("../assets/images/food/Chilli.png"),
    require("../assets/images/food/Chocolate.png"),
    require("../assets/images/food/Fries.png"),
    require("../assets/images/food/Paper.png"),
    require("../assets/images/food/Hammer.png"),
  ];

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
      startTransitionLoop();
    }
  }, [appIsReady, fontsLoaded]);

  const startTransitionLoop = () => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === images.length - 2) {
          // Stop at the hammer and start fade transition
          clearInterval(interval); // Stop the food transition loop
          fadeToFinalScreen(); // Trigger final transition with fade effect
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 200); // Faster transitions for food images
  };

  const fadeToFinalScreen = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out food images
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex(images.length); // Switch to final dino after fade-out
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in final screen
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        showFinalScreen(); // Start the bounce animation
      });
    });
  };

  const showFinalScreen = () => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: -20, // Move up
          friction: 2,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0, // Move down
          friction: 2,
          tension: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Transition to the index screen after 3 seconds
    setTimeout(() => {
      transitionToIndex();
    }, 3000);
  };

  const transitionToIndex = () => {
    Animated.parallel([
      // Dino grows
      Animated.timing(growAnim, {
        toValue: 2, // Scale the dino to twice its size
        duration: 1000,
        useNativeDriver: true,
      }),
      // Text fades out
      Animated.timing(textFadeAnim, {
        toValue: 0, // Make the text disappear
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/"); // Navigate to the index screen
    });
  };

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#BBF7D2",
        }}
      >
        {currentImageIndex < images.length - 1 ? (
          // Display food or dino images with fade effect
          <Animated.Image
            source={images[currentImageIndex]}
            style={{
              width: currentImageIndex === 0 ? 200 : 100, // Larger size for initial dino
              height: currentImageIndex === 0 ? 200 : 100,
              opacity: fadeAnim, // Apply fade animation
              resizeMode: "contain",
            }}
          />
        ) : (
          // Final screen: Dino with "BMI Calculator" text
          <>
            <Animated.Image
              source={require("../assets/images/dino.png")}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
                transform: [
                  { translateY: bounceAnim },
                  { scale: growAnim }, // Apply growing animation
                ],
              }}
            />
            <Animated.Text
              style={{
                marginTop: -20,
                fontSize: 30,
                fontWeight: "bold",
                color: "#4A00FF", // BMI Calculator color
                opacity: textFadeAnim, // Apply fade-out effect to text
              }}
            >
              BMI Calculator
            </Animated.Text>
          </>
        )}
      </View>
    </>
  );
}
