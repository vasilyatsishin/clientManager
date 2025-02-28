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
import { useState } from "react";
import { login } from "../../functions/auth";

const Auth = () => {
  const [bosId, setBosId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const logo = require("../../assets/img/logoBertaGroupWithoutText.png");
  const icon = require("../../assets/img/infoIcon.png");

  const handleLogin = async () => {
    if (!bosId.trim()) {
      setErrorMessage("Berta-ID не може бути порожнім");
      return;
    }

    const bosIdNumber = Number(bosId);
    if (isNaN(bosIdNumber) || bosIdNumber <= 0) {
      setErrorMessage("Berta-ID має бути додатним числом");
      return;
    }

    setErrorMessage("");

    try {
      await login(bosIdNumber);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.view}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Log In</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Введіть Berta-ID"
              placeholderTextColor="grey"
              value={bosId}
              style={[styles.input]}
              keyboardType="numeric"
              onChangeText={(text) => {
                setBosId(text.replace(/[^0-9]/g, ""));
                setErrorMessage("");
              }}
            />
            <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
              <Image source={icon} style={styles.icon} />
            </TouchableOpacity>
            {showTooltip && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>
                  Berta-ID можна знайти у вашому профілі
                </Text>
              </View>
            )}
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.buttonAuth} onPress={handleLogin}>
          <Text style={styles.textInButton}>Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logo: { width: 60, height: 45 },
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 100,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#202d3a",
    marginBottom: 10,
    marginTop: 60,
  },
  inputContainer: { width: 230, marginBottom: 20 },
  inputWrapper: { height: 60, flexDirection: "row", alignItems: "center" },
  input: {
    borderColor: "lightgrey",
    borderBottomWidth: 2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    marginBottom: 10,
    paddingTop: 15,
  },
  buttonAuth: {
    backgroundColor: "#202d3a",
    width: 230,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  textInButton: { color: "lightgrey" },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    position: "absolute",
    top: 55,
  },
  icon: { width: 22, height: 22, marginTop: 10, marginLeft: 13 },
  tooltip: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  tooltipText: { color: "#fff", fontSize: 14 },
});

export default Auth;
