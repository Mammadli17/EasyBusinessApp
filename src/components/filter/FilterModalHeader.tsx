import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterModalHeaderProps {
  onClose: () => void;
}

export const FilterModalHeader = ({ onClose }: FilterModalHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={{ width: 32 }} />
      </View>
      <Text style={styles.headerText}>Filter</Text>
      <TouchableOpacity onPress={onClose} style={styles.headerRight}>
        <Text style={styles.closeButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    width: 32,
  },
  headerRight: {
    width: 32,
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 26,
    color: '#000000',
    fontFamily: 'Onest-Bold',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
    fontSize: 16,
  },
});