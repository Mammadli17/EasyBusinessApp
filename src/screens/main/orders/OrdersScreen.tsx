import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { TabScreenProps } from '../../../types/navigation.type';
import { SvgImage } from '../../../components/svgImage/SvgImage';
import SearchBar from '../../../components/search/SearchInput';
import { CustomerCard } from '../../../components/productList/OrderCard';

const OrdersScreen: React.FC<TabScreenProps> = ({ navigation }: any) => {
    const data = [
        {
          id: "1",
          name: "Pepsi",
          balance: "209.29 AZN",
          customerCode: "231143109",
          creditLimit: "1990 AZN",
          image: "https://i.imgur.com/UYiroysl.jpg",
          date: "10.10.2023",
        },
        {
          id: "2",
          name: "Coca-Cola",
          balance: "320.00 AZN",
          customerCode: "231143110",
          creditLimit: "1500 AZN",
          image: "https://i.imgur.com/UPrs1EWl.jpg",
          date: "10.10.2023",
        },
        {
          id: "3",
          name: "Red Bull",
          balance: "150.50 AZN",
          customerCode: "231143111",
          creditLimit: "1800 AZN",
          image: "https://i.imgur.com/MABUbpDl.jpg",
          date: "10.10.2023",
        },
        {
          id: "4",
          name: "Fanta",
          balance: "280.00 AZN",
          customerCode: "231143112",
          creditLimit: "1400 AZN",
          image: "https://i.imgur.com/2nCt3Sbl.jpg",
          date: "10.10.2023",
        },
        {
          id: "5",
          name: "Sprite",
          balance: "100.25 AZN",
          customerCode: "231143113",
          creditLimit: "1300 AZN",
          image: "https://i.imgur.com/l49aYS3l.jpg",
          date: "10.10.2023",
        },
        {
          id: "6",
          name: "Mountain Dew",
          balance: "240.80 AZN",
          customerCode: "231143114",
          creditLimit: "1700 AZN",
          image: "https://i.imgur.com/0rVeh4bl.jpg",
          date: "10.10.2023",
        },
        {
          id: "7",
          name: "Lipton Ice Tea",
          balance: "180.40 AZN",
          customerCode: "231143115",
          creditLimit: "1250 AZN",
          image: "https://i.imgur.com/DvpvklRl.jpg",
          date: "10.10.2023",
        },
        {
          id: "8",
          name: "Ayran",
          balance: "60.00 AZN",
          customerCode: "231143116",
          creditLimit: "1100 AZN",
          image: "https://i.imgur.com/XP2BE7ql.jpg",
          date: "10.10.2023",
        },
        {
          id: "9",
          name: "Ice Coffee",
          balance: "210.00 AZN",
          customerCode: "231143117",
          creditLimit: "1350 AZN",
          image: "https://i.imgur.com/5tj6S7Ol.jpg",
          date: "10.10.2023",
        },
        {
          id: "10",
          name: "Fuse Tea",
          balance: "195.30 AZN",
          customerCode: "231143118",
          creditLimit: "1450 AZN",
          image: "https://i.imgur.com/GlqF0al.jpg",
          date: "10.10.2023",
        },
        {
          id: "11",
          name: "Dr Pepper",
          balance: "210.50 AZN",
          customerCode: "231143119",
          creditLimit: "1550 AZN",
          image: "https://i.imgur.com/w1zSYmOl.jpg",
          date: "10.10.2023",
        },
        {
          id: "12",
          name: "Monster",
          balance: "230.00 AZN",
          customerCode: "231143120",
          creditLimit: "1650 AZN",
          image: "https://i.imgur.com/55n9D5ol.jpg",
          date: "10.10.2023",
        },
        {
          id: "13",
          name: "Nestea",
          balance: "175.20 AZN",
          customerCode: "231143121",
          creditLimit: "1250 AZN",
          image: "https://i.imgur.com/EHyR2nbl.jpg",
          date: "10.10.2023",
        },
        {
          id: "14",
          name: "Tropicana",
          balance: "260.70 AZN",
          customerCode: "231143122",
          creditLimit: "1500 AZN",
          image: "https://i.imgur.com/MABUbpDl.jpg",
          date: "10.10.2023",
        },
        {
          id: "15",
          name: "Juicy",
          balance: "205.00 AZN",
          customerCode: "231143123",
          creditLimit: "1490 AZN",
          image: "https://i.imgur.com/UPrs1EWl.jpg",
          date: "10.10.2023",
        },
        {
          id: "16",
          name: "Iceberg Water",
          balance: "85.00 AZN",
          customerCode: "231143124",
          creditLimit: "1000 AZN",
          image: "https://i.imgur.com/UYiroysl.jpg",
          date: "10.10.2023",
        },
        {
          id: "17",
          name: "Sirab",
          balance: "92.30 AZN",
          customerCode: "231143125",
          creditLimit: "950 AZN",
          image: "https://i.imgur.com/2nCt3Sbl.jpg",
          date: "10.10.2023",
        },
        {
          id: "18",
          name: "Borjomi",
          balance: "123.45 AZN",
          customerCode: "231143126",
          creditLimit: "1050 AZN",
          image: "https://i.imgur.com/l49aYS3l.jpg",
          date: "10.10.2023",
        },
        {
          id: "19",
          name: "Piko",
          balance: "202.20 AZN",
          customerCode: "231143127",
          creditLimit: "1150 AZN",
          image: "https://i.imgur.com/0rVeh4bl.jpg",
          date: "10.10.2023",
        },
        {
          id: "20",
          name: "Fruttimo",
          balance: "188.90 AZN",
          customerCode: "231143128",
          creditLimit: "1200 AZN",
          image: "https://i.imgur.com/DvpvklRl.jpg",
          date: "10.10.2023",
        },
        {
          id: "21",
          name: "Sirma",
          balance: "132.00 AZN",
          customerCode: "231143129",
          creditLimit: "980 AZN",
          image: "https://i.imgur.com/XP2BE7ql.jpg",
          date: "10.10.2023",
        },
        {
          id: "22",
          name: "Vita",
          balance: "174.00 AZN",
          customerCode: "231143130",
          creditLimit: "1080 AZN",
          image: "https://i.imgur.com/5tj6S7Ol.jpg",
          date: "10.10.2023",
        },
        {
          id: "23",
          name: "Capri-Sun",
          balance: "193.00 AZN",
          customerCode: "231143131",
          creditLimit: "1340 AZN",
          image: "https://i.imgur.com/GlqF0al.jpg",
          date: "10.10.2023",
        },
        {
          id: "24",
          name: "Hell Energy",
          balance: "210.00 AZN",
          customerCode: "231143132",
          creditLimit: "1600 AZN",
          image: "https://i.imgur.com/w1zSYmOl.jpg",
          date: "10.10.2023",
        },
        {
          id: "25",
          name: "Bonaqua",
          balance: "80.00 AZN",
          customerCode: "231143133",
          creditLimit: "1000 AZN",
          image: "https://i.imgur.com/55n9D5ol.jpg",
          date: "10.10.2023",
        },
        {
          id: "26",
          name: "Sadelka",
          balance: "110.00 AZN",
          customerCode: "231143134",
          creditLimit: "900 AZN",
          image: "https://i.imgur.com/EHyR2nbl.jpg",
          date: "10.10.2023",
        },
        {
          id: "27",
          name: "JuiceBox",
          balance: "215.00 AZN",
          customerCode: "231143135",
          creditLimit: "1400 AZN",
          image: "https://i.imgur.com/MABUbpDl.jpg",
          date: "10.10.2023",
        },
        {
          id: "28",
          name: "Duracool",
          balance: "187.00 AZN",
          customerCode: "231143136",
          creditLimit: "1350 AZN",
          image: "https://i.imgur.com/UPrs1EWl.jpg",
          date: "10.10.2023",
        },
        {
          id: "29",
          name: "Lattesso",
          balance: "190.00 AZN",
          customerCode: "231143137",
          creditLimit: "1450 AZN",
          image: "https://i.imgur.com/UYiroysl.jpg",
          date: "10.10.2023",
        },
        {
          id: "30",
          name: "Chudo",
          balance: "165.00 AZN",
          customerCode: "231143138",
          creditLimit: "1250 AZN",
          image: "https://i.imgur.com/2nCt3Sbl.jpg",
          date: "10.10.2023",
        }
      ];
      
      

    const [filteredData, setFilteredData] = useState(data);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "hsla(0, 0%, 100%, 1)", paddingBottom: 20 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>Orders</Text>

                    {/* Sağ tərəfi balansda saxlamaq üçün boş View */}
                    <View style={{ width: 22 }} />
                </View>

                <SearchBar data={data} searchField="name" onSearch={setFilteredData} />
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CustomerCard item={item} />}
                    contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: 'hsla(254, 48%, 9%, 1)',
        fontFamily: "Onest-Light",
    },
});

export default OrdersScreen;
