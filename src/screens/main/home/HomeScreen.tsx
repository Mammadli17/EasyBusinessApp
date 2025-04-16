import { View, Text } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { Routes } from '../../../navigations/routes';
import { SvgImage } from '../../../components/svgImage/SvgImage';

const HomeScreen: React.FC<TabScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#F3F3F3", alignItems: "center", justifyContent: "center" }}>
            <Text>HomeScreen</Text>
        </View>
    );
};

export default HomeScreen;