import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface PickerColumnProps {
  data: Array<number | string>;
  selected: number;
  onSelect: (index: number) => void;
}

export const PickerColumn: React.FC<PickerColumnProps> = ({
  data,
  selected,
  onSelect,
}) => {
  const listRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selected === index && styles.selectedItem,
      ]}
      onPress={() => onSelect(index)}
    >
      <Text style={[
        styles.itemText,
        selected === index && styles.selectedItemText,
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.columnContainer}>
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_: any, index: number) => `item-${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={50}
        getItemLayout={(_: any, index: number) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    height: '100%',
    marginHorizontal: 5,
  },
  itemContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#E6F1F1',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Onest-Medium',
  },
  selectedItemText: {
    color: '#015656',
    fontWeight: '600',
  },
});