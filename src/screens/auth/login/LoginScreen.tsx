// LoginScreen.tsx (normalize olmadan)

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

const LoginScreen = ({ navigation }: any) => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={"#F3F3F3"} />
        <View style={styles.header}>
          <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => navigation.goBack()}>
            <SvgImage
              source={require("../../../assets/svg/back/back.svg")}
              height={14}
              width={14}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{t('Daxil ol')}</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <Text style={styles.headert}>
            {t('Xoş gəlmisiniz. Hesabınıza daxil olun')}
          </Text>
        </View>

        <View style={{ gap: 15, marginTop: 30 }}>
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

          <View style={styles.check}>
            <CustomCheckbox
              label={t('Məni xatırla')}
              checked={isChecked}
              onChange={setIsChecked}
            />
            <TouchableOpacity onPress={() => navigation.navigate(Routes.forgot)}>
              <Text style={styles.forgot}>{t('Şifrəni unutmusunuz?')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate(Routes.waiting)}>
          <Text style={styles.continueText}>
            {t('Giriş et')}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={{ bottom: 0 }}>
          <TouchableOpacity style={styles.authOption} onPress={() => navigation.navigate(Routes.loginasan)}>
            <SvgImage
              source={require("../../../assets/svg/asan/asan.svg")}
              height={20}
              width={20}
            />
            <Text style={styles.authText}>{t('Asan İmza ilə daxil olun')}</Text>
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
    marginHorizontal: 20,
    justifyContent:"space-between"
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
    marginHorizontal: 8,
    marginTop: 10
  },
  headert: {
    fontSize: 16,
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.48)",
    fontFamily: "Onest-Medium",
    marginHorizontal: 60
  },
  forgot: {
    fontSize: 12,
    textAlign: 'center',
    color: "rgba(0, 0, 0, 0.48)",
    fontFamily: "Onest-Medium",
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: "#110C22",
    fontFamily: "Onest-Medium",
    flex: 1,
    paddingRight: 14
  },
  inputWrapper: {
    alignItems: 'center',
  },
  authOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%', // Ensures it takes up the full width
    height: 48, // Adjust this height as per your preference
    borderRadius: 12,
    alignSelf: "center",
    gap: 10, // Spacing between icon and text
    justifyContent: "center", // Center the contents horizontally
    marginTop: 10, // Add some margin to separate it from the content above
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
    fontFamily: "Onest-Medium",
  },

  authText: {
    fontSize: 16,
    fontFamily: "Onest-Medium",
    color: "#015656"
  },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#0000007A',
    fontFamily: "Onest-Medium",
  },
  loginText: {
    fontSize: 14,
    color: '#015656',
    fontFamily: "Onest-Medium",
  },
});

export default LoginScreen;
