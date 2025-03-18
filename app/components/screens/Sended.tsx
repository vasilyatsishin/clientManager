import { FC, useEffect } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeActivePage } from "../../redux/slices/generalSlice";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";
import { refresh } from "../../functions/auth";
import { getDocumentsFromServer } from "../../functions/documents";
import { setDocuments } from "../../redux/slices/documentsSlice";

const Sended: FC = () => {
  const dispatch = useDispatch();
  const business = useSelector((state: RootState) => state.generalSlice.theme);
  const token = useSelector((state: RootState) => state.authSlice.accessToken);
  const storedDocuments = useSelector(
    (state: RootState) => state.documentsSlice.documents[business]?.["sended"]
  );

  useEffect(() => {
    dispatch(changeActivePage("Відправлені"));
    if (storedDocuments?.length) {
      return;
    }

    const fetchData = async () => {
      try {
        const { accessToken } = await refresh(token);
        dispatch(setAccessToken(accessToken));
        let documents = await getDocumentsFromServer(business);
        
        dispatch(
          setDocuments({ business, type: "sended", documents })
        );
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
    <>
      <Text>Sended</Text>
    </>
  );
};

export default Sended;
