import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { PendingCard } from '../../../../components/productList/PendingCard';
import { FilterOptions } from '../../../../components/modals/FilterModal';

interface PendingScreenProps {
  searchQuery: string;
  filters: FilterOptions;
}

const PendingScreen = ({ searchQuery, filters }: PendingScreenProps) => {
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

  const filteredData = useMemo(() => {
    let filtered = [...sampleData];

    // Apply text search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.amount.toLowerCase().includes(lowerCaseQuery) ||
        item.date.includes(lowerCaseQuery)
      );
    }

    // Apply company filters
    if (filters.selectedCompanies && filters.selectedCompanies.length > 0) {
      filtered = filtered.filter(item =>
        filters.selectedCompanies!.includes(item.name)
      );
    }

    // Apply date range filter
    if (filters.dateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date.split('.').reverse().join('-'));
        
        if (filters.dateRange?.start && itemDate < filters.dateRange.start) {
          return false;
        }
        
        if (filters.dateRange?.end && itemDate > filters.dateRange.end) {
          return false;
        }
        
        return true;
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <PendingCard item={item} />}
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

export default PendingScreen;