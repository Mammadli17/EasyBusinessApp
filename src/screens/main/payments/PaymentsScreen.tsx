import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import { PaymentCard } from '../../../components/productList/PaymentCard';

const mockData = [
    {
        id: '1',
        name: 'Pepsi',
        balance: '209.29 AZN',
        customerCode: '231143109',
        creditLimit: '1990 AZN',
        image: 'https://i.imgur.com/UYiroysl.jpg',
        date: '10.10.2023',
    },
    {
        id: '2',
        name: 'Coca-Cola',
        balance: '320.00 AZN',
        customerCode: '231143110',
        creditLimit: '1500 AZN',
        image: 'https://i.imgur.com/UPrs1EWl.jpg',
        date: '10.10.2023',
    },
    {
        id: '3',
        name: 'Red Bull',
        balance: '150.50 AZN',
        customerCode: '231143111',
        creditLimit: '1800 AZN',
        image: 'https://i.imgur.com/MABUbpDl.jpg',
        date: '10.10.2023',
    },
    // Add more items here...
];

const PaymentsScreen: React.FC<TabScreenProps> = ({ navigation, route }: any) => {
    console.log("route", route.params.item);

    return (
        <>
            <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Payments</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.notificationIcon}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 20 }}>
                    <FlatList
                        data={mockData}
                        renderItem={({ item }) => (
                            <PaymentCard
                                key={item.id}
                                item={item}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
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
        width: 176,
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

export default PaymentsScreen;
