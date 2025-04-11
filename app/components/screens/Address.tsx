import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { TypeRootStackParamList } from "../../navigation/types";
import { Text, TouchableOpacity } from "react-native";

const Address: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  return (
    <>
      <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Text>safasf</Text>
      </TouchableOpacity>
    </>
  );
};

export default Address;
