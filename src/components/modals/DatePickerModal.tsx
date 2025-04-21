import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import { PickerColumn } from '../picker/PickerColumn';

const { height } = Dimensions.get('window');

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: { month: number; day: number; year: number }) => void;
  initialDate?: Date;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate() - 1);
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(
    { length: 50 }, 
    (_, i) => new Date().getFullYear() - 25 + i
  );

  const calculateDaysInMonth = (month: number, year: number) => {
    const thirtyDaysMonths = [3, 5, 8, 10]; // April, June, September, November
    const thirtyOneDaysMonths = [0, 2, 4, 6, 7, 9, 11]; // January, March, May, July, August, October, December
    
    if (thirtyDaysMonths.includes(month)) {
      return Array.from({ length: 30 }, (_, i) => i + 1);
    } else if (thirtyOneDaysMonths.includes(month)) {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    } else {
      // February
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      const daysInFebruary = isLeapYear ? 29 : 28;
      return Array.from({ length: daysInFebruary }, (_, i) => i + 1);
    }
  };

  useEffect(() => {
    const days = calculateDaysInMonth(selectedMonth, selectedYear);
    setDaysInMonth(days);
    if (selectedDay >= days.length) {
      setSelectedDay(days.length - 1);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
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

  const handleConfirm = () => {
    onConfirm({
      month: selectedMonth + 1,
      day: selectedDay + 1,
      year: selectedYear,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
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
          <View style={styles.header}>
            <Text style={styles.title}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <PickerColumn
              data={months}
              selected={selectedMonth}
              onSelect={setSelectedMonth}
            />
            <PickerColumn
              data={daysInMonth}
              selected={selectedDay}
              onSelect={setSelectedDay}
            />
            <PickerColumn
              data={years}
              selected={years.indexOf(selectedYear)}
              onSelect={(index) => setSelectedYear(years[index])}
            />
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
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
    padding: 20,
    minHeight: height * 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#015656',
    fontFamily: 'Onest-Medium',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 250,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#015656',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Onest-Medium',
  },
});