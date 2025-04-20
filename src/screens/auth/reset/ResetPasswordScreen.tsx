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

const ResetPasswordScreen = ({ navigation }: any) => {
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

  const handleInputChange = (field: string, value: any) => {
    setForumData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor="#F3F3F3" />
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => navigation.goBack()}>
              <SvgImage
                source={require('../../../assets/svg/back/back.svg')}
                height={14}
                width={14}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{t('Şifrəni yenilə')}</Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={styles.headert}>
              {t('Zəhmət olmasa sıfırlama prosesini tamamlamaq üçün yeni şifrənizi daxil edin.')}
            </Text>
          </View>

          <View style={{ gap: 15, marginTop: 30 }}>
            <View>
              <CustomInput
                label={t('Yeni şifrə yarat')}
                icon={require('../../../assets/svg/textInput/password.svg')}
                placeholder={t('Yeni şifrə yarat')}
                value={forumData.password}
                onChangeText={(value: any) => handleInputChange('password', value)}
                password={true}
              />
            </View>

            <View>
              <CustomInput
                label={t('Yeni şifrəni yenilə')}
                icon={require('../../../assets/svg/textInput/password.svg')}
                placeholder={t('Yeni şifrəni yenilə')}
                value={forumData.cpassword}
                onChangeText={(value: any) => handleInputChange('cpassword', value)}
                password={true}
              />
            </View>
          </View>

          <View style={{ alignSelf: 'center', width: '100%' }}>
            <TouchableOpacity style={styles.continueBtn} onPress={() => {}}>
              <Text style={styles.continueText}>{t('Şifrəni yenilə')}</Text>
            </TouchableOpacity>
          </View>
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
    marginHorizontal: 60,
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

export default ResetPasswordScreen;
