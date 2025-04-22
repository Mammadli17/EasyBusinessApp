import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { ApprovedCard } from '../../../../components/productList/ApprovedCard';

interface ApprovedScreenProps {
  searchQuery: string;
}

const ApprovedScreen = ({ searchQuery }: ApprovedScreenProps) => {
  const sampleData = [
    {
      id: '1',
      name: 'Pepsi',
      amount: '1,500 AZN',
      date: '19.04.2025',
      approvedBy: 'John Doe',
      approvedDate: '19.04.2025',
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: '2',
      name: 'Coca-Cola',
      amount: '2,300 AZN',
      date: '18.04.2025',
      approvedBy: 'Jane Smith',
      approvedDate: '18.04.2025',
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: '3',
      name: 'Red Bull',
      amount: '850 AZN',
      date: '17.04.2025',
      approvedBy: 'Mike Johnson',
      approvedDate: '17.04.2025',
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

  const filteredData = useMemo(() => {
    if (!searchQuery) return sampleData;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return sampleData.filter(item => 
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.amount.toLowerCase().includes(lowerCaseQuery) ||
      item.date.includes(lowerCaseQuery) ||
      (item.approvedBy && item.approvedBy.toLowerCase().includes(lowerCaseQuery)) ||
      (item.approvedDate && item.approvedDate.includes(lowerCaseQuery))
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ApprovedCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 120
  }
});

export default ApprovedScreen;
