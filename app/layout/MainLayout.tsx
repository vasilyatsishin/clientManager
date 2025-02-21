import { FC, ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
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

const MainLayout: FC<MainLayoutProps> = ({ children, activePage }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const route = require("../assets/img/routeIcon.png");
  const list = require("../assets/img/list.png");
  const chat = require("../assets/img/chat.png");
  const addContragent = require("../assets/img/addContragent.png");
  const iconUser = require("../assets/img/userIcon.png");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        dispatch(changeTheme(storedTheme));
      }
    };

    loadTheme();
  }, [dispatch]);

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
          {/* <Text>{activePage}</Text> */}
          <TouchableOpacity>
            <Image source={iconUser} style={styles.iconUser} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.component}>{children}</View>
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: theme === "food" ? colors.food : colors.nonfood,
            },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Documents")
          }}>
            <Image source={list} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("AddContragent")
          }}>
            <Image source={addContragent} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Route")
          }}>
            <Image source={route} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Chat")
          }}>
            <Image source={chat} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "none",
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 20,
  },
  button: {
    width: "25%",
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MainLayout;
