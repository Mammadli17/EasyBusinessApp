import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Platform,
} from "react-native";
import { SvgImage } from "../../../components/svgImage/SvgImage";
import { TabScreenProps } from "../../../types/navigation.type";
import { NotificationCard } from "../../../components/productList/NotficationCard.";
import { Routes } from "../../../navigations/routes";

const notifications = [
    {
        id: "1",
        name: "Pepsi",
        date: "19.05.2024",
        message: "Hello. It's message for you. Please confirm that you owe Pepsi 90 Azn.",
        image: "https://i.imgur.com/UYiroysl.jpg",
        isRead: false,
    },
    {
        id: "2",
        name: "Red Bull",
        date: "20.04.2024",
        message:
            "This is a longer notification message just to test if it truncates after two lines. Let's see what happens when it overflows.",
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

const NotificationsScreen: React.FC<TabScreenProps<Routes.home>> = ({ navigation }) => {
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
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationCard item={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
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
    content: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 80,
    },
    backButton: {
        position: 'absolute',
        left: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

export default NotificationsScreen;
