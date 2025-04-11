import { FC, useEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./types";
import Auth from "../components/screens/Auth";
import Confirmation from "../components/screens/Confirmation";
import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Chat from "../components/screens/Chat";
import NotSended from "../components/screens/NotSended";
import Sended from "../components/screens/Sended";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AddClient from "../components/screens/AddClient/AddClient";
import Address from "../components/screens/Address";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const Navigation: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  // const { user } = useAuth();
  const activePage = useSelector(
    (state: RootState) => state.generalSlice.activePage
  );

  const user = useSelector((state: RootState) => state.authSlice.user);

  const isMainLayoutShown = useSelector(
    (state: RootState) => state.generalSlice.isMainLayoutShown
  );

  return (
    <>
      {user ? (
        <>
          <MainLayout activePage={activePage}>
            <Stack.Navigator
              id={undefined}
              screenOptions={{ headerShown: false, animation: "none", gestureEnabled: false }}
            >
              <Stack.Screen name="NotSended" component={NotSended} />
              <Stack.Screen name="Sended" component={Sended} />
              <Stack.Screen name="AddClient" component={AddClient} options={{gestureEnabled: false}}/>
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Address" component={Address} />
            </Stack.Navigator>
          </MainLayout>
        </>
      ) : (
        <>
          <Stack.Navigator
            id={undefined}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};

export default Navigation;
