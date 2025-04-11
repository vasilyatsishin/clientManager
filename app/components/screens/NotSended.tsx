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
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";
const NotSended: FC = () => {
  const dispatch = useDispatch();
  const business = useSelector((state: RootState) => state.generalSlice.theme);
  const token = useSelector((state: RootState) => state.authSlice.accessToken);
  const storedDocuments = useSelector(
    (state: RootState) =>
      state.documentsSlice.documents[business]?.["not sended"]
  );

  useEffect(() => {
    dispatch(changeActivePage("Невідправлені"));
    if (storedDocuments?.length) {
      return;
    }

    const fetchData = async () => {
      try {
        let documents = await getDocumentsFromLocalDB(business);
        dispatch(setDocuments({ business, type: "not sended", documents }));
      } catch (error: any) {
        if (error.message == "401") {
          dispatch(setAccessToken(null));
          dispatch(setUserInfo(null));
        }
      }
    };

    fetchData();
  }, [business, token]);

  return (
    <View style={styles.mainContainer}>
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
            Ви будете бачити тут невідправлені заявки. Поки що тут пусто.
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

export default NotSended;
