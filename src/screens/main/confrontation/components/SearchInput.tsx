import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgImage } from '../../../../components/svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import { FilterModalComponent, FilterOptions } from '../../../../components/modals/FilterModal';

interface SearchInputProps {
  onSearch: (query: string) => void;
  value: string;
}

const SearchInput = ({ onSearch, value }: SearchInputProps) => {
  const { t } = useTranslation();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    dateRange: {
      start: null,
      end: null,
    },
    status: '',
  });

  const handleOpenFilter = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setFilterModalVisible(false);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setAppliedFilters(filters);
    setFilterModalVisible(false);
    // Add your filter logic here
  };

  return (
    <View style={styles.container}>
      <SvgImage
        source={require("../../../../assets/svg/textInput/search.svg")}
        height={18}
        width={18}
        stroke="#C6C5CA"
      />
      <TextInput
        style={styles.input}
        placeholder={t('Axtar')}
        placeholderTextColor="#B3B1B8"
        value={value}
        onChangeText={onSearch}
      />
      <TouchableOpacity onPress={handleOpenFilter}>
        <SvgImage
          source={require("../../../../assets/svg/textInput/filter.svg")}
          height={18}
          width={18}
          stroke={appliedFilters.status || appliedFilters.dateRange?.start || appliedFilters.dateRange?.end ? "#007AFF" : "#110C22"}
        />
      </TouchableOpacity>

      <FilterModalComponent
        visible={isFilterModalVisible}
        onClose={handleCloseFilter}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    marginHorizontal: 8,
  },
});

export default SearchInput;
