import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SvgImage } from '../../../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';

const PendingDetails = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const item = route?.params?.item;

  return (
    <>
      <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('Confrontation')}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <SvgImage
              source={require("../../../../../assets/svg/back/back.svg")}
              height={14}
              width={14}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image 
                source={{ uri: 'https://i.imgur.com/UYiroysl.jpg' }} 
                style={styles.avatar} 
              />
              <Text style={styles.name}>Pepsi</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Pending Approval</Text>
              </View>
            </View>

            <Text style={styles.notificationTitle}>Confrontation Notification</Text>
            
            <Text style={styles.message}>
              Hello. It's a message for you. Please confirm that you owe Pepsi 90 Azn.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => {}}>
                <Text style={[styles.buttonText, styles.approveButtonText]}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => {}}>
                <Text style={[styles.buttonText, styles.declineButtonText]}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsla(240, 4%, 95%, 1)",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    position: 'relative',
    backgroundColor: "hsla(0, 0%, 100%, 1)",
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
  contentWrapper: {
    paddingHorizontal: 20,
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    color: "hsla(257, 5%, 71%, 1)",
    fontSize: 14,
    fontFamily: "Onest-Medium",
  },
  value: {
    fontSize: 14,
    color: "hsla(254, 48%, 9%, 0.74)",
    fontFamily: "Onest-Medium",
  },
  valueGreen: {
    fontSize: 16,
    color: "hsla(180, 98%, 17%, 1)",
    fontWeight: "700",
    fontFamily: "Onest-Medium",
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
});

export default PendingDetails