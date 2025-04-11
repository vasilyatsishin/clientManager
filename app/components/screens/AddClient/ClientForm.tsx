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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  getDictionaryByIdentifyCode,
  getDictionaryByNameSurname,
} from "../../../functions/addContragent";
import { DictionaryClientInterface } from "../../../interfaces/interfaces";

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
  const theme = useSelector((state: RootState) => state.generalSlice.theme);

  const [codeData, setCodeData] = useState<DictionaryClientInterface[]>();
  const [nameData, setNameData] = useState<DictionaryClientInterface[]>();

  const getEntDictionary = async (text) => {
    setIdentifyCode(text);
    if (text.length >= 3) {
      setVisibleModalForCode(true);
      const token = await AsyncStorage.getItem("accessToken");
      const data = await getDictionaryByIdentifyCode(
        token,
        theme,
        text,
        activeButtonTypeOfPerson
      );
      setCodeData(data);
    } else {
      setVisibleModalForCode(false);
    }
  };

  const getNameDictionary = async (text) => {
    setNameSurname(text);
    if (text.length >= 3) {
      setVisibleModalForName(true);
      const token = await AsyncStorage.getItem("accessToken");
      const data = await getDictionaryByNameSurname(
        token,
        theme,
        text,
        activeButtonTypeOfPerson
      );
      setNameData(data);
    } else {
      setVisibleModalForName(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <View style={styles.upperWrapper}>
          {activeButtonTypeOfPerson === 1 ? (
            <>
              <View style={styles.inputWrapper}>
                <Text style={[styles.label]}>
                  Ідентифікаційний код або номер паспорту
                </Text>
                <TextInput
                  style={[styles.input]}
                  value={identifyCode}
                  onChangeText={async (text) => {
                    getEntDictionary(text);
                  }}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                />
                <ModalList
                  key={identifyCode + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={53}
                  data={codeData}
                  visible={visibleModalForCode}
                  onSelect={(selectedItem) => {
                    setIdentifyCode(selectedItem?.entCode);
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
                  onChangeText={async (text) => {
                    getNameDictionary(text);
                  }}
                  contextMenuHidden={true}
                />
                <ModalList
                  key={nameSurname + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={54}
                  data={nameData} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForName}
                  onSelect={(selectedItem) => {
                    setNameSurname(selectedItem?.name);
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
                  onChangeText={async (text) => {
                    getEntDictionary(text);
                  }}
                  keyboardType="numeric"
                  contextMenuHidden={true}
                />
                <ModalList
                  key={identifyCode + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={53}
                  data={codeData} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForCode}
                  onSelect={(selectedItem) => {
                    setIdentifyCode(selectedItem?.entCode);
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
                  onChangeText={async (text) => {
                    getNameDictionary(text);
                  }}
                  contextMenuHidden={true}
                />
                <ModalList
                  key={nameSurname + Math.random()} // 🔹 Форсуємо ререндер при зміні
                  top={54}
                  data={nameData} // 🔹 Передаємо лише відфільтровані дані
                  visible={visibleModalForName}
                  onSelect={(selectedItem) => {
                    setNameSurname(selectedItem?.name);
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
              <Text style={[styles.choosePersonButtonText]}>Фізична особа</Text>
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
              <Text style={[styles.choosePersonButtonText]}>
                Юридична особа
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputWrapper]}>
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
              style={[styles.input, { paddingBottom: 5 }]}
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
    marginTop: 5,
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
    color: colors.nonfood,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.nonfood,
    fontFamily: "Montserrat",
    fontSize: 15,
    opacity: 1,
    marginBottom: 5,
    color: colors.nonfood,
  },
  upperWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 130,
    marginBottom: 5,
  },
  inputWrapper: {
    alignItems: "flex-start",
    width: "92%",
    height: 60,
  },
});
