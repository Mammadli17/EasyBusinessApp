import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SvgImage } from '../../../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import OtpInput from '../../../../../components/otp/Otp';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../../navigations/routes';

const ConfrontationOtpScreen = ({ route }: any) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const item = route?.params?.item;
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    const handleResendOtp = () => {
        setIsResendDisabled(true);
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    return (
        <>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t('Üzləşmə')}</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <SvgImage
                            source={require("../../../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.confirmationText}>
                        {`"By entering the OTP, you confirm that you owe ${item?.name || 'the company'} ${item?.amount || '90 AZN'}."`}
                    </Text>
                    <OtpInput />
                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>
                            {t('OTP kod almadınız?')}
                            {isResendDisabled && ` (${timer}s)`}
                        </Text>
                        <TouchableOpacity
                            onPress={handleResendOtp}
                            disabled={isResendDisabled}
                        >
                            <Text style={[
                                styles.resendButton,
                                isResendDisabled && styles.resendButtonDisabled
                            ]}>
                                {t('OTP kodu yenidən göndər')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        position: 'relative',
        height: 60
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: 'hsla(254, 48%, 9%, 1)',
        fontFamily: "Onest-Medium",
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    content: {
        paddingHorizontal: 20,
    },
    confirmationText: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.48)',
        fontFamily: "Onest-Medium",
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 55,
        lineHeight: 24
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    resendText: {
        fontSize: 14,
        color: '#0000007A',
        fontFamily: "Onest-Medium",
        marginBottom: 8,
    },
    resendButton: {
        fontSize: 14,
        color: '#015656',
        fontFamily: "Onest-Medium",
    },
    resendButtonDisabled: {
        opacity: 0.5,
    },
});

export default ConfrontationOtpScreen;