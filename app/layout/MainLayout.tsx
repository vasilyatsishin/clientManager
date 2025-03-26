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
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeTheme } from "../redux/slices/generalSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../navigation/types";
import UserMenu from "./UserMenu";
import { BlurView } from "expo-blur";

interface MainLayoutProps {
  children: ReactNode;
  activePage: string;
}

const screenWidth = Dimensions.get("window").width;

const MainLayout: FC<MainLayoutProps> = ({ children, activePage }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
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

  const toggleRotation = () => {
    Animated.timing(rotationAnim, {
      toValue: isActionMenuOpen ? 0 : 1, // 0 — стандартний стан, 1 — повернутий на 45 градусів
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsActionMenuOpen(!isActionMenuOpen);
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
          <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              source={require("../assets/img/userIcon.png")}
              style={styles.iconUser}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.component}>{children}</View>
        <View style={[styles.bottomNav]}>
          <View style={styles.bottomNavContainer}>
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
          </View>
        </View>
        {!isMenuOpen && (
          <TouchableOpacity style={styles.buttonAdd} onPress={toggleRotation}>
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
        )}
      </View>

      {/* Спливаюче меню дій */}
      <Modal
        transparent
        visible={isActionMenuOpen}
        animationType="fade"
        onRequestClose={toggleRotation}
      >
        <BlurView intensity={15} style={styles.overlay}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>
                ДОДАВАННЯ ТОРГОВОЇ ТОЧКИ В МАРШРУТ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>
                СТВОРЕННЯ КОНТРАГЕНТА ТА ДОГОВОРУ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>СТВОРЕННЯ ТОРГОВОЇ ТОЧКИ</Text>
            </TouchableOpacity>
            <View style={styles.whiteContainer}></View>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.buttonAdd} onPress={toggleRotation}>
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
      </Modal>

      {isMenuOpen && (
        <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
    width: "100%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "#223444",
  },
  bottomNavContainer: {
    height: "100%",
    width: "75%",
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
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menu: {
    backgroundColor: "none",
    paddingVertical: 10,
    marginRight: 20,
    alignItems: "flex-end",
    width: "95%", // або Dimensions.get("window").width * 0.8 для динамічної ширини
    alignSelf: "flex-end",
    bottom: 100,
  },
  menuItem: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#f5f5f5",
    marginVertical: 5,
    flexWrap: "nowrap",
  },
  menuText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    marginHorizontal: 10,
    color: "#223444",
  },
  buttonAdd: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 25,
    zIndex: 100, // Вищий рівень відображення
    elevation: 10, // Для Android,
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
  activePageText: {
    marginLeft: 15,
    color: "white",
    fontFamily: "Montserrat",
    letterSpacing: 0,
  },
  whiteContainer: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "white",
    position: "absolute",
    top: 150,
    right: 60,
  },
});

export default MainLayout;
