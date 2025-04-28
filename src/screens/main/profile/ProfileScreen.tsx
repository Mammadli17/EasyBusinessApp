import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import Accordion, { InputField, ButtonField } from '../../../components/profile/Accordion';
import CustomButton from '../../../components/button/CustomButton';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { TypographyStyles } from '../../../theme/typography';
import { useTranslation } from 'react-i18next';

const user = {
  name: 'Jamal Jahangirov',
  username: 'jamaljahangirov2',
  id: '180000',
  phone: '+9945000000000',
  email: 'jamaljahangirov@gmail.com',
};

const store = {
  name: 'Oba Store',
  location: 'Sumgait, Azerbaijan',
  id: '564656787879',
};

const ProfileScreen = () => {
  const [openSection, setOpenSection] = useState<'account' | 'store' | 'settings' | undefined>(undefined);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [emailValue, setEmailValue] = useState(user.email);
  const [locationValue, setLocationValue] = useState(store.location);
  const { t } = useTranslation();

  const handleAccordion = (section: 'account' | 'store' | 'settings') => {
    setOpenSection(openSection === section ? undefined : section);
  };

  const handleEditEmail = () => {
    if (editingEmail) {
      // Save changes when toggling from edit mode to view mode
      console.log('Saving email:', emailValue);
      // Here you would typically call an API to update the email
    }
    setEditingEmail(!editingEmail);
    
    if (!editingEmail) {
      setOpenSection('account');
    }
  };

  const handleEditLocation = () => {
    if (editingLocation) {
      // Save changes when toggling from edit mode to view mode
      console.log('Saving location:', locationValue);
      // Here you would typically call an API to update the location
    }
    setEditingLocation(!editingLocation);
    
    // Auto-expand store section when editing starts
    if (!editingLocation) {
      setOpenSection('store');
    }
  };

  const accountInputFields: InputField[] = [
    {
      icon: require('../../../assets/svg/textInput/profile.svg'),
      value: user.username,
      placeholder: "Username",
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/fin.svg'),
      value: user.id,
      placeholder: "ID",
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/phone.svg'),
      value: user.phone,
      placeholder: "Phone",
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/email.svg'),
      value: emailValue,
      placeholder: "Email",
      editable: editingEmail,
      withEditButton: true,
      onEditPress: handleEditEmail,
      onChangeText: (text: string) => setEmailValue(text)
    }
  ];

  const storeInputFields: InputField[] = [
    {
      icon: require('../../../assets/svg/textInput/work.svg'),
      value: store.name,
      placeholder: "Store Name",
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/location.svg'),
      value: locationValue,
      placeholder: "Location",
      editable: editingLocation,
      withEditButton: true,
      onEditPress: handleEditLocation,
      onChangeText: (text: string) => setLocationValue(text)
    },
    {
      icon: require('../../../assets/svg/textInput/tin.svg'),
      value: store.id,
      placeholder: "Store ID",
      editable: false
    }
  ];

  const settingsButtonFields: ButtonField[] = [
    {
      title: "Change Password",
      onPress: () => console.log('Change password pressed')
    },
    {
      title: "Change Language",
      onPress: () => console.log('Change language pressed')
    },
    {
      title: "Log out",
      onPress: () => console.log('Log out pressed'),
      style: 'logout'
    }
  ];

  return (
    <>
      <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('Profile')}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerBox}>
            <View style={styles.avatarWrapper}>
              <SvgImage source={require('../../../assets/svg/textInput/profile.svg')} width={64} height={64} />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <CustomButton 
              title="Edit Profile" 
              onPress={() => console.log('Edit profile pressed')} 
              buttonStyle={styles.editProfileBtn} 
              textStyle={styles.editProfileBtnText} 
            />
          </View>

          {/* Accordions */}
          <Accordion
            title="Account details"
            open={openSection === 'account'}
            onPress={() => handleAccordion('account')}
            chevronStroke="#232323"
            textColor="#C6C5CA"
            inputFields={accountInputFields}
          />

          <Accordion
            title="Store details"
            open={openSection === 'store'}
            onPress={() => handleAccordion('store')}
            chevronStroke="#232323"
            textColor="#C6C5CA"
            inputFields={storeInputFields}
          />

          <Accordion
            title="Settings"
            open={openSection === 'settings'}
            onPress={() => handleAccordion('settings')}
            chevronStroke="#232323"
            textColor="#C6C5CA"
            buttonFields={settingsButtonFields}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: "hsla(0, 0%, 100%, 1)",
    height: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: 'hsla(254, 48%, 9%, 1)',
    fontFamily: "Onest-Medium",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    ...TypographyStyles.LargeNoneMedium,
    marginBottom: 12,
    color: '#232323',
  },
  editProfileBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ECECED',
    borderRadius: 8,
    paddingVertical: 6,
    width: 140,
    marginTop: 4,
  },
  editProfileBtnText: {
    color: '#4F4B5C',
    fontSize: 15,
    fontWeight: '500',
  },
  settingsBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
  },
  settingsBtnText: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFE5E5',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
  },
  logoutBtnText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;