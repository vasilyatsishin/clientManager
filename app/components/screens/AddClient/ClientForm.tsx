import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../assets/colors";
import ModalList from "../../generalComponents/ModalList";
import { MaskedTextInput } from "react-native-mask-text";

const ClientForm: FC = () => {
  const [activeButtonTypeOfPerson, setActiveButtonTypeOfPerson] =
    useState<number>(1);
  const [identifyCode, setIdentifyCode] = useState<string>("");
  const [nameSurname, setNameSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [visibleModalForCode, setVisibleModalForCode] =
    useState<boolean>(false);
  const [visibleModalForName, setVisibleModalForName] =
    useState<boolean>(false);

  const data = [
    "123456",
    "123457",
    "654321",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987655",
    "987655",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
    "987654",
  ];

  const filteredDataName = data.filter((item) => item.startsWith(nameSurname));
  const filteredData = data.filter((item) => item.startsWith(identifyCode));

  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <View style={styles.upperWrapper}>
          {activeButtonTypeOfPerson === 0 ? (
            <>
              <View style={styles.inputWrapper}>
                <Text style={[styles.label]}>
                  Ідентифікаційний код або номер паспорту
                </Text>
                <TextInput
                  style={[styles.input]}
                  value={identifyCode}
                  onChangeText={(text) => {
                    setIdentifyCode(text);
                    if (text.length >= 3) {
                      setVisibleModalForCode(true);
                    } else {
                      setVisibleModalForCode(false);
                    }
                  }}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                />
                <ModalList
                  key={identifyCode + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={53}
                  data={filteredData} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForCode}
                  onSelect={(selectedItem) => {
                    setIdentifyCode(selectedItem);
                    setVisibleModalForCode(false);
                  }}
                  onClose={() => setVisibleModalForCode(false)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={[styles.label]}>ПІБ</Text>
                <TextInput
                  style={[styles.input]}
                  value={nameSurname}
                  onChangeText={(text) => {
                    setNameSurname(text);
                    if (text.length >= 3) {
                      setVisibleModalForName(true);
                    } else {
                      setVisibleModalForName(false);
                    }
                  }}
                  contextMenuHidden={true}
                />
                <ModalList
                  key={nameSurname + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={54}
                  data={filteredDataName} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForName}
                  onSelect={(selectedItem) => {
                    setNameSurname(selectedItem);
                    setVisibleModalForName(false);
                  }}
                  onClose={() => setVisibleModalForName(false)}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputWrapper}>
                <Text style={[styles.label]}>Код ЄДРПОУ</Text>
                <TextInput
                  style={[styles.input]}
                  value={identifyCode}
                  onChangeText={(text) => {
                    setIdentifyCode(text);
                    setVisibleModalForCode(text.length >= 3);
                  }}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                />
                <ModalList
                  key={identifyCode + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={53}
                  data={filteredData} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForCode}
                  onSelect={(selectedItem) => {
                    setIdentifyCode(selectedItem);
                    setVisibleModalForCode(false);
                  }}
                  onClose={() => setVisibleModalForCode(false)}
                />
              </View>
             <View style={styles.inputWrapper}>
             <Text style={[styles.label]}>Назва організації</Text>
              <TextInput
                style={[styles.input]}
                value={nameSurname}
                onChangeText={(text) => {
                  setNameSurname(text);
                  if (text.length >= 3) {
                    setVisibleModalForName(true);
                  } else {
                    setVisibleModalForName(false);
                  }
                }}
                contextMenuHidden={true}
              />
              <ModalList
                key={nameSurname + Math.random()} // 🔹 Форсуємо ререндер при зміні
                top={54}
                data={filteredDataName} // 🔹 Передаємо лише відфільтровані дані
                visible={visibleModalForName}
                onSelect={(selectedItem) => {
                  setNameSurname(selectedItem);
                  setVisibleModalForName(false);
                }}
                onClose={() => setVisibleModalForName(false)}
              />
             </View>
            </>
          )}
        </View>
        <View style={styles.upperWrapper}>
          <View style={styles.wrapperChoosingTypeOfPerson}>
            <TouchableOpacity
              style={[
                styles.choosePersonButton,
                { opacity: activeButtonTypeOfPerson == 1 ? 1 : 0.5 },
              ]}
              onPress={() => {
                setActiveButtonTypeOfPerson(1);
                setIdentifyCode("");
                setNameSurname("");
                setVisibleModalForCode(false);
              }}
            >
              <Text
                style={[
                  styles.choosePersonButtonText,
                ]}
              >
                Юридична особа
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.choosePersonButton,
                { opacity: activeButtonTypeOfPerson == 0 ? 1 : 0.5 },
              ]}
              onPress={() => {
                setActiveButtonTypeOfPerson(0);
                setIdentifyCode("");
                setNameSurname("");
                setVisibleModalForCode(false);
              }}
            >
              <Text
                style={[
                  styles.choosePersonButtonText,
                ]}
              >
                Фізична особа
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputWrapper, {marginTop: 15}]}>
            <MaskedTextInput
              placeholder="+38 (___) ___-__-__"
              placeholderTextColor="grey"
              mask="+38 (099) 999-99-99"
              keyboardType="numeric"
              contextMenuHidden={true}
              onChangeText={(text) => {
                setPhone(text);
              }}
              value={phone}
              style={[styles.input, {paddingBottom: 5}]}
            />
          </View>
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
    marginTop: 15,
  },
  wrapper: {
    width: "95%",
    alignItems: "center",
    borderRadius: 20,
  },
  label: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginVertical: 5,
    color: colors.nonfood,
  },
  wrapperChoosingTypeOfPerson: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    marginVertical: 12,
    backgroundColor: "#ECECECEC",
    borderRadius: 10,
    padding: 5,
  },
  choosePersonButton: {
    height: 35,
    width: "49%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  choosePersonButtonText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: colors.nonfood
  },
  input: {
    width: "100%",
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.nonfood,
    fontFamily: "Montserrat",
    fontSize: 20,
    opacity: 1,
  },
  upperWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 115,
    marginBottom: 5,
  },
  inputWrapper: {
    alignItems: "flex-start",
    width: "92%",
  },
});
