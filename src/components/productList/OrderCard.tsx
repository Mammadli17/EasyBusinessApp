import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Routes } from "../../navigations/routes";
import { TouchableOpacity } from "react-native";

export const CustomerCard: React.FC<{ item: any, detail?: any }> = ({ item, detail }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
           

            <View style={styles.topRow}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>    
                
                    <TouchableOpacity style={styles.detailButton} onPress={() => {}}>
                        <Text style={styles.detailText}>View details ▸</Text>
                    </TouchableOpacity>
                
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Balance:</Text>
                <Text style={styles.valueGreen}>{item.balance}</Text>
            </View>
            
            <View style={styles.infoRow}>
                <Text style={styles.label}>Order date:</Text>
                <Text style={styles.value}>{item.date}</Text>
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