import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterModalHeaderProps {
  onClose: () => void;
}

export const FilterModalHeader: React.FC<FilterModalHeaderProps> = ({ onClose }) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Filter</Text>
      </View>
      <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
        <Text style={styles.closeButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#110C22',
    fontFamily: 'Onest-Medium',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
});