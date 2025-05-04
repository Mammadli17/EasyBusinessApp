import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
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
          <Text style={styles.headerTitle}>{t('Şifrəni dəyiş')}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.mainContent}>
            <Text style={styles.description}>
              {step === 1 
                ? t('Yeni şifrə təyin etməzdən əvvəl şəxsiyyətinizi təsdiqləmək üçün mövcud şifrənizi daxil edin.')
                : t('Şifrənizi dəyişmək üçün mövcud şifrənizi və yeni şifrənizi daxil edin.')}
            </Text>

            <View style={styles.inputContainer}>
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
                  <View style={{ marginTop: 15 }}>
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
  scrollContent: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.48)',
    fontFamily: 'Onest-Medium',
    marginBottom: 30,
    lineHeight: 26,
  },
  inputContainer: {
    marginBottom: 30,
  },
  continueBtn: {
    backgroundColor: '#015656',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
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