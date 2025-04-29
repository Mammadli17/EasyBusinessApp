import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { FilterModalHeader } from './FilterModalHeader';
import { DateFilterSection } from '../filter/DateFilterSection';
import { CompanyFilterSection } from '../filter/CompanyFilterSection';

const { height } = Dimensions.get('window');

export interface FilterOptions {
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  selectedCompanies?: string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters = {},
}) => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 1.2,
          stiffness: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  const handleClearDates = () => {
    setFilters(prev => ({ ...prev, dateRange: undefined }));
  };

  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: date,
      },
    }));
  };

  const handleClearCompanies = () => {
    setFilters(prev => ({ ...prev, selectedCompanies: undefined }));
  };

  const handleCompanyToggle = (company: string) => {
    setFilters(prev => {
      const selectedCompanies = prev.selectedCompanies || [];
      const isSelected = selectedCompanies.includes(company);
      
      return {
        ...prev,
        selectedCompanies: isSelected
          ? selectedCompanies.filter(c => c !== company)
          : [...selectedCompanies, company],
      };
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.dismissArea} 
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.modalContainer}>
            <FilterModalHeader onClose={onClose} />
            
            <DateFilterSection
              filters={filters}
              onClear={handleClearDates}
              onDateChange={handleDateChange}
            />
            
            <CompanyFilterSection
              filters={filters}
              onClear={handleClearCompanies}
              onCompanyToggle={handleCompanyToggle}
            />
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                {t('Apply Filters')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalContainer: {
    padding: 20,
    paddingBottom: 34,
  },
  applyButton: {
    backgroundColor: '#015656',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
  },
});