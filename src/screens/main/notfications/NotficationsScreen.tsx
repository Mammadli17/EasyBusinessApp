import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SvgImage } from "../../../components/svgImage/SvgImage";
import { TabScreenProps } from "../../../types/navigation.type";
import { NotificationCard } from "../../../components/productList/NotficationCard.";

const notifications = [
    {
        id: "1",
        name: "Pepsi",
        date: "19.05.2024",
        message: "Hello. It’s message for you. Please confirm that you owe Pepsi 90 Azn.",
        image: "https://i.imgur.com/UYiroysl.jpg",
        isRead: false,
    },
    {
        id: "2",
        name: "Red Bull",
        date: "20.04.2024",
        message:
            "This is a longer notification message just to test if it truncates after two lines. Let’s see what happens when it overflows.",
        image: "https://i.imgur.com/MABUbpDl.jpg",
        isRead: true,

    },
    {
        id: "3",
        name: "Coca-Cola",
        date: "01.04.2024",
        message: "New invoice available for review. Please take necessary actions.",
        image: "https://i.imgur.com/UPrs1EWl.jpg",
        isRead: true,

    },
];

const NotificationsScreen: React.FC<TabScreenProps> = ({ navigation }) => {
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

                <View style={styles.contentWrapper}>
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <NotificationCard
                               item={item}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
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
});

export default NotificationsScreen;
