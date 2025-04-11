import { InitializeProvider } from "./app/providers/InitializeProvider";
import Navigation from "./app/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { runMigrations } from "./app/sqlite/migrations";
import { useFonts } from "expo-font";
import { initDatabase } from "./app/sqlite/sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [font] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./app/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./app/assets/fonts/Montserrat-Medium.ttf"),
  });
  useEffect(() => {
    runMigrations();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Provider store={store}>
          <InitializeProvider>
            <Navigation />
          </InitializeProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
