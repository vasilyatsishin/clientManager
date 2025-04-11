import { FC } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../../assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";

const Comment: FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <View style={styles.commentContainer}>
          <Text style={styles.label}>Коментар</Text>
          <TextInput
            style={styles.comment}
            multiline
            placeholder="Залиште коментар"
            placeholderTextColor={colors.nonfood}
          />
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 10,
  },
  wrapper: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 140,
    alignItems: "center",
  },
  label: {
    fontFamily: "Montserrat",
    marginBottom: 10,
    color: colors.nonfood,
  },
  commentContainer: {
    width: "92%",
    marginVertical: 7,
  },
  comment: {
    width: "100%",
    height: 90,
    backgroundColor: "#ECECECEC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
});
