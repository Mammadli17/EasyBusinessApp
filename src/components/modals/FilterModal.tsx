import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  Switch,
  TextInput
} from 'react-native';

export interface FilterOptions {
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  status?: string;
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.dismissArea}
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          {/* Add your filter options here */}
          <View>
            <Text>Date Range:</Text>
            <TextInput
              placeholder="Start Date"
              value={filters.dateRange?.start?.toString() || ''}
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { 
                    start: new Date(text),
                    end: prev.dateRange?.end ?? null
                  },
                }))
              }
            />
            <TextInput
              placeholder="End Date"
              value={filters.dateRange?.end?.toString() || ''}
              onChangeText={(text) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    start: prev.dateRange?.start ?? null,
                    end: new Date(text)
                  },
                }))
              }
            />
            <Text>Status:</Text>
            <TextInput
              placeholder="Status"
              value={filters.status}
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, status: text }))
              }
            />
          </View>
          <TouchableOpacity onPress={handleApply}>
            <Text>Apply Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const ConfrontationScreen = () => {
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
    // Add your filter logic here using the appliedFilters
  };

  return (
    <View style={styles.container}>
      {/* Your existing screen content */}
      
      {/* Filter Button */}
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={handleOpenFilter}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
        {/* Show active filters indicator if filters are applied */}
        {(appliedFilters.status || appliedFilters.dateRange?.start || appliedFilters.dateRange?.end) && (
          <View style={styles.filterBadge} />
        )}
      </TouchableOpacity>

      {/* Filter Modal */}
      <FilterModalComponent
        visible={isFilterModalVisible}
        onClose={handleCloseFilter}
        onApplyFilters={handleApplyFilters}
      />
    </View>
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
    padding: 20,
    minHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    padding: 5,
  },
  container: {
    flex: 1,
    // ...your existing styles
  },
  filterButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  filterBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
});

export default ConfrontationScreen;