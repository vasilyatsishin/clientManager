import { FC } from "react";
import {
    Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { colors } from "../../assets/colors";

const ClientForm: FC = () => {
  const theme = useSelector((state: RootState) => state.generalSlice.theme);
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>
          Ідентифікаційний код або номер паспорту
        </Text>
        <TextInput style={[styles.identifyCodeOrPass, styles.input]} />
        <Text style={styles.label}>ПІБ</Text>
        <TextInput style={[styles.nameSurname, styles.input]} />
        <View style={styles.wrapperChoosingTypeOfPerson}>
          <TouchableOpacity
            style={[
              styles.choosePersonButton,
              {
                backgroundColor: theme == "Food" ? colors.food : colors.nonfood,
              },
            ]}
          >
            <Text style={styles.choosePersonButtonText}>Юридична</Text>
          </TouchableOpacity>
          <Text style={[styles.label, { marginVertical: "auto" }]}>Особа</Text>
          <TouchableOpacity
            style={[
              styles.choosePersonButton,
              {
                backgroundColor: theme == "Food" ? colors.food : colors.nonfood,
              },
            ]}
          >
            <Text style={styles.choosePersonButtonText}>Фізична</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} />
        <View style={[styles.contactPlaceholder, {backgroundColor: theme == "Food" ? colors.food : colors.nonfood}]}>
            <Image source={require("../../assets/img/phoneIcon.png")} style={styles.phoneIcon}/>
        </View>
      </View>
    </View>
  );
};

export default ClientForm;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    height: 300,
    backgroundColor: "#ECECECEC",
    alignItems: "center",
    borderRadius: 20,
  },
  label: {
    fontFamily: "Montserrat",
    marginVertical: "2%",
    textAlign: "center",
  },
  identifyCodeOrPass: {},
  nameSurname: {},
  wrapperChoosingTypeOfPerson: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 20,
  },
  choosePersonButton: {
    height: 40,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  choosePersonButtonText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
  },
  contactPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    bottom: 35,
    right: 135 
  },
  phoneIcon: {
    width: "75%",
    height: "75%"
  }
});
