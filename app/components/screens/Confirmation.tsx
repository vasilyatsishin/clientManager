import { FC, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { confirmationByTg } from "../../functions/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";
import { changeSectors, changeTheme } from "../../redux/slices/generalSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

const Confirmation: FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const selector = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();
  const { setUser } = useAuth();

  const logo = require("../../assets/img/logoBlueText.png");

  const choosingSector = async (sector: string[]) => {
    try {
      await AsyncStorage.setItem("sectors", JSON.stringify(sector));
      dispatch(changeSectors(sector));
      await AsyncStorage.setItem("theme", sector[0]);
      dispatch(changeTheme(sector[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = async () => {
    if (otp.length !== maxLength) {
      setIsFilled(false);
      return;
    }
    setIsFilled(true);

    try {
      const response = await confirmationByTg(otp, selector.bosId);

      if (response) {
        dispatch(setUserInfo(response));
        choosingSector(response.sector);
        const token = await AsyncStorage.getItem("accessToken");
        dispatch(setAccessToken(token));
        setUser({
          userId: response.userId,
          sector: response.sector,
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (text: string, index: number) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    setOtp((prevOtp) => {
      const otpArray = prevOtp.split("");
      otpArray[index] = sanitizedText;
      return otpArray.join("");
    });

    if (sanitizedText !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (sanitizedText === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      setOtp((prevOtp) => {
        const otpArray = prevOtp.split("");
        otpArray[index] = "";
        return otpArray.join("");
      });
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  const maxLength = 4;

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>Введіть код підтвердження</Text>
      <View style={styles.inputContainer}>
        {[...Array(maxLength)].map((_, index) => (
          <View style={styles.inputWrapper} key={index}>
            <TextInput
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={[styles.input, !isFilled && styles.inputError]}
              value={otp[index] || ""}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="numeric"
              textAlign="center"
              returnKeyType={index === maxLength - 1 ? "done" : "next"}
            />
          </View>
        ))}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          otp.length !== maxLength && styles.buttonDisabled,
        ]}
        onPress={confirm}
        disabled={otp.length !== maxLength}
      >
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Стилі без змін
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "red",
  },
  header: {
    marginTop: 100,
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    marginBottom: 20,
    color: "#223444",
    
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputWrapper: {
    marginHorizontal: 5,
  },
  input: {
    width: 25,
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#223444",
    fontFamily: "Montserrat-Medium",
    color: "#223444",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#223444",
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 230,
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    margin: "auto",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 5,
    position: "absolute",
    top: 55,
  },
  logo: { width: 102, height: 80 },
});

export default Confirmation;
