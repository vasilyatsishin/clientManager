import { FC } from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

interface ModalListProps {
  top: number;
  data: string[];
  visible: boolean;
  onSelect: (item: string) => void;
  onClose: () => void;
}

const ModalList: FC<ModalListProps> = ({ top, data, visible, onSelect, onClose}) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.dropdown, { top }]}>
            <ScrollView nestedScrollEnabled style={styles.scrollContainer}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
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
    maxHeight: 200, // Ось це дозволяє скролінг
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    maxHeight: 200, // Повторно задаємо обмеження висоти
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ModalList;
