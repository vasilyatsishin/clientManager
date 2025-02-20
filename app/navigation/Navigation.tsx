import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "./types";
import { useAuth } from "../hooks/useAuth";
import Auth from "../components/screens/Auth";
import Confirmation from "../components/screens/Confirmation";
import Documents from "../components/screens/Documents";
import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

const Navigation: FC = () => {
  const { user } = useAuth();
  const activePage = useSelector(
    (state: RootState) => state.generalSlice.activePage
  );
  return (
    <>
      {user ? (
        <>
          <MainLayout activePage={activePage}>
            <Stack.Navigator
              id={undefined}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Documents" component={Documents} />
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
