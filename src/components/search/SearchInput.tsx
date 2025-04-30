import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgImage } from '../svgImage/SvgImage';
import { useTranslation } from 'react-i18next';
import { FilterModal, FilterOptions } from '../modals/FilterModal';

interface SearchInputProps {
  onSearch: (query: string) => void;
  value: string;
  onFilter?: (filters: FilterOptions) => void;
}

const SearchInput = ({ onSearch, value, onFilter }: SearchInputProps) => {
  const { t } = useTranslation();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({});
  const [isFocused, setIsFocused] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setAppliedFilters(filters);
    onFilter?.(filters);
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <SvgImage
        source={require("../../assets/svg/textInput/search.svg")}
        height={18}
        width={18}
        stroke="#C6C5CA"
      />
      <TextInput
        style={styles.input}
        placeholder={t('Axtar...')}
        placeholderTextColor="#B3B1B8"
        value={value}
        onChangeText={onSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity onPress={handleOpenFilter}>
        <SvgImage
          source={require("../../assets/svg/textInput/filter.svg")}
          height={18}
          width={18}
          stroke={'#110C22BD'}
        />
      </TouchableOpacity>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilters}
        initialFilters={appliedFilters}
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
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
  },
  containerFocused: {
    borderWidth: 2,
    borderColor: "#015656",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    marginHorizontal: 8,
  },
});

export default SearchInput;
