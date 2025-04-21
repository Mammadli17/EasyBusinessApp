import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import Carousel from '../../../components/carusel/Carusel';
import CustomerCardList from '../../../components/productList/ProductList';
import { CustomerCard } from '../../../components/productList/Card';
import { Routes } from '../../../navigations/routes';
import { screenWidth } from '../../../theme/const.styles';

const HomeScreenDetail: React.FC<TabScreenProps> = ({ navigation, route }: any) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <>
            <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Balance detailes</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.notificationIcon}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentWrapper}>
                    <CustomerCard item={route?.params?.item} detail={true} />
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate(Routes.order)}>
                                <SvgImage
                                    source={require("../../../assets/svg/detail/buy.svg")}
                                    height={19}
                                    width={19}
                                />
                                <Text style={styles.orderText}>
                                    Orders
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.orderCard}>
                                <SvgImage
                                    source={require("../../../assets/svg/detail/confra.svg")}
                                    height={19}
                                    width={19}
                                />
                                <Text style={styles.orderText}>
                                    Cofrontation
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate(Routes.paymnet,{item:route.params.item})}>
                                <SvgImage
                                    source={require("../../../assets/svg/detail/payment.svg")}
                                    height={19}
                                    width={19}
                                />
                                <Text style={styles.orderText}>
                                    Payments
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.orderCard}>
                                <SvgImage
                                    source={require("../../../assets/svg/detail/contract.svg")}
                                    height={19}
                                    width={19}
                                />
                                <Text style={styles.orderText}>
                                    Contracts
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
        fontFamily: "Onest-Medium",
    },
    notificationIcon: {
        position: 'absolute',
        left: 20,
    },
    contentWrapper: {
        paddingHorizontal: 20,
    },
    orderCard: {
        width: screenWidth*0.44,
        height: 96,
        borderRadius: 12,
        backgroundColor: "hsla(0, 0%, 100%, 1)",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },
    orderText: {
        color: "hsla(254, 48%, 9%, 1)",
        fontSize: 12,
    },
});

export default HomeScreenDetail;
