import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMainLayoutShown } from "../../redux/slices/generalSlice";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { colors } from "../../assets/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ClientForm from "../components/ClientForm";
import { ScrollView } from "react-native";

const AddClient: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);

  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  useEffect(() => {
    dispatch(setIsMainLayoutShown(false));
  }, []);

  const backFunction = () => {
    navigation.navigate("NotSended");
    dispatch(setIsMainLayoutShown(true));
  };

  return (
    <>
      <View
        style={[
          styles.upperNav,
          {
            backgroundColor: theme === "Food" ? colors.food : colors.nonfood,
          },
        ]}
      >
        <View style={styles.upperNavContainer}>
          <TouchableOpacity onPress={backFunction}>
            <Image
              source={require("../../assets/img/backIcon.png")}
              style={styles.backIcon}
            ></Image>
          </TouchableOpacity>

          <Text style={styles.upperNavText}>Новий клієнт</Text>
        </View>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text
            style={[
              styles.buttonAddText,
              { color: theme == "Food" ? colors.food : colors.nonfood },
            ]}
          >
            Додати
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ClientForm />
      </ScrollView>
    </>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  upperNav: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    width: 30,
    height: 20,
    marginHorizontal: 10,
  },
  upperNavContainer: {
    flexDirection: "row",
  },
  upperNavText: {
    color: "white",
    fontFamily: "Montserrat",
    letterSpacing: 0,
  },
  buttonAdd: {
    marginRight: 20,
    backgroundColor: "white",
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddText: {
    fontFamily: "Montserrat-Bold",
  },
});
