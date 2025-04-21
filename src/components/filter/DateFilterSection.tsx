import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgImage } from '../svgImage/SvgImage';
import { FilterOptions } from '../modals/FilterModal';
import { DatePickerModal } from '../modals/DatePickerModal';

interface DateFilterSectionProps {
  filters: FilterOptions;
  onClear: () => void;
  onDateChange?: (type: 'start' | 'end', date: Date) => void;
}

export const DateFilterSection = ({ filters, onClear, onDateChange }: DateFilterSectionProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateType, setDateType] = useState<'start' | 'end'>('start');

  const handleOpenDatePicker = (type: 'start' | 'end') => {
    setDateType(type);
    setDatePickerVisible(true);
  };

  const handleConfirmDate = (selectedDate: { month: number; day: number; year: number }) => {
    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    onDateChange?.(dateType, date);
    setDatePickerVisible(false);
  };

  return (
    <View style={styles.dateSection}>
      <View style={styles.dateSectionHeader}>
        <Text style={styles.sectionTitle}>Choose date</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateButtons}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => handleOpenDatePicker('start')}
        >
          <View style={styles.dateButtonHeader}>
            <Text style={styles.dateValue}>
              {filters.dateRange?.start ? filters.dateRange.start.toLocaleDateString() : 'Start date'}
            </Text>
            <SvgImage
              source={require('../../assets/svg/filter/calendar.svg')}
              height={24}
              width={24}
              stroke={'#8D8A95'}
              strokeWidth={1.5}
              fill="none"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => handleOpenDatePicker('end')}
        >
          <View style={styles.dateButtonHeader}>
            <Text style={styles.dateValue}>
              {filters.dateRange?.end ? filters.dateRange.end.toLocaleDateString() : 'End date'}
            </Text>
            <SvgImage
              source={require('../../assets/svg/filter/calendar.svg')}
              height={24}
              width={24}
              stroke={'#8D8A95'}
              strokeWidth={1.5}
            />
          </View>
        </TouchableOpacity>
      </View>

      <DatePickerModal
        visible={datePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onConfirm={handleConfirmDate}
        initialDate={dateType === 'start' ?
          (filters.dateRange?.start || undefined) :
          (filters.dateRange?.end || undefined)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateSection: {
    marginBottom: 24,
  },
  dateSectionHeader: {
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
  dateButtons: {
    gap: 12,
  },
  dateButton: {
    height: 56,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
  },
  dateButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateValue: {
    fontSize: 14,
    color: '#110C22',
    fontFamily: 'Onest-Regular',
  },
});