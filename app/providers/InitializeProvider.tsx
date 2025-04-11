import {
  createContext,
  FC,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IContext, UserInfoResponse } from "../interfaces/interfaces";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { changeSectors, changeTheme } from "../redux/slices/generalSlice";
import { isTokenExpired, refresh } from "../functions/auth";
import * as SecureStore from "expo-secure-store";
import { setAccessToken, setUserInfo } from "../redux/slices/authSlice";
import Preload from "../components/generalComponents/Preload";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("ClientManagerLocalDB")
export const InitializeContext = createContext<IContext>({} as IContext);

interface InitializeProviderProps {
  children: ReactNode;
}

export const InitializeProvider: FC<InitializeProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true)
  const dispatch = useDispatch();
  const initializeApp = async () => {
    setIsInitializing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setError(null);
    const accessToken = await AsyncStorage.getItem("accessToken");

    const refreshingFunc = async (token: string) => {
      const { accessToken } = await refresh(token);
      await AsyncStorage.setItem("accessToken", accessToken);
      token = await AsyncStorage.getItem("accessToken");
      const savedTheme = await AsyncStorage.getItem("theme");
      const userId = await AsyncStorage.getItem("userId");
      const savedSectors = await AsyncStorage.getItem("sectors");

      await dispatch(
        setUserInfo({
          sector: JSON.parse(savedSectors),
          userId: JSON.parse(userId),
        })
      );
      dispatch(setAccessToken(token));
      dispatch(changeTheme(savedTheme));
      dispatch(changeSectors(JSON.parse(savedSectors)));
    };

    const initializingIfTokenValid = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const userId = await AsyncStorage.getItem("userId");
      const savedSectors = await AsyncStorage.getItem("sectors");
      const token = await AsyncStorage.getItem("accessToken");

      await dispatch(
        setUserInfo({
          sector: JSON.parse(savedSectors),
          userId: JSON.parse(userId),
        })
      );
      dispatch(setAccessToken(token));
      dispatch(changeTheme(savedTheme));
      dispatch(changeSectors(JSON.parse(savedSectors)));
    }
    if (accessToken != null) {
      try {
        let token = await AsyncStorage.getItem("accessToken");
        const expiredToken = isTokenExpired(token);
        
        if (expiredToken) {
          await refreshingFunc(token);
        } else {
          await initializingIfTokenValid()
        }
        
      } catch (error) {
        if (error.message == "401") {
          dispatch(setAccessToken(null));
          dispatch(setUserInfo(null));
        }
      } finally {
        setIsInitializing(false);
      }
    } else {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      setUser,
      initializeApp,
      setIsLoading,
      isInitializing
    }),
    [user, isLoading]
  );

  // if (isInitializing) {
  //   return (
  //     <Preload />
  //   );
  // }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 10, color: "red", textAlign: "center" }}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={initializeApp}
          style={{
            padding: 10,
            backgroundColor: "#007bff",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Повторити спробу
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <InitializeContext.Provider value={value}>
      {children}
    </InitializeContext.Provider>
  );
};
