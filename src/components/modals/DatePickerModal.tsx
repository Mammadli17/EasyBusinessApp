import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Animated,
} from 'react-native';
import { PickerColumn } from '../filter/PickerColumn';

const { height } = Dimensions.get('window');

const toPickerMonth = (monthNumber: number) => monthNumber - 1;
const fromPickerMonth = (monthIndex: number) => monthIndex + 1;
const toPickerDay = (dayNumber: number) => dayNumber - 1;
const fromPickerDay = (dayIndex: number) => dayIndex + 1;

interface DatePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (dates: {
        startDate: { month: number; day: number; year: number };
        endDate: { month: number; day: number; year: number };
    }) => void;
    initialDate?: Date;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    onClose,
    onConfirm,
    initialDate = new Date(),
}) => {
    const [isStartDate, setIsStartDate] = useState(true);
    const [startDate, setStartDate] = useState<{ month: number; day: number; year: number } | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(toPickerMonth(initialDate.getMonth() + 1));
    const [selectedDay, setSelectedDay] = useState(toPickerDay(initialDate.getDate()));
    const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
    const [isInitialRender, setIsInitialRender] = useState(true);
    
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Handle modal visibility changes
    useEffect(() => {
        if (visible) {
            // Reset selections when modal opens
            if (!isInitialRender) {
                setSelectedMonth(toPickerMonth(initialDate.getMonth() + 1));
                setSelectedDay(toPickerDay(initialDate.getDate()));
                setSelectedYear(initialDate.getFullYear());
            }
            setIsInitialRender(false);

            // Start animations
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
            ]).start(() => {
                if (!visible) {
                    setIsStartDate(true);
                    setStartDate(null);
                }
            });
        }
    }, [visible, initialDate]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

    const getDaysInMonth = (month: number, year: number) => {
        return Array.from(
            { length: new Date(year, month + 1, 0).getDate() },
            (_, i) => i + 1
        );
    };

    const daysInMonth = getDaysInMonth(fromPickerMonth(selectedMonth) - 1, selectedYear);

    const handleConfirm = () => {
        const currentDate = {
            month: fromPickerMonth(selectedMonth),
            day: fromPickerDay(selectedDay),
            year: selectedYear,
        };

        if (isStartDate) {
            setStartDate(currentDate);
            setIsStartDate(false);
        } else {
            onConfirm({
                startDate: startDate!,
                endDate: currentDate,
            });
            onClose();
        }
    };

    if (!visible) return null;

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
                        styles.modal,
                        {
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{isStartDate ? 'Start Date' : 'End Date'}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerWrapper}>
                            <PickerColumn
                                data={months}
                                selected={selectedMonth}
                                onSelect={setSelectedMonth}
                                itemHeight={50}
                            />
                        </View>

                        <View style={styles.pickerWrapper}>
                            <PickerColumn
                                data={daysInMonth}
                                selected={selectedDay}
                                onSelect={setSelectedDay}
                                itemHeight={50}
                            />
                        </View>

                        <View style={styles.pickerWrapper}>
                            <PickerColumn
                                data={years}
                                selected={years.indexOf(selectedYear)}
                                onSelect={(index) => setSelectedYear(years[index])}
                                itemHeight={50}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
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
    modal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 18,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#110C22',
        fontFamily: 'Onest-Medium',
        textAlign: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        right: 0,
        padding: 8,
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 200,
    },
    pickerWrapper: {
        flex: 1,
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