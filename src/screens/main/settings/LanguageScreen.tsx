import React, { useState, useEffect } from "react";
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

const languages = [
    { id: "az", name: "Azərbaycanca", icon: require("../../../assets/svg/language/az.svg") },
    { id: "en", name: "English", icon: require("../../../assets/svg/language/en.svg") },
    { id: "ru", name: "Русский", icon: require("../../../assets/svg/language/ru.svg") },
];

const LanguageScreen = ({ navigation }: any) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        setSelectedLanguage(i18n.language);
    }, []);

    const handleLanguageSelect = (langId: string) => {
        setSelectedLanguage(langId);
    };

    const handleSave = async () => {
        if (selectedLanguage) {
            try {
                await i18n.changeLanguage(selectedLanguage);
                navigation.goBack();
            } catch (error) {
                console.error("Language change error:", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t("Dili dəyiş")}</Text>
                    <View style={styles.rightPlaceholder} />
                </View>
                
                <View style={styles.mainContent}>
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
                        onPress={handleSave}
                        title={t("Save")}
                        buttonStyle={styles.saveButton}
                        textStyle={styles.saveButtonText}
                        disabled={!selectedLanguage}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#110C22',
        fontFamily: "Onest-Medium",
    },
    backButton: {
        padding: 8,
    },
    rightPlaceholder: {
        width: 30,
    },
    mainContent: {
        alignItems: "center",
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "500",
        color: "#110C22",
        fontFamily: "Onest-Light",
        marginBottom: 30,
    },
    languageList: {
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
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    saveButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#015656",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default LanguageScreen;