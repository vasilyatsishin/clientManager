import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TypeRootStackParamList } from "../../../navigation/types";

const ClientComponents: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => {
            navigation.navigate("Address")
          }}
        >
          <Text style={styles.buttonText}>Додати юридичну адресу</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Додати новий договір</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Додати торгову точку</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientComponents;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 5
  },
  wrapper: {
    width: "85%",
    alignItems: "center",
  },
  button: {
    height: 40,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.nonfood
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
  },
});
