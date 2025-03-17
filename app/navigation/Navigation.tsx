import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./types";
import Auth from "../components/screens/Auth";
import Confirmation from "../components/screens/Confirmation";
import Documents from "../components/screens/NotSended";
import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Route from "../components/screens/Route";
import AddContragent from "../components/screens/Sended";
import Chat from "../components/screens/Chat";
import NotSended from "../components/screens/NotSended";
import Sended from "../components/screens/Sended";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const Navigation: FC = () => {
  // const { user } = useAuth();
  const activePage = useSelector(
    (state: RootState) => state.generalSlice.activePage
  );

  const user = useSelector(
    (state: RootState) => state.authSlice.user
  );
  return (
    <>
      {user ? (
        <>
          <MainLayout activePage={activePage}>
            <Stack.Navigator
              id={undefined}
              screenOptions={{ headerShown: false, animation: "none"}}
            >
              <Stack.Screen name="NotSended" component={NotSended} />
              <Stack.Screen name="Sended" component={Sended} />
              <Stack.Screen name="AddContragent" component={AddContragent} />
              <Stack.Screen name="Chat" component={Chat} />
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
