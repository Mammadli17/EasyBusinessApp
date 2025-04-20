import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/input/TextInput';
import { Routes } from '../../../navigations/routes';
import CustomCheckbox from '../../../components/checkbox/CheckBox';

interface ForumData {
    fullname: string;
    fin: string;
    password: any;
    cpassword: string;
    number: string;
    email: string;
    location: string;
    workplace: string;
    tin: string;
}

const ForgotPasswordScreen = ({ navigation }: any) => {
    const { t } = useTranslation();

    const [forumData, setForumData] = useState<ForumData>({
        fullname: '',
        fin: '',
        password: '',
        cpassword: '',
        number: '',
        email: '',
        location: '',
        workplace: '',
        tin: '',
    });

    const handleInputChange = (field: any, value: any) => {
        setForumData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar backgroundColor={"#F3F3F3"} />
                <View style={styles.header}>
                    <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => navigation.goBack()}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('Şifrəni unutdun.')} </Text>
                </View>

                <View style={{ marginTop: 40 }}>
                    <Text style={styles.headert}>
                        {t('Şifrənizi unutmusunuz? Yeniləmə təlimatlarını almaq üçün e-poçtunuzu daxil edin')}
                    </Text>
                </View>

                <View style={{ gap: 15, marginTop: 30 }}>
                    <View style={styles.inputWrapper}>
                        <CustomInput
                            label={t("E-poçt")}
                            icon={require('../../../assets/svg/textInput/email.svg')}
                            placeholder={t("E-poçt")}
                            value={forumData.email}
                            onChangeText={(value: any) => handleInputChange('email', value)}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate(Routes.reset)}>
                    <Text style={styles.continueText}>
                        {t('Şifrəni yenilə')}
                    </Text>
                </TouchableOpacity>

                <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.register)}>
                        <Text style={styles.footerText}>
                            {t('Şifrə yeniləməyə ehtiyac yoxdur?')}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.loginText}>{t('Girişə qayıt')}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    headert: {
        fontSize: 16,
        textAlign: 'center',
        color: "rgba(0, 0, 0, 0.48)",
        fontFamily: "Onest-Medium",
        marginHorizontal: 60,
        lineHeight: 26,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        color: "#110C22",
        fontFamily: "Onest-Medium",
        flex: 1,
        paddingRight: 14,
    },
    inputWrapper: {
        alignItems: 'center',
    },
    continueBtn: {
        backgroundColor: '#015656',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,
       
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Onest-Medium",
    },
    footerText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 14,
        color: '#0000007A',
        fontFamily: "Onest-Medium",
    },
    loginText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 14,
        color: '#015656',
        fontFamily: "Onest-Medium",
    },
});

export default ForgotPasswordScreen;
