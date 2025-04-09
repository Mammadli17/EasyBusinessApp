import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { normalize } from '../../../theme/metrics';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/button/CustomButton';
import { Routes } from '../../../navigations/routes';

const { width, height } = Dimensions.get('window');


export default function OnboardingScreen({ navigation }: any) {
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      key: '1',
      title: t('Səyahətinizə Bizimlə Başlayın.'),
      description: t('Güclü xüsusiyyətlərin kilidini açmaq üçün indi qeydiyyatdan keçin. Hesab yaratmaq və biznesinizi inkişaf etdirməyə başlamaq üçün e-poçtunuzu daxil edin!'),
      image: require('../../../assets/images/onboarding/image.png'),
      button: t('Növbəti'),
    },
    {
      key: '2',
      title: t('Hər zaman və hər yerdə məlumatda qalın'),
      description: t('Təchizatçılara olan borclarınızı izləyin, sifarişlərinizi təqib edin və hər yerdən kampaniyalar barədə məlumatlı olun. Biznesinizi asanlıqla və səmərəli idarə edin.'),
      image: require('../../../assets/images/onboarding/image2.png'),
      button: t('Növbəti'),
    },
    {
      key: '3',
      title: t('Sorğuları bir kliklə təsdiqləyin'),
      description: t('Şirkət sorğularını tez və asanlıqla bir kliklə təsdiqləyin. Proseslərinizi sadələşdirin və vaxtınıza və enerjinizə qənaət edin.'),
      image: require('../../../assets/images/onboarding/image.png'),
      button: t('Başla →'),
    },
  ];


  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('Get Started');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SvgImage
          source={require("../../../assets/svg/app/app.svg")}
          height={40}
          width={96}
        />
      </View>
      <View style={[styles.slide, { marginTop: normalize("height", 40) }]}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          keyExtractor={(item) => item.key}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>

      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? '#015656' : '#110C2229' },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
  {currentIndex === slides.length - 1 ? (
    <CustomButton
      onPress={() => navigation.navigate(Routes.login)} 
      title={t('Başla')}
      buttonStyle={[styles.continueButtonn, { backgroundColor: "#015656" }]}
      textStyle={[styles.continueText]}
    />
  ) : (
    <>
      <CustomButton
        onPress={() => navigation.navigate(Routes.login)}
        title={t('Keçmək')}
        buttonStyle={[styles.continueButton, { backgroundColor: "white" }]}
        textStyle={[styles.continueText, { color: "#015656" }]}
      />
      <CustomButton
        onPress={() => handleNext()}
        title={t('Növbəti')}
        buttonStyle={styles.continueButton}
        textStyle={styles.continueText}
      />
    </>
  )}
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  icon: {
    alignItems: "center",
    marginTop: normalize("height", 14)
  },

  slide: {
    width,
    alignItems: 'center',
    height: normalize("height", 553),
    backgroundColor: "#FFFFFF",
    borderRadius: normalize("width", 30),
  },
  image: {
    width,
    height: normalize("height", 233),
    resizeMode: "contain",
    marginTop: normalize("height", 30)
  },
  title: {
    fontSize: normalize("font", 26),
    textAlign: 'center',
    color: '#000000',
    fontFamily: "Onest-Light",
    marginHorizontal: normalize("width", 44),
    marginTop: normalize("height", 35)
  },
  description: {
    fontSize: normalize("height", 14),
    color: '#0000007A',
    textAlign: 'center',
    marginTop: normalize("height", 30),
    paddingHorizontal: normalize("width", 33),
    fontFamily: "Onest-Light",
    lineHeight: normalize("height", 32),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    alignSelf: "center",
    bottom: normalize("height", 170)
  },
  dot: {
    height: normalize("height", 8),
    width: normalize("height", 8),
    borderRadius: normalize("height", 4),
    marginHorizontal: normalize("height", 4)
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: normalize("height", 20),
    width: '100%',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    gap: normalize("width", 10),
  },
  continueButton: {
    width: normalize("width", 160),
    height: normalize("height", 48),
    backgroundColor: "#015656",
    borderRadius: normalize("width", 10),
    alignItems: "center",
  },
  continueText: {
    fontSize: normalize("font", 16),
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  continueButtonn: {
    width: normalize("width", 327),
    height: normalize("height", 48),
    backgroundColor: "#015656",
    borderRadius: normalize("width", 10),
    alignItems: "center",
  },
});
