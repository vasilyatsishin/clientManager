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
import { Alert, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { login } from "../functions/auth";
import { useDispatch } from "react-redux";
import { setIsExist } from "../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../navigation/types";
import { changeSectors, changeTheme } from "../redux/slices/generalSlice";

export const InitializeContext = createContext<IContext>({} as IContext);

interface InitializeProviderProps {
  children: ReactNode;
}

export const InitializeProvider: FC<InitializeProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Додаємо стан для помилки
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const initializeApp = async () => {
    setIsLoading(true);
    setError(null); // Очищаємо попередню помилку

    try {
      // await AsyncStorage.setItem("sectors", JSON.stringify(["food", "nonfood"]))
      let savedTheme = await AsyncStorage.getItem("theme");
      let savedSectors = await AsyncStorage.getItem("sectors")

      dispatch(changeTheme(savedTheme));
      dispatch(changeSectors(JSON.parse(savedSectors)));
    } catch (error) {
      console.error("Помилка ініціалізації:", error);
      setError("Не вдалося завантажити дані. Перевірте інтернет і повторіть спробу.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);


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
      logout: logoutHandler,
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
        <Text style={{ marginBottom: 10, color: "red", textAlign: "center" }}>{error}</Text>
        <TouchableOpacity
          onPress={initializeApp}
          style={{
            padding: 10,
            backgroundColor: "#007bff",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Повторити спробу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <InitializeContext.Provider value={value}>{children}</InitializeContext.Provider>;
};
