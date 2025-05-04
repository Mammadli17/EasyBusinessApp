import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { normalize } from '../../theme/metrics';
import { SvgImage } from '../svgImage/SvgImage';

interface CustomInputProps {
    label?: string;
    icon?: any;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    password?: boolean;
    error?: string;
    editable?: boolean;
    placeholderTextColor?: string;
    textColor?: string;
    containerStyle?: ViewStyle;
    withEditButton?: boolean;
    onEditPress?: () => void;
}

const CustomInput = ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    password,
    error,
    editable = true,
    placeholderTextColor = "#B3B1B8",
    textColor = "#111827",
    containerStyle,
    withEditButton,
    onEditPress
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [enable, setenable] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused,
                error && { borderColor: "hsla(0, 86%, 59%, 1)", borderWidth: 1 },
                !editable && styles.inputDisabled
            ]}>
                {icon && (
                    <SvgImage
                        source={icon}
                        height={18}
                        width={18}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={password && !enable}
                    editable={editable}
                />
                {withEditButton && (
                    <TouchableOpacity onPress={onEditPress} style={styles.editIcon}>
                        <SvgImage
                            source={require("../../assets/svg/profile/edit.svg")}
                            height={18}
                            width={18}
                            stroke="#015656"
                        />
                    </TouchableOpacity>
                )}
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
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#110C22',
        marginBottom: 8,
        fontFamily: 'Onest-Medium',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: normalize('width', 12),
        paddingHorizontal: normalize('width', 12),
        backgroundColor: '#fff',
        height: 48,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    inputContainerFocused: {
        borderWidth: 1.5,
        borderColor: '#015656',
    },
    inputDisabled: {
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        fontFamily: 'Onest-Regular',
    },
    eye: {
        marginLeft: 10,
    },
    editIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: "hsla(0, 86%, 59%, 1)",
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Onest-Regular',
    },
});

export default CustomInput;
