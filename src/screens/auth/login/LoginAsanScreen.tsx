import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Easing,
    StatusBar,
} from 'react-native';
import { normalize } from '../../../theme/metrics';
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
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar backgroundColor={"#F3F3F3"} />
            <View style={styles.header}>
                <TouchableOpacity style={{ paddingRight: normalize("width", 0) }} onPress={() => navigation.goBack()}>
                    <SvgImage
                        source={require("../../../assets/svg/back/back.svg")}
                        height={14}
                        width={14}
                    />
                </TouchableOpacity>
                <Text style={[styles.title]}>{t('Daxil ol')} </Text>
            </View>
            <View style={{ marginTop: normalize("height", 40), backgroundColor: "rgba(255, 255, 255, 1)", height: normalize("height", 160), width: normalize("width", 327), borderRadius: normalize("width", 12), alignItems: "center", justifyContent: "center" }}>
                <SvgImage
                    source={require("../../../assets/svg/asan/asan.svg")}
                    height={80}
                    width={80}
                />

                <Text style={styles.headert}>
                    {t('Asan İmza identifikasiya seçimi ilə tez və təhlükəsiz daxil olun.')}
                </Text>
            </View>

            <View style={{ gap: normalize("height", 15), marginTop: normalize("height", 30) }}>

                <View style={styles.inputWrapper}>
                    <CustomInput
                        label={t("Mobil nömrə")}
                        icon={require('../../../assets/svg/textInput/phone.svg')}
                        placeholder={t("Mobil nömrə")}
                        value={forumData.fin}
                        onChangeText={(value: any) => handleInputChange('fin', value)}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <CustomInput
                        label={t("İstifadəçi ID")}
                        icon={require('../../../assets/svg/textInput/email.svg')}
                        placeholder={t("İstifadəçi ID")}
                        value={forumData.password}
                        onChangeText={(value: any) => handleInputChange('password', value)}
                        password={true}
                    />
                </View>
             
            </View>


            <TouchableOpacity style={styles.continueBtn} onPress={() => { }}>
                <Text style={styles.continueText}>
                    {t('Giriş et')}
                </Text>
            </TouchableOpacity>


            <View style={{ position: "absolute", bottom: normalize("height", 20) }}>

                <TouchableOpacity style={styles.authOption} onPress={()=>navigation.navigate(Routes.loginemail)}>
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


        </ScrollView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        paddingHorizontal: normalize("width", 20),
        paddingTop: normalize("height", 20),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    check: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: normalize("width", 8),
        marginTop: normalize("height", 10)
    },
    headert: {
        fontSize: normalize("font", 14),
        textAlign: 'center',
        color: "rgba(17, 12, 34, 0.74)",
        fontFamily: "Onest-Medium",
        marginHorizontal: normalize("height", 30)
    },
    forgot: {
        fontSize: normalize("font", 12),
        textAlign: 'center',
        color: "rgba(0, 0, 0, 0.48)",
        fontFamily: "Onest-Medium",
    },
    title: {
        fontSize: normalize("font", 26),
        // marginBottom: 30,
        textAlign: 'center',
        color: "#110C22",
        fontFamily: "Onest-Medium",
        flex: 1,
        paddingRight: normalize("width", 14)

    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepCircleActive: {
        width: normalize("height", 32),
        height: normalize("height", 32),
        borderRadius: normalize("height", 16),
        backgroundColor: '#015656',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCircleInactive: {
        width: normalize("height", 32),
        height: normalize("height", 32),
        borderRadius: normalize("height", 16),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumber: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: normalize("font", 16)
    },
    stepNumberInactive: {
        color: '#110C2252',
        fontWeight: '600',
        fontSize: normalize("font", 16)

    },
    line: {
        width: normalize("width", 135),
        height: normalize("height", 1),
        backgroundColor: '#E0E0E0',
    },
    stepsLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalize("width", 45),
        marginVertical: normalize("height", 12),
    },
    stepLabelActive: {
        color: '#015656',
        fontWeight: '500',
        fontSize: normalize("font", 12),
        fontFamily: "Onest-Medium",
    },
    stepLabelInactive: {
        color: '#110C2252',
        fontWeight: '500',
        fontSize: normalize("font", 12),
        fontFamily: "Onest-Medium",

    },
    inputContainer: {
        marginTop: normalize("horizontal", 20),
    },
    inputWrapper: {
        alignItems: 'center',
    },

    continueBtn: {
        backgroundColor: '#015656',
        paddingVertical: normalize("height", 14),
        borderRadius: normalize("width", 12),
        alignItems: 'center',
        marginTop: normalize("height", 40),
        width: normalize("width", 327),
        height: normalize("height", 48),
    },
    continueText: {
        color: '#fff',
        fontSize: normalize("font", 16),
        fontWeight: '600',
        fontFamily: "Onest-Medium",

    },
    authOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: normalize("width", 327),
        height: normalize("height", 48),
        borderRadius: normalize("height", 12),
        alignSelf: "center",
        gap: normalize("width", 10),
        justifyContent: "center",

    },
    authText: {
        fontSize: normalize("font", 16),
        fontFamily: "Onest-Medium",
        color: "#015656"
    },
    footerText: {
        textAlign: 'center',
        marginTop: normalize("height", 24),
        fontSize: normalize("font", 14),
        color: '#0000007A',
        fontFamily: "Onest-Medium",

    },
    loginText: {
        textAlign: 'center',
        marginTop: normalize("height", 24),
        fontSize: normalize("font", 14),
        color: '#015656',
        fontFamily: "Onest-Medium",
    },
});

export default LoginAsanScreen;
