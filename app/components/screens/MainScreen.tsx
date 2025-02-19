import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeTheme } from "../../redux/slices/generalSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MainScreen: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);

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
        style={{ backgroundColor: theme === "food" ? "red" : "blue" }}
        edges={["top"]}
      >
        <StatusBar barStyle="default" />
        <View
          style={[
            styles.upperNav,
            { backgroundColor: theme === "food" ? "red" : "blue" },
          ]}
        >
            
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.component}></View>
        <View
          style={[
            styles.bottomNav,
            { backgroundColor: theme === "food" ? "red" : "blue" },
          ]}
        ></View>
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
    height: 60,
  },
  upperNav: {
    height: 60,
  },
});
export default MainScreen;
