import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterOptions } from '../modals/FilterModal';

interface CompanyFilterSectionProps {
  filters: FilterOptions;
  onClear: () => void;
  onCompanyToggle: (company: string) => void;
}

export const CompanyFilterSection = ({
  filters,
  onClear,
  onCompanyToggle,
}: CompanyFilterSectionProps) => {
  const companies = [
    'Pepsi', 'Coca-Cola', 'Microsoft',
    'Xpyc Team', 'Apple', 'Samsung',
    'Google', 'Amazon', 'Tesla',
    'Nike', 'Intel', 'Oracle'
  ];

  return (
    <View style={styles.companySection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Choose company</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.companiesList}>
        {companies.map((company) => (
          <View key={company} style={styles.companyRow}>
            <TouchableOpacity
              style={styles.companyItem}
              onPress={() => onCompanyToggle(company)}
            >
              <View style={styles.checkbox}>
                {filters.companies?.includes(company) && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text style={styles.companyName}>{company}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  companySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#00000052',
    fontFamily: 'Onest-Medium',
  },
  clearButton: {
    fontSize: 14,
    color: '#015656',
    fontFamily: 'Onest-Medium',
  },
  companiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  companyRow: {
    width: '31%',
    marginBottom: 12,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#015656',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#015656',
    borderRadius: 2,
  },
  companyName: {
    fontSize: 14,
    color: '#110C22',
    fontFamily: 'Onest-Regular',
  },
});