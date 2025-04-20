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
import OtpInput from '../../../components/otp/Otp';


const OtpScreen = ({ navigation }: any) => {
  const { t } = useTranslation();




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
          <Text style={styles.title}>{t('OTP')} </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <OtpInput />
        </View>
        <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
          <TouchableOpacity >
            <Text style={styles.footerText}>
              {t('Didn’t receive OTP?')}
            </Text>
            <TouchableOpacity >
              <Text style={styles.loginText}>{t('Resend OTP')}</Text>
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


export default OtpScreen