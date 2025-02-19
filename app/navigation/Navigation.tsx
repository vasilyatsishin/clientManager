import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TypeRootStackParamList } from "./types";
import { useAuth } from "../hooks/useAuth";
import Auth from "../components/screens/Auth";
import Confirmation from "../components/screens/Confirmation";
import MainScreen from "../components/screens/MainScreen";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const Navigation: FC = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
