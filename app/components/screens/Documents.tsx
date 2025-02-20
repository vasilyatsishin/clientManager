import { FC, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import MainLayout from "../../layout/MainLayout";
import { useDispatch } from "react-redux";
import { changeActivePage } from "../../redux/slices/generalSlice";

const NotSended: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePage("Заявки"));
  }, []);
  return (
    <>
      <Text>Hio</Text>
      <TouchableOpacity></TouchableOpacity>
    </>
  );
};

export default NotSended;
