import { FC, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Pressable,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAccessToken, setUserInfo } from "../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";
import { colors } from "../assets/colors";
import { changeTheme } from "../redux/slices/generalSlice";

const screenWidth = Dimensions.get("window").width;

interface UserMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const UserMenu: FC<UserMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const sectors = useSelector((state: RootState) => state.generalSlice.sectors);
  const menuAnimation = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? screenWidth * 0.2 : screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  const closeMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuAnimation, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    }
  };

  const logout = async () => {
    dispatch(setAccessToken(null));
    dispatch(setUserInfo(null));
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync("refreshToken");
  };

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Pressable style={styles.overlay} onPress={closeMenu} />
      <Animated.View style={[styles.menuContainer, { left: menuAnimation }]}>
        <View style={{ alignItems: "center", top: 150 }}>
          <Image
            source={require("../assets/img/userIcon.png")}
            style={{ width: 70, height: 70 }}
          />
          <Text style={styles.name}>Name Name</Text>
          {sectors?.length > 1 && (
            <View style={styles.containerForButtons}>
              {sectors.map((sector, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => dispatch(changeTheme(sector))}
                  style={[
                    styles.chooseButton,
                    {
                      backgroundColor:
                        sector === "Food" ? colors.food : colors.nonfood,
                      width: sector === "Food" ? 70 : 100,
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {sector === "Food" ? "FOOD" : "NON-FOOD"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Text style={[styles.logoutText]}>Вийти</Text>
          <Image
            source={require("../assets/img/logoutIcon.png")}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: "100%",
    alignItems: "center",
    borderRadius: 20,
  },
  containerForButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: 190,
    height: 40,
    justifyContent: "space-around",
    borderRadius: 100,
    backgroundColor: "white", // Додано фон, щоб тінь була видимою
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Було 5 (неправильно), має бути 0-1
    shadowRadius: 5,
    elevation: 5, // Додано для Android
  },

  chooseButton: {
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Montserrat",
  },
  logoutContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 50,
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#EB1E30",
    marginRight: 3,
  },
  logoutIcon: {
    width: 12,
    height: 12,
  },
  name: {
    fontFamily: "Montserrat",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "#223444",
  },
});

export default UserMenu;
