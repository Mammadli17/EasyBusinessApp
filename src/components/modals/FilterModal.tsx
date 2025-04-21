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
import { SvgImage } from '../svgImage/SvgImage';
import { useTranslation } from 'react-i18next';

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
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={{ width: 32 }} />
              </View>
              <Text style={styles.headerText}>Filter</Text>
              <TouchableOpacity onPress={onClose} style={styles.headerRight}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Date Filter Section */}
            <View style={styles.dateSection}>
              <View style={styles.dateSectionHeader}>
                <Text style={styles.sectionTitle}>Choose date</Text>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateButtons}>
                <TouchableOpacity style={styles.dateButton}>
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

                <TouchableOpacity style={styles.dateButton}>
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
            </View>

            {/* Company Filter Section */}
            <View style={styles.companySection}>
              <View style={styles.dateSectionHeader}>
                <Text style={styles.sectionTitle}>Choose company</Text>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.companiesList}>
                {[
                  'Pepsi', 'Coca-Cola', 'Microsoft',
                  'Xpyc Team', 'Apple', 'Samsung',
                  'Google', 'Amazon', 'Tesla',
                  'Nike', 'Intel', 'Oracle'
                ].map((company) => (
                  <View key={company} style={styles.companyRow}>
                    <TouchableOpacity
                      style={styles.companyItem}
                      onPress={() => handleCompanyToggle(company)}
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

            {/* Save Button */}
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
    color: '#110C22',
    fontFamily: 'Onest-Medium',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
    fontSize: 16,
  },
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
  dateButtonText: {
    fontSize: 12,
    color: '#9998A0',
    marginBottom: 4,
    fontFamily: 'Onest-Regular',
  },
  dateValue: {
    fontSize: 14,
    color: '#110C22',
    fontFamily: 'Onest-Regular',
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
  companySection: {
    marginBottom: 24,
  },
  companiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  companyRow: {
    width: '30%',
    marginBottom: 16,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#015656',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
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

export default FilterModalComponent;