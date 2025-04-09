import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from "react-native";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { normalize } from "../../../theme/metrics";
import { SvgImage } from "../../../components/svgImage/SvgImage";
import CustomButton from "../../../components/button/CustomButton";
import { Routes } from "../../../navigations/routes";

const languages = [
    { id: "az", name: "Azərbaycanca", icon: require("../../../assets/svg/language/az.svg") },
    { id: "en", name: "English", icon: require("../../../assets/svg/language/en.svg") },
    { id: "ru", name: "Русский", icon: require("../../../assets/svg/language/ru.svg") },
];

const LanguageScreen = ({ navigation }: any) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const { t } = useTranslation();

    const handleLanguageSelect = async (langId: any) => {

        setSelectedLanguage(langId);
        try {
            await i18n.changeLanguage(langId);
        } catch (error) {
            console.error("Dil dəyişdirilərkən xəta baş verdi:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
                  <StatusBar backgroundColor='#F3F3F3' />

            <View style={styles.down}>
                <View >
                    <Text style={styles.title}>{t('Dil seçin')}</Text>
                </View>
                <View style={{ marginTop: normalize("height", 35) }}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.id}
                            style={[
                                styles.languageButton,
                                selectedLanguage === lang.id && styles.selectedButton,
                            ]}
                            onPress={() => handleLanguageSelect(lang.id)}
                        >
                            <SvgImage
                                source={lang.icon}
                                height={36}
                                width={36}
                            />
                            <Text style={styles.languageText}>{lang.name}</Text>

                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={{marginBottom:normalize("height",20)}} >
                <CustomButton
                    onPress={() => navigation.navigate(Routes.onboarding)}
                    title={t('Davam et')}
                    buttonStyle={styles.continueButton}
                    textStyle={styles.continueText}
                    disabled={selectedLanguage ? false : true}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        justifyContent: "space-between",
        alignItems: "center"
    },
    down: {
        alignItems: "center",
        marginTop: normalize("height", 10)
    },
    title: {
        fontSize: normalize("font", 26),
        fontWeight: "500",
        color: "#110C22",
        fontFamily: "Onest-Light"
    },
    languageButton: {
        width: normalize("width", 327),
        height: normalize("height", 110),
        backgroundColor: "#FFFFFF",
        borderRadius: normalize("width", 12),
        alignItems: "center",
        justifyContent: "center",
        marginVertical: normalize("height", 5),
        gap: normalize("height", 10)

    },
    selectedButton: {
        backgroundColor: "#D3E3FC",
    },
    languageText: {
        fontSize: normalize("font", 16),
        color: "#110C22",
        fontFamily: "Onest-Light"

    },
    continueButton: {
        width: normalize("width", 327),
        height: normalize("height", 48),
        backgroundColor: "#015656",
        borderRadius: normalize("width", 10),
        alignItems: "center",
    },
    continueText: {
        fontSize: normalize("font", 16),
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default LanguageScreen;
