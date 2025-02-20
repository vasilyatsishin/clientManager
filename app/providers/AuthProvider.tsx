import {
  createContext,
  FC,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IContext, UserInterface } from "../interfaces/interfaces";
import { Alert } from "react-native";
import { login } from "../functions/auth";
import { useDispatch } from "react-redux";
import { setIsExist } from "../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../navigation/types";

export const AuthContext = createContext<IContext>({} as IContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  useEffect(() => {
    // setUser({ name: "Vasyl", sector: ["nonfood"] });
  }, []);

  const loginHandler = async (bosId: number) => {
    setIsLoading(true);
    try {
      const response = login(bosId);
      if (response.exist) {
        dispatch(setIsExist(true));
      }
      navigation.navigate("Confirmation");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      setUser,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [user, isLoading, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
