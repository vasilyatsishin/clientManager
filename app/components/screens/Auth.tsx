import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FC, useState } from "react";
import { login } from "../../functions/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { TypeRootStackParamList } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { setBosId } from "../../redux/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../generalComponents/Loader";

const Auth: FC = () => {
  const [bosId, setBosIdLocal] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useAuth();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const logo = require("../../assets/img/logoBlueText.png");

  const handleLogin = async () => {
    if (!bosId.trim()) {
      setErrorMessage("Berta-ID не може бути порожнім");
      return;
    }

    const bosIdNumber = Number(bosId);
    dispatch(setBosId(bosIdNumber));

    if (isNaN(bosIdNumber) || bosIdNumber <= 0) {
      setErrorMessage("Berta-ID має бути додатним числом");
      return;
    }

    setErrorMessage("");

    try {
      setIsLoading(true);
      await login(bosIdNumber);
      navigation.navigate("Confirmation");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.view}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Обліковий запис</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.placeholder}>Ідентифікатор користувача</Text>
            <TextInput
              value={bosId}
              style={[styles.input]}
              keyboardType="numeric"
              onChangeText={(text) => {
                setBosIdLocal(text.replace(/[^0-9]/g, ""));
                setErrorMessage("");
              }}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.buttonAuth} onPress={handleLogin}>
          <Text style={styles.textInButton}>
            {isLoading ? <Loader /> : "Продовжити"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logo: { width: 102, height: 80 },
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 100,
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Montserrat-Medium",
    color: "#223444",
    marginBottom: 10,
    marginTop: 80,
  },
  inputContainer: { width: 315, marginBottom: 55, marginTop: 30 },
  inputWrapper: {
    height: 48,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    borderColor: "#223444",
    borderBottomWidth: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonAuth: {
    backgroundColor: "#223444",
    width: 230,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  textInButton: {
    color: "white",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 30,
    position: "absolute",
    top: 40,
  },
  placeholder: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    color: "#223444"
  }
});

export default Auth;
