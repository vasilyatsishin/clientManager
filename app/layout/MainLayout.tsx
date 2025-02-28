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
  TouchableWithoutFeedback,
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
  const menuAnimation = useRef(new Animated.Value(screenWidth)).current;

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
      toValue: isMenuOpen ? screenWidth : screenWidth * 0.3,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuAnimation, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          backgroundColor: theme === "food" ? colors.food : colors.nonfood,
        }}
        edges={["top"]}
      >
        <StatusBar barStyle="default" />
        <View
          style={[
            styles.upperNav,
            {
              backgroundColor: theme === "food" ? colors.food : colors.nonfood,
            },
          ]}
        >
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
              backgroundColor: "#2F4F4F",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Documents")}
          >
            <Image
              source={require("../assets/img/list.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddContragent")}
          >
            <Image
              source={require("../assets/img/addContragent.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Route")}
          >
            <Image
              source={require("../assets/img/routeIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Chat")}
          >
            <Image
              source={require("../assets/img/chat.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View
              style={[styles.menuContainer, { left: menuAnimation }]}
            >
              <View style={styles.containerForButtons}>
                {sectors.length > 1 &&
                  sectors.map((sector, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        dispatch(changeTheme(sector));
                      }}
                      style={[
                        styles.chooseButton,
                        {
                          backgroundColor:
                            sector === "food" ? colors.food : colors.nonfood,
                        },
                      ]}
                    >
                      <Text style={styles.buttonText}>
                        {sector === "food" ? "Food" : "Non-Food"}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  component: {
    flex: 1,
  },
  bottomNav: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  upperNav: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconUser: {
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 20,
  },
  button: {
    width: "25%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнення фону
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    padding: 15,
    alignSelf: "flex-start",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000",
  },
  containerForButtons: {},
  chooseButton: {
    width: 200,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
});

export default MainLayout;
