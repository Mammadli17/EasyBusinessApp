import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { SvgImage } from "../../../components/svgImage/SvgImage";
import { TabScreenProps } from "../../../types/navigation.type";
import { NotificationCard } from "../../../components/productList/NotficationCard.";



const NotficationDetail: React.FC<any> = ({ navigation, route }: any) => {
    const item = route?.params?.item;
    return (
        <>
            <StatusBar backgroundColor="hsla(0, 0%, 100%, 1)" barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.notificationIcon}>
                        <SvgImage
                            source={require("../../../assets/svg/back/back.svg")}
                            height={14}
                            width={14}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <View style={styles.topRow}>
                        <Image source={{ uri: item.image }} style={styles.avatar} />
                        <Text style={styles.name}>{item.name}</Text>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>New</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Campaign Notification</Text>

                    </View>

                    <Text
                        style={styles.message}
                    >
                        {item.message}
                    </Text>
                    <TouchableOpacity style={{ height: 48, borderWidth: 1, borderColor: "hsla(0, 100%, 89%, 1)", borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 12 }}>
                        <Text style={{ color: "hsla(0, 86%, 59%, 1)", fontSize: 16, fontWeight: "600" }}>
                            Delete
                        </Text>
                    </TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 16,
        position: "relative",
        backgroundColor: "hsla(0, 0%, 100%, 1)",
        height: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "hsla(254, 48%, 9%, 1)",
        fontFamily: "Onest-Medium",
    },
    notificationIcon: {
        position: "absolute",
        left: 20,
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 20
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
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
        color: "#111827",
    },
    button: {
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "hsla(240, 3%, 93%, 1)"
    },
    buttonText: {
        fontSize: 13,
        color: "#111827",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        marginTop: 12
    },
    label: {
        fontSize: 18,
        color: "hsla(180, 98%, 17%, 1)",
        fontWeight: "700",
    },
    date: {
        fontSize: 13,
        color: "#111827",
    },
    message: {
        fontSize: 14,
        color: "hsla(254, 48%, 9%, 0.74)",
        marginTop: 4,
        fontWeight: "500"
    },
});


export default NotficationDetail