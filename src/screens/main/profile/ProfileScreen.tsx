import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Platform, Image } from 'react-native';
import Accordion, { InputField, ButtonField } from '../../../components/profile/Accordion';
import CustomButton from '../../../components/button/CustomButton';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { TypographyStyles } from '../../../theme/typography';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigations/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation.type';
import { ConfirmationModal } from '../../../components/modals/ConfirmationModal';
import { ImagePickerModal } from '../../../components/modals/ImagePickerModal';
import { launchImageLibrary, launchCamera, ImagePickerResponse, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleAccordion = (section: 'account' | 'store' | 'settings') => {
    setOpenSection(openSection === section ? undefined : section);
  };

  const currentLanguage = i18n.language;

  const editProfileBtnWidth = currentLanguage === 'ru' ? 200 : 140;

  const toggleEditProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      if (asset.uri) {
        setProfileImage(asset.uri);
        console.log('Image selected:', asset.uri);
      }
    }
  };

  const handleChooseFromLibrary = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8 as any,
      selectionLimit: 1,
    };

    launchImageLibrary(options, handleImagePickerResponse);
    setImagePickerModalVisible(false);
  };

  const handleTakePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8 as any,
      saveToPhotos: true,
    };

    launchCamera(options, handleImagePickerResponse);
    setImagePickerModalVisible(false);
  };

  const handleChangePhoto = () => {
    setImagePickerModalVisible(true);
  };

  const handleDeletePhoto = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setProfileImage(null);
    console.log('Photo deleted');
    setDeleteModalVisible(false);
  };

  const handleEditEmail = () => {
    if (editingEmail) {
      console.log('Saving email:', emailValue);
    }
    setEditingEmail(!editingEmail);

    if (!editingEmail) {
      setOpenSection('account');
    }
  };

  const handleEditLocation = () => {
    if (editingLocation) {
      console.log('Saving location:', locationValue);
    }
    setEditingLocation(!editingLocation);

    if (!editingLocation) {
      setOpenSection('store');
    }
  };

  const accountInputFields: InputField[] = [
    {
      icon: require('../../../assets/svg/textInput/profile.svg'),
      value: user.username,
      placeholder: t("İstifadəçi adı"),
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/fin.svg'),
      value: user.id,
      placeholder: t("Şəxsiyyət vəsiqəsinin FİN kodu"),
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/phone.svg'),
      value: user.phone,
      placeholder: t("Telefon nömrəsi"),
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/email.svg'),
      value: emailValue,
      placeholder: t("Elektron poçt"),
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
      placeholder: t("Mağaza adı"),
      editable: false
    },
    {
      icon: require('../../../assets/svg/textInput/location.svg'),
      value: locationValue,
      placeholder: t("Məkan"),
      editable: editingLocation,
      withEditButton: true,
      onEditPress: handleEditLocation,
      onChangeText: (text: string) => setLocationValue(text)
    },
    {
      icon: require('../../../assets/svg/textInput/tin.svg'),
      value: store.id,
      placeholder: t("Mağaza identifikatoru"),
      editable: false
    }
  ];

  const settingsButtonFields: ButtonField[] = [
    {
      title: t("Şifrəni dəyiş"),
      onPress: () => navigation.navigate(Routes.changePassword)
    },
    {
      title: t("Dili dəyiş"),
      onPress: () => navigation.navigate(Routes.language),
    },
    {
      title: t("Çıxış"),
      onPress: () => setLogoutModalVisible(true),
      style: 'logout'
    }
  ];

  const handleLogout = () => {
    navigation.navigate(Routes.login);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>{t('Profil')}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerBox, editingProfile && styles.headerBoxEditing]}>
          {editingProfile && (
            <>
              <View style={styles.headerItems}>
                <TouchableOpacity style={styles.backButton} onPress={toggleEditProfile}>
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
                  <Text style={styles.warningText}>{t('Şəklin ölçüsü 200x200 olmalıdır')}</Text>
                </View>
              </View>
            </>
          )}
          <View style={[styles.avatarWrapper, editingProfile && styles.avatarWrapperEditing]}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <SvgImage
                source={require('../../../assets/svg/profile/profile.svg')}
                width={48}
                height={48}
              />
            )}
          </View>

          {!editingProfile && (
            <Text style={styles.name}>{user.name}</Text>
          )}

          {!editingProfile ? (
            <CustomButton
              title={t('Profili redaktə et')}
              onPress={toggleEditProfile}
              buttonStyle={[styles.editProfileBtn, { width: editProfileBtnWidth }]}
              textStyle={styles.editProfileBtnText}
            />
          ) : (
            <View style={styles.photoButtonsContainer}>
              <CustomButton
                title={t('Şəkli dəyiş')}
                onPress={handleChangePhoto}
                buttonStyle={styles.changePhotoBtn}
                textStyle={styles.changePhotoBtnText}
              />
              <CustomButton
                title={t('Şəkli sil')}
                onPress={handleDeletePhoto}
                buttonStyle={styles.deletePhotoBtn}
                textStyle={styles.deletePhotoBtnText}
              />
            </View>
          )}
        </View>

        <Accordion
          title={t('Hesab məlumatları')}
          open={openSection === 'account'}
          onPress={() => handleAccordion('account')}
          chevronStroke="#232323"
          textColor="#C6C5CA"
          inputFields={accountInputFields}
        />

        <Accordion
          title={t('Mağaza məlumatları')}
          open={openSection === 'store'}
          onPress={() => handleAccordion('store')}
          chevronStroke="#232323"
          textColor="#C6C5CA"
          inputFields={storeInputFields}
        />

        <Accordion
          title={t('Tənzimləmələr')}
          open={openSection === 'settings'}
          onPress={() => handleAccordion('settings')}
          chevronStroke="#232323"
          textColor="#C6C5CA"
          buttonFields={settingsButtonFields}
        />
      </ScrollView>
      <ConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        title={t('Şəkli sil')}
        description={t('Profil şəklinizi silmək istədiyinizə əminsiniz?')}
        confirmText={t('Şəkli sil')}
        cancelText={t('Ləğv et')}
        type="danger"
      />

      <ConfirmationModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
        title={t('Çıxış')}
        description={t('Çıxış etmək istədiyinizə əminsiniz? Yenidən daxil olmaq üçün hesab məlumatlarınızı daxil etməlisiniz.')}
        confirmText={t('Çıxış')}
        cancelText={t('Ləğv et')}
        type="danger"
      />

      <ImagePickerModal
        visible={imagePickerModalVisible}
        onClose={() => setImagePickerModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromLibrary={handleChooseFromLibrary}
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
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#110C22',
    fontFamily: "Onest-Medium",
  },
  content: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
    marginTop: 4,
  },
  editProfileBtnText: {
    color: '#4F4B5C',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
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