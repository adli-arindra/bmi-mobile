import { FoodProvider } from './components/foodContext';
import FoodContainer from './components/lab';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/header';
import { PersonProvider } from './components/personContext';

export default function Main() {
  return (
    <SafeAreaView>
      <PersonProvider>
        <FoodProvider>
          <Header/>
          <FoodContainer/>
        </FoodProvider>
      </PersonProvider>
    </SafeAreaView>
  );
}
