import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { normalize } from '../../theme/metrics';
import { SvgImage } from '../svgImage/SvgImage';

const CustomInput = ({ label, icon, placeholder, value, onChangeText, password }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const [enable, setenable] = useState(false)
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
                    placeholderTextColor={"#B3B1B8"}
                    secureTextEntry={password && !enable} 

                />
                {
                    password &&
                    <TouchableOpacity onPress={() => setenable(!enable)}>
                        {
                            enable ?
                                <SvgImage
                                    source={require("../../assets/svg/textInput/eyeOpen.svg")}
                                    height={18}
                                    width={18}
                                    style={styles.eye}
                                />
                                :
                                <SvgImage
                                    source={require("../../assets/svg/textInput/eye.svg")}
                                    height={18}
                                    width={18}
                                    style={styles.eye}
                                />
                        }
                    </TouchableOpacity>
                }
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
        width: normalize('width', 327),
        height: normalize('height', 48),
    },
    inputContainerFocused: {
        borderColor: '#B3B1B8',
        borderWidth: 1,
    },
    icon: {
        marginLeft: normalize('width', 4),
    },
    eye: {
        marginRight: normalize('width', 15),
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: normalize('width', 327),
        height: normalize('height', 40),
        paddingLeft: normalize('width', 10),
        flex: 1,
        borderRadius: normalize('width', 12),
        fontSize: normalize("height", 14)
    },
});

export default CustomInput;
