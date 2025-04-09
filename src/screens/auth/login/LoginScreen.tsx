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
const LoginScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
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
  const animateStepChange = (nextStep: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: nextStep > step ? 20 : -20,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      translateAnim.setValue(nextStep > step ? -20 : 20);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (step === 1) animateStepChange(2);
  };


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
      <View style={{ marginTop: normalize("height", 40) }}>


        <Text style={styles.headert}>
          {t('Xoş gəlmisiniz. Hesabınıza daxil olun')}
        </Text>
      </View>

      <View style={{ gap: normalize("height", 15),marginTop:normalize("height",30) }}>

        <View style={styles.inputWrapper}>
          <CustomInput
            label={t("FIN kodu")}
            icon={require('../../../assets/svg/textInput/fin.svg')}
            placeholder={t("FIN kodu")}
            value={forumData.fin}
            onChangeText={(value: any) => handleInputChange('fin', value)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            label={t("Şifrə")}
            icon={require('../../../assets/svg/textInput/password.svg')}
            placeholder={t("Şifrə")}
            value={forumData.password}
            onChangeText={(value: any) => handleInputChange('password', value)}
            password={true}
          />
        </View>

      </View>


      <TouchableOpacity style={styles.continueBtn} onPress={handleNext}>
        <Text style={styles.continueText}>
          {step === 1 ? t('Davam et') : t('Qeydiyyatdan keçin')}
        </Text>
      </TouchableOpacity>


      <View style={{ position: "absolute", bottom: normalize("height", 20) }}>

        <TouchableOpacity style={styles.authOption}>
          <SvgImage
            source={require("../../../assets/svg/asan/asan.svg")}
            height={20}
            width={20}
          />
          <Text style={styles.authText}>{t('Asan İmza ilə daxil olun')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate(Routes.register)}>
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
  headert: {
    fontSize: normalize("font", 16),
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.48)",
    fontFamily: "Onest-Medium",
    marginHorizontal: normalize("height", 60)
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
    marginTop: normalize("height", 30),
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

export default LoginScreen;
