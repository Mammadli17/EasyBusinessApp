// CustomerCardList.tsx

import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Routes } from "../../navigations/routes";
import { CustomerCard } from "./Card";

const data = [
    {
        id: "1",
        name: "Pepsi",
        balance: "209.29 AZN",
        customerCode: "231143109",
        creditLimit: "1990 AZN",
        image: "https://i.imgur.com/UYiroysl.jpg", // örnek resim
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
            contentContainerStyle={{ padding: 20,paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}

            />
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 3,

    },
    warningRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    warningIcon: {
        fontSize: 14,
        color: "#F59E0B",
        marginRight: 6,
    },
    warningText: {
        color: "hsla(40, 100%, 44%, 1)",
        fontSize: 14,
        fontWeight: "500",
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        justifyContent: "space-between",
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    name: {
        flex: 1,
        fontWeight: "600",
        fontSize: 16,
        color: "hsla(254, 48%, 9%, 0.74)",
    },
    detailButton: {
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "hsla(240, 3%, 93%, 1)"
    },
    detailText: {
        fontSize: 12,
        color: "hsla(254, 10%, 33%, 1)",
        fontWeight: "700"
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },
    label: {
        color: "hsla(257, 5%, 71%, 1)",
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        color: "hsla(254, 48%, 9%, 0.74)",
    },
    valueGreen: {
        fontSize: 16,
        color: "hsla(180, 98%, 17%, 1)",
        fontWeight: "700",

    },
});
