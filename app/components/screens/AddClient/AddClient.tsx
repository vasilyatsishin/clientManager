import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMainLayoutShown } from "../../../redux/slices/generalSlice";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { colors } from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ClientForm from "./ClientForm";
import { FlatList } from "react-native";
import ClientComponents from "./ClientComponents";
import Documents from "./Documents";
import Comment from "./Comment";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddClient: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.generalSlice.theme);
  const backIcon = require("../../../assets/img/backIcon.png");

  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

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
            <Image source={backIcon} style={styles.backIcon}></Image>
          </TouchableOpacity>

          <Text style={styles.upperNavText}>Новий клієнт</Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <ClientForm />
        <ClientComponents />
        <Documents />
        <Comment />
        <View style={styles.wrapperForSendButton}>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}>Додати</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
  wrapperForSendButton: {
    width: "100%",
    alignItems: "center",
  },
  buttonAdd: {
    marginRight: 20,
    backgroundColor: colors.nonfood,
    width: "50%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddText: {
    fontFamily: "Montserrat-Medium",
    color: "white",
    fontSize: 20,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
