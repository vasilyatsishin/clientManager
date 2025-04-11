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
      </View>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#ECECECEC" }}>
        <FlatList
          data={[{ key: "form" }]}
          renderItem={() => (
            <>
              <ClientForm />
              <ClientComponents />
              <Documents />
              <Comment />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flexContainer}
              >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <View style={styles.wrapperForSendButton}>
                    <TouchableOpacity style={styles.buttonAdd}>
                      <Text style={[styles.buttonAddText]}>Додати</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
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
