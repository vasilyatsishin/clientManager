import { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "../../redux/slices/documentsSlice";
import { RootState } from "../../redux/store";
import {
  getDocumentsFromServer,
  getDocumentsFromLocalDB,
} from "../../functions/documents";
import { changeActivePage } from "../../redux/slices/generalSlice";
import { useAuth } from "../../hooks/useAuth";
import { refresh } from "../../functions/auth";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";
import { initDatabase } from "../../sqlite/sqlite";
const Documents: FC = () => {
  const [typeOfShownDocuments, setTypeOfShownDocuments] = useState<
    "not sended" | "sended"
  >("not sended");
  const dispatch = useDispatch();
  const business = useSelector((state: RootState) => state.generalSlice.theme);
  const token = useSelector((state: RootState) => state.authSlice.accessToken);
  const storedDocuments = useSelector(
    (state: RootState) =>
      state.documentsSlice.documents[business]?.[typeOfShownDocuments]
  );

  useEffect(() => {
    dispatch(changeActivePage("Заявки"));
    if (storedDocuments?.length) {
      return;
    }

    const fetchData = async () => {
      try {
        let documents;
        if (typeOfShownDocuments === "not sended") {
          documents = await getDocumentsFromLocalDB(business);
        } else {
          const { accessToken } = await refresh(token);
          dispatch(setAccessToken(accessToken));
          documents = await getDocumentsFromServer(business);
        }

        dispatch(
          setDocuments({ business, type: typeOfShownDocuments, documents })
        );
      } catch (error: any) {
        if(error.message == "401"){
          dispatch(setUserInfo(null))
        }
      }
    };

    fetchData();
  }, [typeOfShownDocuments, business, token]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.typeOfDocumentsButtonsContainer}>
        <TouchableOpacity
          disabled={typeOfShownDocuments === "not sended"}
          style={styles.typeOfDocumentsButton}
          onPress={() => setTypeOfShownDocuments("not sended")}
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
          disabled={typeOfShownDocuments === "sended"}
          style={styles.typeOfDocumentsButton}
          onPress={() => setTypeOfShownDocuments("sended")}
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

      <FlatList
        data={storedDocuments}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Text style={styles.documentText}>{item.body}</Text>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        ListEmptyComponent={
          <Text style={styles.textForEmptyPage}>
            Ви будете бачити тут{" "}
            {typeOfShownDocuments === "sended"
              ? "відправлені"
              : "невідправлені"}{" "}
            заявки. Поки що тут пусто.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  typeOfDocumentsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  typeOfDocumentsButton: {},
  buttonText: { fontSize: 25 },
  documentText: { fontSize: 18, marginVertical: 10 },
  textForEmptyPage: { width: 200, fontSize: 20, textAlign: "center" },
});

export default Documents;
