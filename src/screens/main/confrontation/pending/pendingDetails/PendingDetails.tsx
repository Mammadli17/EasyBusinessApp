import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { SvgImage } from '../../../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import { Routes } from '../../../../../navigations/routes';
import { DeclineReasonModal } from '../../../../../components/modals/DeclineReasonModal';

const PendingDetails = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const item = route?.params?.item;
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const handleApprove = () => {
    navigation.navigate(Routes.confrontationOtp, { item });
  };

  const handleCloseDecline = () => {
    setDeclineModalVisible(false);
    setDeclineReason('');
  };

  const handleConfirmDecline = (reason: string) => {
    handleCloseDecline();
    navigation.goBack();
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
          <Text style={styles.headerTitle}>{t('Confrontation')}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.contentWrapper}>
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image 
                source={{ uri: item?.image || 'https://i.imgur.com/UYiroysl.jpg' }} 
                style={styles.avatar} 
              />
              <Text style={styles.name}>{item?.name || 'Pepsi'}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Pending Approval</Text>
              </View>
            </View>

            <Text style={styles.notificationTitle}>Confrontation Notification</Text>
            
            <Text style={styles.message}>
              {item?.message || 'Hello. It\'s a message for you. Please confirm that you owe Pepsi 90 Azn.'}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.approveButton]} 
                onPress={handleApprove}
              >
                <Text style={[styles.buttonText, styles.approveButtonText]}>{t('Approve')}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.declineButton]} 
                onPress={() => setDeclineModalVisible(true)}
              >
                <Text style={[styles.buttonText, styles.declineButtonText]}>{t('Decline')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <DeclineReasonModal
        visible={declineModalVisible}
        onClose={handleCloseDecline}
        onConfirm={handleConfirmDecline}
        reason={declineReason}
        onReasonChange={setDeclineReason}
      />
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
        backgroundColor: '#FFFFFF',
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
    contentWrapper: {
        padding: 20,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 3,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    name: {
        flex: 1,
        fontWeight: "600",
        fontSize: 16,
        color: "hsla(254, 48%, 9%, 0.74)",
        fontFamily: "Onest-Medium",
    },
    notificationTitle: {
        fontSize: 18,
        color: "#015656",
        marginBottom: 8,
        fontWeight: "700",
        fontFamily: "Onest-Medium",
    },
    message: {
        fontSize: 14,
        color: "hsla(254, 48%, 9%, 0.74)",
        marginBottom: 16,
        fontFamily: "Onest-Medium",
    },
    buttonContainer: {
        marginTop: 20,
        gap: 12,
    },
    button: {
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    approveButton: {
        backgroundColor: '#015656',
    },
    declineButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Onest-Medium",
    },
    approveButtonText: {
        color: '#FFFFFF',
    },
    declineButtonText: {
        color: '#EF4444',
    },
    statusBadge: {
        backgroundColor: "#FFFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#FFDD86",
    },
    statusText: {
        color: "#D97706",
        fontSize: 12,
        fontFamily: "Onest-Medium",
    },
});

export default PendingDetails;