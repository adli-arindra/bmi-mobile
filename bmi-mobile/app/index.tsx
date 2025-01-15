import { FoodProvider } from './components/context';
import FoodContainer from './components/lab';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Main() {
  return (
    <SafeAreaView>
      <FoodProvider>
        <FoodContainer/>
      </FoodProvider>
    </SafeAreaView>
  );
}
