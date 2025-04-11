import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { colors } from "../../../assets/colors";

const Documents: FC = () => {
  const documentIcon = `<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Vector">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 4.14286C13.9506 4.14286 13.4238 4.36107 13.0353 4.74954C13.0353 4.74955 13.0353 4.74952 13.0353 4.74954M13.0353 4.74954C12.6468 5.13803 12.4286 5.66493 12.4286 6.21429V20.7143C12.4286 21.8583 11.5012 22.7857 10.3571 22.7857C9.21312 22.7857 8.28571 21.8583 8.28571 20.7143V6.21429C8.28571 4.56612 8.94046 2.98553 10.1058 1.82015C11.2712 0.654767 12.8518 0 14.5 0H41.4286C41.9779 0 42.5048 0.218239 42.8933 0.606707L57.3933 15.1067C57.7818 15.4952 58 16.0221 58 16.5714V51.7857C58 53.4339 57.345 55.0147 56.1799 56.1799C55.0147 57.345 53.4339 58 51.7857 58H31.0714C29.9274 58 29 57.0726 29 55.9286C29 54.7846 29.9274 53.8571 31.0714 53.8571H51.7857C52.3349 53.8571 52.862 53.6388 53.2504 53.2504C53.6388 52.862 53.8571 52.3349 53.8571 51.7857V17.4294L40.5706 4.14286H14.5" fill=${colors.nonfood}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 29C15.644 29 16.5714 29.9274 16.5714 31.0714V41.4286H26.9286C28.0726 41.4286 29 42.356 29 43.5C29 44.644 28.0726 45.5714 26.9286 45.5714H16.5714V55.9286C16.5714 57.0726 15.644 58 14.5 58C13.356 58 12.4286 57.0726 12.4286 55.9286V45.5714H2.07143C0.92741 45.5714 0 44.644 0 43.5C0 42.356 0.92741 41.4286 2.07143 41.4286H12.4286V31.0714C12.4286 29.9274 13.356 29 14.5 29Z" fill="${colors.nonfood }"/>
</g>
</svg>
`;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.wrapper}>
        <View style={styles.documentsContainer}>
          <Text style={styles.label}>Документи</Text>
          <View style={styles.documents}>
            <SvgXml xml={documentIcon} />
          </View>
        </View>
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
    backgroundColor: "white",
    borderRadius: 10,
    height: 110,
    alignItems: "center",
  },
  label: {
    fontFamily: "Montserrat",
    marginBottom: 10,
    color: colors.nonfood
  },
  documentsContainer: {
    width: "92%",
    marginVertical: 7,
  },
  documents: {
    height: 50,
    // backgroundColor: "red",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
