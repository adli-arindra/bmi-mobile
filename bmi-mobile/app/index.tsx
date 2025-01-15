import { FoodProvider } from './components/context';
import FoodContainer from './components/lab';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/header';

export default function Main() {
  return (
    <SafeAreaView>
      <FoodProvider>
        <Header/>
        <FoodContainer/>
      </FoodProvider>
    </SafeAreaView>
  );
}
