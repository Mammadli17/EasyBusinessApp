import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import Carousel from '../../../components/carusel/Carusel';
import CustomerCardList from '../../../components/productList/ProductList';
import { Routes } from '../../../navigations/routes';

const HomeScreen: React.FC<TabScreenProps<Routes.home>> = ({ navigation }) => {
    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Home Page</Text>
                    <TouchableOpacity 
                        style={styles.notificationIcon}
                        onPress={() => {
                            // @ts-ignore: Root navigation method exists
                            navigation.navigate('Main', { screen: Routes.notfication })
                        }}
                    >
                        <SvgImage
                            source={require("../../../assets/svg/notfication/notfication.svg")}
                            height={31}
                            width={31}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <Carousel />
                <CustomerCardList />
            </View>
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
    content: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        marginTop: 20,
    },
    notificationIcon: {
        position: 'absolute',
        right: 0,
    },
});

export default HomeScreen;
