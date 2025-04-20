import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SvgImage } from "../svgImage/SvgImage";

type SearchBarProps<T> = {
    data: T[];
    searchField: keyof T;
    onSearch: (filteredData: T[]) => void;
};

export default function SearchBar<T>({ data, searchField, onSearch }: SearchBarProps<T>) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const filtered = data.filter(item =>
            String(item[searchField]).toLowerCase().includes(query.toLowerCase())
        );
        onSearch(filtered);
    }, [query]);

    return (
        <View style={styles.container}>
            <SvgImage
                source={require("../../assets/svg/search/search.svg")}
                height={18}
                width={18}
            />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
                value={query}
                onChangeText={setQuery}
            />
            <SvgImage
                source={require("../../assets/svg/filter/filter.svg")}
                height={18}
                width={18}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#111827",
        marginHorizontal: 8,
    },
});
