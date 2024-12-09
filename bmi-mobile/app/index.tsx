import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

import FoodContainer from './components/lab';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext } from 'react';

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <FoodContainer/>
    </SafeAreaView>
  );
}
