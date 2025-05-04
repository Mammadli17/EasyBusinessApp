import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { CustomerCard } from '../../../components/productList/Card';
import { Routes } from '../../../navigations/routes';
import { screenWidth } from '../../../theme/const.styles';

const HomeScreenDetail: React.FC<TabScreenProps<Routes.home>> = ({ navigation, route }: any) => {
    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Balance details</Text>
                </View>
            </View>

            <View style={styles.content}>
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
                                    Confrontation
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
    backButton: {
        position: 'absolute',
        left: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    orderCard: {
        width: screenWidth*0.44,
        height: 96,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },
    orderText: {
        color: "#110C22",
        fontSize: 12,
    },
});

export default HomeScreenDetail;
