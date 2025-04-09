import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '../../../components/button/CustomButton'
import { Routes } from '../../../navigations/routes'
import { normalize } from '../../../theme/metrics'

const LoginScreen = ({navigation}:any) => {
  return (
    <View>
       <CustomButton
        onPress={() =>navigation.navigate(Routes.register) }
        title={'Növbəti'}
        buttonStyle={styles.continueButton}
        textStyle={styles.continueText}
      
      />
    </View>
  )
}

export default LoginScreen
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
    alignItems: 'center',
    height: normalize("height", 553),
    backgroundColor: "#FFFFFF",
    borderRadius: normalize("width", 30),
  },
  image: {
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