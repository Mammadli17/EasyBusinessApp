import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native';
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
        <View style={styles.wrapper}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <SvgImage
                            source={require("../../../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('Üzləşmə')}</Text>
                </View>
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
        paddingHorizontal: 20,
        paddingTop: 20,
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