import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Routes } from "../../navigations/routes";

export const ApprovedCard: React.FC<{ item: any, detail?: any }> = ({ item, detail }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
                {
                    !detail &&
                    <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate(Routes.detail, { item })}>
                        <Text style={styles.detailText}>View details ▸</Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Debt:</Text>
                <Text style={styles.valueBlue}>209.29 AZN</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Confrontation Date:</Text>
                <Text style={styles.value}>15 Dec 2023</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
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
    valueBlue: {
        fontSize: 18,
        color: "#015656",
        fontWeight: "700",
    },
});