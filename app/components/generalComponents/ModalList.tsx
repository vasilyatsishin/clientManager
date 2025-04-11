import { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import { colors } from "../../assets/colors";
import { DictionaryClientInterface } from "../../interfaces/interfaces";

interface ModalListProps {
  top: number;
  data: DictionaryClientInterface[];
  visible: boolean;
  onSelect: (item: DictionaryClientInterface) => void;
  onClose: () => void;
}

const ModalList: FC<ModalListProps> = ({ top, data, visible, onSelect, onClose }) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.dropdown, { top }]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.scrollContainer}
            >
              {data?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={{color: colors.nonfood}}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 10,
    flex: 1,
    height,
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ModalList;
