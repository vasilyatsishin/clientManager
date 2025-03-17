import { FC } from "react";
import { Image } from "react-native";

const Loader: FC = () => {
  const loader = require("../../assets/gifs/loader.gif");
  return (
    <>
      <Image source={loader} style={styles.loader} />
    </>
  );
};

const styles = {
    loader: {
        width: 40,
        height: 40
      }
}

export default Loader
