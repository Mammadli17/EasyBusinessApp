import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import FilterModalHeader from './FilterModalHeader';
import { DateFilterSection } from '../filter/DateFilterSection';
import { CompanyFilterSection } from '../filter/CompanyFilterSection';

export interface FilterOptions {
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  status?: string;
  companies?: string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

const { height } = Dimensions.get('window');

export const FilterModalComponent = ({ visible, onClose, onApplyFilters }: FilterModalProps) => {
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      start: null,
      end: null,
    },
    status: '',
    companies: [],
  });

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      dateRange: {
        start: null,
        end: null,
      },
      status: '',
      companies: [],
    });
  };

  const handleCompanyToggle = (company: string) => {
    setFilters(prev => ({
      ...prev,
      companies: prev.companies?.includes(company)
        ? prev.companies.filter(c => c !== company)
        : [...(prev.companies || []), company],
    }));
  };

  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        start: type === 'start' ? date : prev.dateRange?.start ?? null,
        end: type === 'end' ? date : prev.dateRange?.end ?? null,
      }
    }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.dismissArea} onPress={onClose} activeOpacity={1} />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.contentContainer}>
            <FilterModalHeader onClose={onClose} />
            
            <DateFilterSection
              filters={filters}
              onClear={handleClear}
              onDateChange={handleDateChange}
            />

            <CompanyFilterSection
              filters={filters}
              onClear={handleClear}
              onCompanyToggle={handleCompanyToggle}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleApply}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: height * 0.8,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  saveButton: {
    height: 48,
    backgroundColor: '#015656',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Onest-Medium',
    fontWeight: '600',
  },
});

export default FilterModalComponent;