import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { CustomerCard } from "./Card";

const data = [
    {
        id: "1",
        name: "Pepsi",
        balance: "209.29 AZN",
        customerCode: "231143109",
        creditLimit: "1990 AZN",
        image: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
        id: "2",
        name: "Coca-Cola",
        balance: "320.00 AZN",
        customerCode: "231143110",
        creditLimit: "1500 AZN",
        image: "https://i.imgur.com/UPrs1EWl.jpg",
    },
    {
        id: "3",
        name: "Red Bull",
        balance: "150.50 AZN",
        customerCode: "231143111",
        creditLimit: "1800 AZN",
        image: "https://i.imgur.com/MABUbpDl.jpg",
    },
];

export default function CustomerCardList() {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CustomerCard item={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        paddingBottom: 130
    }
});
