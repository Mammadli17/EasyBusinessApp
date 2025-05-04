import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform,
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
        <View style={styles.wrapper}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t("Dili dəyiş")}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.mainContent}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 70 : 50,
        paddingBottom: 16,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '600',
        color: '#110C22',
        fontFamily: "Onest-Medium",
    },
    backButton: {
        position: 'absolute',
        left: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    mainContent: {
        flex: 1,
        paddingTop: 20,
    },
    languageList: {
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    saveButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#015656",
        borderRadius: 12,
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