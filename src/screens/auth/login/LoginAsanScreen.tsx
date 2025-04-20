import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/input/TextInput';
import { Routes } from '../../../navigations/routes';
import { screenWidth } from '../../../theme/const.styles';

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

const LoginAsanScreen = ({ navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const { t } = useTranslation();

    const [forumData, setForumData] = useState<ForumData>({
        fullname: '',
        fin: "",
        password: "",
        cpassword: "",
        number: "",
        email: "",
        location: "",
        workplace: "",
        tin: "",
    });

    const handleInputChange = (field: any, value: any) => {
        setForumData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#F3F3F3"} />
            <View style={styles.header}>
                <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => navigation.goBack()}>
                    <SvgImage
                        source={require("../../../assets/svg/back/back.svg")}
                        height={14}
                        width={14}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{t('Daxil ol')} </Text>
            </View>

            <View style={styles.headerContainer}>
                <SvgImage
                    source={require("../../../assets/svg/asan/asan.svg")}
                    height={80}
                    width={80}
                />
                <Text style={styles.headert}>
                    {t('Asan İmza identifikasiya seçimi ilə tez və təhlükəsiz daxil olun.')}
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <CustomInput
                    label={t("Mobil nömrə")}
                    icon={require('../../../assets/svg/textInput/phone.svg')}
                    placeholder={t("Mobil nömrə")}
                    value={forumData.fin}
                    onChangeText={(value: any) => handleInputChange('fin', value)}
                />
                <CustomInput
                    label={t("İstifadəçi ID")}
                    icon={require('../../../assets/svg/textInput/email.svg')}
                    placeholder={t("İstifadəçi ID")}
                    value={forumData.password}
                    onChangeText={(value: any) => handleInputChange('password', value)}
                    password={true}
                />
            </View>

            <TouchableOpacity style={[styles.continueBtn, { width: screenWidth - 40 }]} onPress={() => { }}>
                <Text style={styles.continueText}>
                    {t('Giriş et')}
                </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.authOption} onPress={() => navigation.navigate(Routes.loginemail)}>
                    <SvgImage
                        source={require("../../../assets/svg/textInput/emailS.svg")}
                        height={20}
                        width={20}
                    />
                    <Text style={styles.authText}>{t('E-poçt ilə daxil olun')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate(Routes.register)}>
                    <Text style={styles.footerText}>
                        {t('Don’t have an account?')} <Text style={styles.loginText}>{t('Qeydiyyatdan keçin')}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: "center",
        marginHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    headert: {
        fontSize: 14,
        textAlign: 'center',
        color: "rgba(17, 12, 34, 0.74)",
        fontFamily: "Onest-Medium",
        marginHorizontal: 20,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        color: "#110C22",
        fontFamily: "Onest-Medium",
        flex: 1,
        paddingRight: 14,
    },
    headerContainer: {
        marginTop: 40,
        backgroundColor: "rgba(255, 255, 255, 1)",
        height: 160,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        marginTop: 30,
        gap: 20
    },
    continueBtn: {
        backgroundColor: '#015656',
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,
        height: 48,
        justifyContent:"center",
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Onest-Medium",
    },
    authOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 48,
        borderRadius: 12,
        alignSelf: "center",
        gap: 10,
        justifyContent: "center",
        width: screenWidth - 40
        ,},
    authText: {
        fontSize: 16,
        fontFamily: "Onest-Medium",
        color: "#015656",
    },
    footer: {
        position: "absolute",
        bottom: 20,
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

export default LoginAsanScreen;
