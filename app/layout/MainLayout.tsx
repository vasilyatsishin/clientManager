import { FC, ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";
import { changeTheme } from "../redux/slices/generalSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../navigation/types";
import UserMenu from "./UserMenu";

interface MainLayoutProps {
  children: ReactNode;
  activePage: string;
}

const screenWidth = Dimensions.get("window").width;

const MainLayout: FC<MainLayoutProps> = ({ children, activePage }) => {

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);
  const sectors = useSelector((state: RootState) => state.generalSlice.sectors);
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(screenWidth)).current;
  const [isRotated, setIsRotated] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        dispatch(changeTheme(storedTheme));
      }
    };
    loadTheme();
  }, [dispatch]);

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? screenWidth: screenWidth * 0.2,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleRotation = () => {
    Animated.timing(rotationAnim, {
      toValue: isRotated ? 0 : 1, // 0 — стандартний стан, 1 — повернутий на 45 градусів
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsRotated(!isRotated);
  };

  const rotateInterpolation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          backgroundColor: theme === "Food" ? colors.food : colors.nonfood,
        }}
        edges={["top"]}
      >
        <StatusBar barStyle="default" />
        <View
          style={[
            styles.upperNav,
            {
              backgroundColor: theme === "Food" ? colors.food : colors.nonfood,
            },
          ]}
        >
          <Text style={styles.activePageText}>{activePage}</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Image
              source={require("../assets/img/userIcon.png")}
              style={styles.iconUser}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.component}>{children}</View>
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: "#223444",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NotSended")}
          >
            <Image
              source={require("../assets/img/newIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sended")}
          >
            <Image
              source={require("../assets/img/sended.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Chat")}
          >
            <Image
              source={require("../assets/img/chatIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              toggleRotation();
              setIsChatMenuOpen((prev) => !prev); // Перемикаємо стан модального вікна
            }}
          >
            <View style={styles.redContainerButtonAdd}>
              <Animated.Image
                source={require("../assets/img/plusIcon.png")}
                style={[
                  styles.plusIcon,
                  { transform: [{ rotate: rotateInterpolation }] },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isMenuOpen && (
        <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  component: {
    flex: 1,
  },
  bottomNav: {
    height: 60,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  upperNav: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconUser: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 34,
    width: 46,
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonAdd: {
    width: 60,
    height: 60,
    position: "static",
    marginBottom: 35,
  },
  redContainerButtonAdd: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.food,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: 27.75,
    height: 27.75,
  },
  plusIconWrapped: {},
  activePageText: {
    marginLeft: 15,
    color: "white",
    fontFamily: "Montserrat-Regular",
    letterSpacing: 0,
  },
});

export default MainLayout;
