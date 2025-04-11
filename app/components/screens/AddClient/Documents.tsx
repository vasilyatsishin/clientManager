import { FC, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { colors } from "../../../assets/colors";
import { Camera } from "expo-camera";
import { Modal } from "react-native";
import { Touchable } from "react-native";

const Documents: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(null);
  const documentIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.941 4.51319C14.1621 4.27481 14.1542 3.90498 13.9243 3.67544C13.6943 3.4459 13.3238 3.43903 13.086 3.65877L4.08129 12.6494C3.21747 13.5617 3.23712 14.9949 4.12748 15.8827C5.01686 16.7705 6.45261 16.7901 7.36655 15.9279L16.4362 6.87339C17.4494 5.85318 17.8415 4.37094 17.4671 2.98391C17.0927 1.59682 16.0067 0.512846 14.6172 0.139116C13.2267 -0.234639 11.7427 0.156774 10.7198 1.16817L1.60684 10.2648C0.199565 11.7274 -0.332069 13.8208 0.206459 15.7748C0.745968 17.7289 2.27511 19.2562 4.23372 19.7939C6.1913 20.3315 8.2884 19.8008 9.75284 18.396L19.8386 8.32826C20.0597 8.08988 20.0528 7.72005 19.8229 7.49052C19.5929 7.26097 19.2224 7.2541 18.9836 7.47482L8.89788 17.5416C7.74515 18.6726 6.07744 19.1082 4.5179 18.6864C2.95832 18.2646 1.73973 17.0482 1.31607 15.4913C0.893493 13.9345 1.32983 12.2698 2.46291 11.1191L11.5758 2.02246C12.6824 0.917893 14.4748 0.917893 15.5815 2.02148C16.687 3.12604 16.687 4.91524 15.5815 6.01996L6.5108 15.0734C6.07545 15.507 5.37085 15.507 4.93648 15.0734C4.50112 14.6398 4.50112 13.9355 4.93648 13.5019L13.941 4.51319Z" fill=${
    !isModalOpen ? colors.nonfood : "white"
  }/>
</svg>
`;

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperForButtons}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Документи</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonAdd,
              { backgroundColor: isModalOpen ? colors.nonfood : "white" },
            ]}
            onPress={() => setIsModalOpen((prev) => !prev)}
          >
            <SvgXml xml={documentIcon} />
          </TouchableOpacity>
        </View>

        {isModalOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.textInButtonInList}>Вкласти файл</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.textInButtonInList}>Зробити фото</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.textInButtonInList}>Вибрати фото</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    width: "95%",
    borderRadius: 10,
  },
  label: {
    fontFamily: "Montserrat",
    color: colors.nonfood,
  },
  wrapperForButtons: {
    width: "50%",
    marginVertical: 7,
    flexDirection: "row",
  },
  documents: {
    height: 50,
  },
  labelWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  buttonAdd: {
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayWithoutClose: {
    flex: 1,
    backgroundColor: "transparent", // або rgba(0,0,0,0.1) для затемнення
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    top: 50, // або розраховуй динамічно
    left: "27.5%",
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5, // для тіні на Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100, // важливо!
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
