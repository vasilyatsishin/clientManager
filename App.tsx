import { AuthProvider } from "./app/providers/AuthProvider";
import Navigation from "./app/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
        <Provider store={store}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </Provider>
    </NavigationContainer>
  );
}
