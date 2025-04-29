import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Accordion, { InputField, ButtonField } from '../../../components/profile/Accordion';
import CustomButton from '../../../components/button/CustomButton';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { TypographyStyles } from '../../../theme/typography';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigations/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation.type';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
  const [editingProfile, setEditingProfile] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleAccordion = (section: 'account' | 'store' | 'settings') => {
    setOpenSection(openSection === section ? undefined : section);
  };

  const toggleEditProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const handleChangePhoto = () => {
    console.log('Change photo pressed');
    // Here you would implement photo selection logic
  };

  const handleDeletePhoto = () => {
    console.log('Delete photo pressed');
    // Here you would implement photo deletion logic
  };

  const handleEditEmail = () => {
    if (editingEmail) {
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
      onPress: () => navigation.navigate(Routes.language),
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
          <View style={[
            styles.headerBox,
            editingProfile && styles.headerBoxEditing
          ]}>
            {editingProfile && (
              <>
                <View style={styles.headerItems}>
                  <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={toggleEditProfile}
                  >
                    <SvgImage
                      source={require('../../../assets/svg/back/back.svg')}
                      width={14}
                      height={14}
                    />
                  </TouchableOpacity>
                  <View style={styles.warningContainer}>
                    <SvgImage
                      source={require('../../../assets/svg/profile/union.svg')}
                      width={16}
                      height={16}
                    />
                    <Text style={styles.warningText}>Image size must be 200x200</Text>
                  </View>
                </View>
              </>
            )}
            <View style={[styles.avatarWrapper, editingProfile && styles.avatarWrapperEditing]}>
              <SvgImage
                source={require('../../../assets/svg/profile/profile.svg')}
                width={48}
                height={48}
              />
            </View>
            {/* Hide name and surname when editingProfile is true */}
            {!editingProfile && (
              <Text style={styles.name}>{user.name}</Text>
            )}

            {!editingProfile ? (
              <CustomButton
                title="Edit Profile"
                onPress={toggleEditProfile}
                buttonStyle={styles.editProfileBtn}
                textStyle={styles.editProfileBtnText}
              />
            ) : (
              <View style={styles.photoButtonsContainer}>
                <CustomButton
                  title="Change Photo"
                  onPress={handleChangePhoto}
                  buttonStyle={styles.changePhotoBtn}
                  textStyle={styles.changePhotoBtnText}
                />
                <CustomButton
                  title="Delete Photo"
                  onPress={handleDeletePhoto}
                  buttonStyle={styles.deletePhotoBtn}
                  textStyle={styles.deletePhotoBtnText}
                />
              </View>
            )}
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
    paddingVertical: 16,
    position: 'relative',
  },
  headerBoxEditing: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarWrapperEditing: {
    marginTop: 12,
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
  headerItems: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 12,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
  },
  warningText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 16,
  },
  changePhotoBtn: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ECECED',
    borderRadius: 8,
    paddingVertical: 6,
  },
  changePhotoBtnText: {
    textAlign: 'center',
    color: '#4F4B5C',
    fontSize: 15,
    fontWeight: '500',
  },
  deletePhotoBtn: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFC7C7',
    borderRadius: 8,
    paddingVertical: 6,
  },
  deletePhotoBtnText: {
    textAlign: 'center',
    color: '#F03D3D',
    fontSize: 15,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default ProfileScreen;