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
import { UserInterface } from "../../interfaces/interfaces";
import { useNavigation } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/authSlice";
import { changeSectors, changeTheme } from "../../redux/slices/generalSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Confirmation: FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const selector = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();
  const { user, setUser } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

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
      const response: UserInterface = await confirmationByTg(
        otp,
        selector.bosId
      );

      if (response) {
        setUser(response);
        dispatch(setUserInfo(response));
        choosingSector(response.sector);
      } else {
        console.log("Невірний код");
      }
    } catch (error) {
      console.log(error);
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
      <Text style={styles.header}>Enter the OTP</Text>
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
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          otp.length !== maxLength && styles.buttonDisabled,
        ]}
        onPress={confirm}
        disabled={otp.length !== maxLength}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Стилі без змін
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "red",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginHorizontal: 5,
  },
  input: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#202d3a",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#202d3a",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 230,
    height: 60,
  },
  buttonText: {
    textAlign: "center",
    color: "lightgrey",
    margin: "auto",
  },
  buttonDisabled: {
    backgroundColor: "grey", // Кнопка стає сірою, якщо не всі цифри введені
  },
});

export default Confirmation;
