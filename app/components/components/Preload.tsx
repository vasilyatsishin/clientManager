import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";

const Preload: FC = () => {
    const logo = require("../../assets/img/logo.png");
    return(
        <View style={styles.wrapper}>
            <Image source={logo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#223444"
    }
})

export default Preload