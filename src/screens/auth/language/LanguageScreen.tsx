import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from "react-native";
import i18n from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { SvgImage } from "../../../components/svgImage/SvgImage";
import CustomButton from "../../../components/button/CustomButton";
import { Routes } from "../../../navigations/routes";

const languages = [
    { id: "az", name: "Azərbaycanca", icon: require("../../../assets/svg/language/az.svg") },
    { id: "en", name: "English", icon: require("../../../assets/svg/language/en.svg") },
    { id: "ru", name: "Русский", icon: require("../../../assets/svg/language/ru.svg") },
];

const LanguageScreen = ({ navigation }: any) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const { t } = useTranslation();

    const handleLanguageSelect = async (langId: string) => {
        setSelectedLanguage(langId);
        try {
            await i18n.changeLanguage(langId);
        } catch (error) {
            console.error("Dil dəyişdirilərkən xəta baş verdi:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />
            <View style={styles.down}>
                <Text style={styles.title}>{t("Dil seçin")}</Text>
                <View style={styles.languageList}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.id}
                            style={[
                                styles.languageButton,
                                selectedLanguage === lang.id && styles.selectedButton,
                            ]}
                            onPress={() => handleLanguageSelect(lang.id)}
                        >
                            <SvgImage source={lang.icon} height={36} width={36} />
                            <Text style={styles.languageText}>{lang.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <CustomButton
                    onPress={() => navigation.navigate(Routes.onboarding)}
                    title={t("Davam et")}
                    buttonStyle={styles.continueButton}
                    textStyle={styles.continueText}
                    disabled={!selectedLanguage}
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
    },
    down: {
        alignItems: "center",
        marginTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "500",
        color: "#110C22",
        fontFamily: "Onest-Light",
    },
    languageList: {
        marginTop: 35,
        width: "100%",
        paddingHorizontal: 20,
    },
    languageButton: {
        width: "100%",
        height: 110,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        gap: 10,
    },
    selectedButton: {
        backgroundColor: "#D3E3FC",
    },
    languageText: {
        fontSize: 16,
        color: "#110C22",
        fontFamily: "Onest-Light",
    },
    buttonWrapper: {
        marginBottom: 40,
        width: "100%",
        paddingHorizontal: 20,
    },
    continueButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#015656",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    continueText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default LanguageScreen;
