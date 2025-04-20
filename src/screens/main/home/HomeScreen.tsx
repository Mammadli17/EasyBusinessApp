import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import Carousel from '../../../components/carusel/Carusel';
import CustomerCardList from '../../../components/productList/ProductList';
import { Routes } from '../../../navigations/routes';

const HomeScreen: React.FC<TabScreenProps> = ({ navigation }) => {
    return (
        <>
            <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Home Page.</Text>
                    <TouchableOpacity style={styles.notificationIcon}
                        onPress={() => navigation.navigate(Routes.notfication)}
                        >
                        <SvgImage
                        source={require("../../../assets/svg/notfication/notfication.svg")}
                        height={31}
                        width={31}
                    />
                </TouchableOpacity>
            </View>
            <Carousel />
            <CustomerCardList />
        </SafeAreaView >
        </>
    );
};

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
    },
    notificationIcon: {
        position: 'absolute',
        right: 20,
    },
});

export default HomeScreen;
