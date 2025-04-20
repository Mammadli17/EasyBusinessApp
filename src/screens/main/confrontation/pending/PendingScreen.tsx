import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { PendingCard } from '../../../../components/productList/PendingCard';

const PendingScreen = () => {
  const sampleData = [
    {
      id: '1',
      name: 'Pepsi',
      amount: '1,500 AZN',
      date: '20.04.2025',
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: '2',
      name: 'Coca-Cola',
      amount: '2,300 AZN',
      date: '20.04.2025',
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: '3',
      name: 'Red Bull',
      amount: '850 AZN',
      date: '20.04.2025',
      image: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      id: '4',
      name: 'Monster Energy',
      amount: '1,200 AZN',
      date: '22.04.2025',
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: '5',
      name: 'Fanta',
      amount: '950 AZN',
      date: '23.04.2025',
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: '6',
      name: 'Sprite',
      amount: '1,100 AZN',
      date: '24.04.2025',
      image: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      id: '7',
      name: '7UP',
      amount: '780 AZN',
      date: '25.04.2025',
      image: 'https://i.imgur.com/UYiroysl.jpg',
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => <PendingCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  listContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 110 : 60,
  }
});

export default PendingScreen;