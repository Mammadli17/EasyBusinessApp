import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Routes } from "../../navigations/routes";

type NotificationItem = {
  name: string;
  date: string;
  message: string;
  image: string;
};

type Props = {
  item: NotificationItem;
};

export const NotificationCard: React.FC<Props> = ({ item }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(Routes.notficationDetail,{item})}>
          <Text style={styles.buttonText}>Read more ▸</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Notification date:</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text
        style={styles.message}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 13,
    color: "#111827",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  date: {
    fontSize: 13,
    color: "#111827",
  },
  message: {
    fontSize: 14,
    color: "#111827",
    marginTop: 4,
  },
});
