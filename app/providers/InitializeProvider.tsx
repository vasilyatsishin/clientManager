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
import { isTokenExpired, parseJwt, refresh } from "../functions/auth";
import * as SecureStore from "expo-secure-store";
import { setAccessToken, setUserInfo } from "../redux/slices/authSlice";

export const InitializeContext = createContext<IContext>({} as IContext);

interface InitializeProviderProps {
  children: ReactNode;
}

export const InitializeProvider: FC<InitializeProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const initializeApp = async () => {
    // await SecureStore.deleteItemAsync("refreshToken")
    // await AsyncStorage.removeItem("accessToken")
    setIsLoading(true);
    setError(null);
    const accessToken = await AsyncStorage.getItem("accessToken")
    
    if(accessToken != null) {
      try {
        let token = await AsyncStorage.getItem("accessToken");       
        const expiredToken = isTokenExpired(accessToken);
        
        if (expiredToken) {
          const refreshToken = await SecureStore.getItemAsync("refreshToken");
          const { accessToken } = await refresh(refreshToken);
          await AsyncStorage.setItem("accessToken", accessToken);
          token = await AsyncStorage.getItem("accessToken");
          const savedTheme = await AsyncStorage.getItem("theme");
          const userId = await AsyncStorage.getItem("userId");
          const savedSectors = await AsyncStorage.getItem("sectors");
  
          dispatch(setAccessToken(token))
          dispatch(changeTheme(savedTheme));
          dispatch(changeSectors(JSON.parse(savedSectors)));
          dispatch(
            setUserInfo({
              sector: JSON.parse(savedSectors),
              userId: JSON.parse(userId),
            })
          );
        } else {
          const savedTheme = await AsyncStorage.getItem("theme");
          const userId = await AsyncStorage.getItem("userId");
          const savedSectors = await AsyncStorage.getItem("sectors");
          const token = await AsyncStorage.getItem("accessToken")
  
          dispatch(setAccessToken(token))
          dispatch(changeTheme(savedTheme));
          dispatch(changeSectors(JSON.parse(savedSectors)));
          dispatch(
            setUserInfo({
              sector: JSON.parse(savedSectors),
              userId: JSON.parse(userId),
            })
          );
        }
      } catch (error) {
        console.error("Помилка ініціалізації:", error);
        setError(
          "Не вдалося завантажити дані. Перевірте інтернет і повторіть спробу."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
      initializeApp
    }),
    [user, isLoading]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Завантаження...</Text>
      </View>
    );
  }

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
