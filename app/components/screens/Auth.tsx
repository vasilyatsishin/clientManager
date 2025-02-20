import { FC, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";

const Auth: FC = () => {
  const [bosId, setBosId] = useState<number | null>(null);
  const { login } = useAuth();
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const logo = require("../../assets/img/logoBertaGroupWithoutText.png");
  const icon = require("../../assets/img/infoIcon.png");

  const handleLogin = () => {
    if (bosId) {
      login(bosId);
    } else {
      setIsFilled(false);
    }
  };

  return (
    <View style={styles.view}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.headerText}>Log In</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Введіть BOS-id"
            placeholderTextColor="grey"
            value={bosId ? bosId.toString() : ""}
            style={[styles.input, !isFilled && styles.inputError]}
            keyboardType="numeric"
            onChangeText={(text) => {
              setBosId(Number(text.replace(/[^0-9]/g, "")) || 0);
              setIsFilled(true);
            }}
          />
          <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          {showTooltip && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                BOS-id можна знайти у вашому профілі
              </Text>
            </View>
          )}
        </View>
        {!isFilled && (
          <Text style={styles.errorText}>BOS-id не може бути порожнім</Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonAuth} onPress={handleLogin}>
        <Text style={styles.textInButton}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 45,
  },
  view: {
    paddingTop: 100,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#202d3a",
    marginBottom: 10,
    marginTop: 60,
  },
  inputContainer: {
    width: 230,
    marginBottom: 20,
  },
  inputWrapper: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderColor: "lightgrey",
    paddingTop: 20,
    borderBottomWidth: 2,
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
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
  textInButton: {
    color: "lightgrey",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 60,
    position: "absolute",
  },
  icon: {
    width: 22,
    height: 22,
    marginTop: 10,
    marginLeft: 13,
  },
  tooltip: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Auth;
