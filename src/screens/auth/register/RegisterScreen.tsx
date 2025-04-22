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
  SafeAreaView,
} from 'react-native';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/input/TextInput';
import { Routes } from '../../../navigations/routes';
import { screenWidth } from '../../../theme/const.styles';

interface ForumData {
  fullname: string;
  fin: string;
  password: string;
  cpassword: string;
  number: string;
  email: string;
  location: string;
  workplace: string;
  tin: string;
}

const RegisterScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
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
    if (step === 2) {
      // Perform registration logic here
      navigation.navigate(Routes.waiting);
    }
  };

  const handleBack = () => {
    if (step === 2) animateStepChange(1);
    if (step === 1) navigation.goBack();
  };

  const handleInputChange = (field: keyof ForumData, value: string) => {
    setForumData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar backgroundColor="#F3F3F3" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <SvgImage
              source={require('../../../assets/svg/back/back.svg')}
              height={14}
              width={14}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{t('Qeydiyyatdan keçin')}</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={styles.stepsContainer}>
            <View style={step === 1 ? styles.stepCircleActive : styles.stepCircleInactive}>
              <Text style={step === 1 ? styles.stepNumber : styles.stepNumberInactive}>1</Text>
            </View>
            <View style={styles.line} />
            <View style={step === 2 ? styles.stepCircleActive : styles.stepCircleInactive}>
              <Text style={step === 2 ? styles.stepNumber : styles.stepNumberInactive}>2</Text>
            </View>
          </View>

          <View style={styles.stepsLabelContainer}>
            <Text style={step === 1 ? styles.stepLabelActive : styles.stepLabelInactive}>
              {t('Hesab qurulması')}
            </Text>
            <Text style={step === 2 ? styles.stepLabelActive : styles.stepLabelInactive}>
              {t('Mağaza detalları')}
            </Text>
          </View>
        </View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            },
          ]}
        >
          {step === 1 ? (
            <View style={styles.inputGroup}>
              <CustomInput
                label={t('Tam ad')}
                icon={require('../../../assets/svg/textInput/profile.svg')}
                placeholder={t('Tam ad')}
                value={forumData.fullname}
                onChangeText={(val) => handleInputChange('fullname', val)}
              />
              <CustomInput
                label={t('FIN kodu')}
                icon={require('../../../assets/svg/textInput/fin.svg')}
                placeholder={t('FIN kodu')}
                value={forumData.fin}
                onChangeText={(val) => handleInputChange('fin', val)}
              />
              <CustomInput
                label={t('Şifrə')}
                icon={require('../../../assets/svg/textInput/password.svg')}
                placeholder={t('Şifrə')}
                value={forumData.password}
                onChangeText={(val) => handleInputChange('password', val)}
                password
              />
              <CustomInput
                label={t('Şifrəni yenidən daxil edin')}
                icon={require('../../../assets/svg/textInput/password.svg')}
                placeholder={t('Şifrəni yenidən daxil edin')}
                value={forumData.cpassword}
                onChangeText={(val) => handleInputChange('cpassword', val)}
                password
              />
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <CustomInput
                label={t('Telefon nömrəsi')}
                icon={require('../../../assets/svg/textInput/phone.svg')}
                placeholder={t('Telefon nömrəsi')}
                value={forumData.number}
                onChangeText={(val) => handleInputChange('number', val)}
              />
              <CustomInput
                label={t('E-poçt')}
                icon={require('../../../assets/svg/textInput/email.svg')}
                placeholder={t('E-poçt')}
                value={forumData.email}
                onChangeText={(val) => handleInputChange('email', val)}
              />
              <CustomInput
                label={t('İş yeri')}
                icon={require('../../../assets/svg/textInput/work.svg')}
                placeholder={t('İş yeri')}
                value={forumData.workplace}
                onChangeText={(val) => handleInputChange('workplace', val)}
              />
              <CustomInput
                label={t('Yer')}
                icon={require('../../../assets/svg/textInput/location.svg')}
                placeholder={t('Yer')}
                value={forumData.location}
                onChangeText={(val) => handleInputChange('location', val)}
              />
              <CustomInput
                label={t('VÖEN')}
                icon={require('../../../assets/svg/textInput/tin.svg')}
                placeholder={t('VÖEN')}
                value={forumData.tin}
                onChangeText={(val) => handleInputChange('tin', val)}
              />
            </View>
          )}
        </Animated.View>

        <TouchableOpacity style={styles.continueBtn} onPress={handleNext}>
          <Text style={styles.continueText}>
            {step === 1 ? t('Davam et') : t('Qeydiyyatdan keçin')}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.authOption}>
            <SvgImage
              source={require('../../../assets/svg/asan/asan.svg')}
              height={20}
              width={20}
            />
            <Text style={styles.authText}>{t('Asan İmza ilə qeydiyyatdan keçin')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(Routes.login)}>
            <Text style={styles.footerText}>
              {t('Artıq hesabınız var?')}{' '}
              <Text style={styles.loginText}>{t('Daxil ol')}</Text>
            </Text>
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
    marginHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#110C22',
    fontFamily: 'Onest-Medium',
    flex: 1,
    paddingRight: 14,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#015656',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  stepNumberInactive: {
    color: '#110C2252',
    fontWeight: '600',
    fontSize: 16,
  },
  line: {
    width: screenWidth*0.4,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  stepsLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 45,
    marginTop: 10,
  },
  stepLabelActive: {
    fontSize: 14,
    color: '#015656',
    fontWeight: '600',
  },
  stepLabelInactive: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 30,
  },
  inputGroup: {
    gap: 15,
  },
  continueBtn: {
    marginTop: 30,
    backgroundColor: '#015656',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  authOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  authText: {
    color: '#015656',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#555',
  },
  loginText: {
    color: '#015656',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
