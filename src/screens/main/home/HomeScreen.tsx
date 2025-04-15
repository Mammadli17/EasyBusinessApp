import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { normalize } from '../../../theme/metrics'
import { RootStackParamList } from '../../../types/navigation.type'
import { Routes } from '../../../navigations/routes'
import { SvgImage } from '../../../components/svgImage/SvgImage'


const HomeScreen: React.FC<
    NativeStackScreenProps<RootStackParamList, Routes.home>
> = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: "#F2F6FF", alignItems: "center", justifyContent: "center" }}>
            <SvgImage
                source={require("../../../assets/svg/tabs/home.svg")}
                height={18}
                width={18}
                stroke={'red'}
            />
        </View>
    )
}

export default HomeScreen