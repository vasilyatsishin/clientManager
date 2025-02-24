import { InitializeProvider } from "./app/providers/InitializeProvider";
import Navigation from "./app/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
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
