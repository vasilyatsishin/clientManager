import { InitializeProvider } from "./app/providers/InitializeProvider";
import Navigation from "./app/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { initDatabase } from "./app/sqlite/sqlite";

export default function App() {
  useEffect(() => {
    initDatabase()
  }, [])
  return (
    <NavigationContainer>
      <Provider store={store}>
        <InitializeProvider>
          <Navigation />
        </InitializeProvider>
      </Provider>
    </NavigationContainer>
  );
}
