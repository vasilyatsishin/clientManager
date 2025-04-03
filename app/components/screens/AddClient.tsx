import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMainLayoutShown } from "../../redux/slices/generalSlice";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { colors } from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ClientForm from "../components/ClientForm";
import { FlatList } from "react-native";
import ClientComponents from "../components/ClientComponents";
import Documents from "../components/Documents";
import Comment from "../components/Comment";

const AddClient: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);

  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  useEffect(() => {
    dispatch(setIsMainLayoutShown(false));
  }, []);

  const backFunction = () => {
    navigation.goBack();
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
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#ECECECEC"}}
      >
        <FlatList
          data={[{ key: "form" }]}
          renderItem={() => (
            <>
              <ClientForm theme={theme}/>
              <ClientComponents theme={theme}/>
              <Documents theme={theme}/>
              <Comment theme={theme}/>
            </>
          )}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
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
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddText: {
    fontFamily: "Montserrat-Medium",
  },
});
