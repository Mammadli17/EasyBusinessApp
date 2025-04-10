import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { normalize } from '../../theme/metrics';

interface CustomCheckboxProps {
    label: string;
    onChange: (checked: boolean) => void;
    checked?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, onChange, checked }) => {
    return (
        <TouchableOpacity onPress={() => onChange(!checked)} style={styles.container}>
            <View style={[styles.checkbox, checked && styles.checked]}>
            </View>
            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize("width", 8)
    },
    checkbox: {
        width: normalize("width", 18),
        height: normalize("width", 18),
        borderWidth: normalize("width", 1),
        borderColor: 'rgba(1, 86, 86, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize("width", 6)
    },
    checked: {

        backgroundColor: 'rgba(1, 86, 86, 1)',
        borderWidth: 0
    },
    label: {
        fontSize: normalize("font", 14),
        fontFamily: "Nunito-Bold",
        color: "rgba(0, 0, 0, 0.48)"
    }

});

export default CustomCheckbox;