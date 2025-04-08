import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { normalize } from '../../theme/metrics';
import { SvgImage } from '../svgImage/SvgImage';

const CustomInput = ({ label, icon, placeholder, value, onChangeText }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
                <SvgImage
                    source={icon}
                    height={18}
                    width={18}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: normalize('width', 12),
        paddingLeft: normalize('width', 10),
        backgroundColor: '#fff',
        marginHorizontal: normalize("width", 20),
    },
    inputContainerFocused: {
        borderColor: '#B3B1B8', 
        borderWidth: 1, 
    },
    icon: {
        marginLeft: normalize('width', 4),
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: normalize('width', 327),
        height: normalize('height', 48),
        paddingLeft: normalize('width', 10),
        flex: 1,
        borderRadius: normalize('width', 12),
    },
});

export default CustomInput;
