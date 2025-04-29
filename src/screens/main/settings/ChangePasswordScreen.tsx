import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/input/TextInput';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateCurrentPassword = (): boolean => {
    if (!passwordData.currentPassword) {
      setErrors(prev => ({
        ...prev,
        currentPassword: t('Mövcud şifrənizi daxil edin'),
      }));
      return false;
    }
    return true;
  };

  const validateNewPasswords = (): boolean => {
    let isValid = true;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}:;<>?,./~]).{8,}$/;
    
    if (!passwordData.newPassword || !passwordPattern.test(passwordData.newPassword)) {
      setErrors(prev => ({
        ...prev,
        newPassword: t('Şifrəniz ən azı 1 böyük hərf, 1 rəqəm və 1 xüsusi simvol içərməlidir'),
      }));
      isValid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setErrors(prev => ({
        ...prev,
        confirmNewPassword: t('Şifrələr uyğun deyil'),
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (validateCurrentPassword()) {
        setStep(2);
      }
    } else {
      if (validateNewPasswords()) {
        // Here you would implement the password change API call
        console.log('Password change successful');
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor="#F3F3F3" />
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => navigation.goBack()}>
              <SvgImage
                source={require("../../../assets/svg/back/back.svg")}
                height={14}
                width={14}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{t('Şifrəni dəyiş')}</Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={styles.headert}>
              {step === 1 
                ? t('Yeni şifrə təyin etməzdən əvvəl şəxsiyyətinizi təsdiqləmək üçün mövcud şifrənizi daxil edin.')
                : t('Şifrənizi dəyişmək üçün mövcud şifrənizi və yeni şifrənizi daxil edin.')}
            </Text>
          </View>

          <View style={{ gap: 15, marginTop: 30 }}>
            {step === 1 ? (
              <View>
                <CustomInput
                  label={t('Mövcud şifrə')}
                  icon={require('../../../assets/svg/textInput/password.svg')}
                  placeholder={t('Mövcud şifrə')}
                  value={passwordData.currentPassword}
                  onChangeText={(value) => handleInputChange('currentPassword', value)}
                  password={true}
                  error={errors.currentPassword}
                />
              </View>
            ) : (
              <>
                <View>
                  <CustomInput
                    label={t('Yeni şifrə')}
                    icon={require('../../../assets/svg/textInput/password.svg')}
                    placeholder={t('Yeni şifrə')}
                    value={passwordData.newPassword}
                    onChangeText={(value) => handleInputChange('newPassword', value)}
                    password={true}
                    error={errors.newPassword}
                  />
                </View>
                <View>
                  <CustomInput
                    label={t('Yeni şifrəni təsdiqlə')}
                    icon={require('../../../assets/svg/textInput/password.svg')}
                    placeholder={t('Yeni şifrəni təsdiqlə')}
                    value={passwordData.confirmNewPassword}
                    onChangeText={(value) => handleInputChange('confirmNewPassword', value)}
                    password={true}
                    error={errors.confirmNewPassword}
                  />
                </View>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>
              {step === 1 ? t('Davam et') : t('Şifrəni yenilə')}
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
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headert: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.48)',
    fontFamily: 'Onest-Medium',
    marginHorizontal: 20,
    lineHeight: 26,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#110C22',
    fontFamily: 'Onest-Medium',
    flex: 1,
    paddingRight: 14,
  },
  continueBtn: {
    backgroundColor: '#015656',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    height: 48,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Onest-Medium',
  },
});

export default ChangePasswordScreen;