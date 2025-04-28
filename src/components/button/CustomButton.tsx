// CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { normalize } from "../../theme/metrics";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: object;
    textStyle?: object;
    disabled?: boolean
}

const CustomButton = ({ onPress, title, buttonStyle, textStyle, disabled }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "90%",
        // paddingVertical: normalize("height", 15),
        backgroundColor: "#005F56",
        borderRadius: normalize("width", 10),
        alignItems: "center",

    },
    text: {
        fontSize: normalize("font", 18),
        color: "#FFF",
        fontWeight: "bold",
    },
});

export default CustomButton;
