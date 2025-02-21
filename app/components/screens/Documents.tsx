import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { changeActivePage } from "../../redux/slices/generalSlice";
import { changeTypeOfShownDocuments } from "../../redux/slices/documentsSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Documents: FC = () => {
  const [typeOfShownDocuments, setTypeOfShownDocuments] =
    useState<string>("not sended");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePage("Заявки"));
    // dispatch(changeTypeOfShownDocuments("not sended"))
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.typeOfDocumentsButtonsContainer}>
        <TouchableOpacity
          disabled={typeOfShownDocuments == "not sended"}
          style={styles.typeOfDocumentsButton}
          onPress={() => {
            setTypeOfShownDocuments("not sended");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontWeight:
                  typeOfShownDocuments === "not sended" ? "bold" : "normal",
              },
            ]}
          >
            Невідправлені
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={typeOfShownDocuments == "sended"}
          style={styles.typeOfDocumentsButton}
          onPress={() => {
            setTypeOfShownDocuments("sended");
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontWeight:
                  typeOfShownDocuments === "sended" ? "bold" : "normal",
              },
            ]}
          >
            Відправлені
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerForMainContent}>
        {/* написати функціонал, який буде тягнути дані залежно від бізнесу і типу 
        заявки(відправлені/невідправлені)*/}
        <Text style={styles.textForEmptyPage}>
          Ви будете бачити тут
          {typeOfShownDocuments == "sended" ? "відправлені" : "невідправлені"}
          заявки. Поки що тут пусто
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  typeOfDocumentsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  typeOfDocumentsButton: {},
  buttonText: {
    fontSize: 25,
  },
  containerForMainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textForEmptyPage: {
    width: 200,
    fontSize: 20,
    textAlign: "center",
  },
});

export default Documents;
