import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface PickerColumnProps {
    data: (string | number)[];
    selected: number;
    onSelect: (index: number) => void;
    itemHeight?: number;
    visibleItems?: number;
    accessibilityLabel?: string;
}

export const PickerColumn: React.FC<PickerColumnProps> = ({
    data,
    selected,
    onSelect,
    itemHeight = 50,
    visibleItems = 3,
    accessibilityLabel,
}) => {
    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                y: selected * itemHeight,
                animated: true,
            });
        }
    }, [selected, itemHeight]);

    return (
        <View 
            style={[
                styles.container,
                { height: itemHeight * visibleItems }
            ]}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="menubar"
        >
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                decelerationRate="fast"
            >
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelect(index)}
                        style={[
                            styles.item,
                            { height: itemHeight },
                            selected === index && styles.selectedItem
                        ]}
                        accessible={true}
                        accessibilityRole="menuitem"
                        accessibilityState={{ selected: selected === index }}
                    >
                        <Text style={[
                            styles.itemText,
                            selected === index && styles.selectedItemText
                        ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.highlightOverlay} pointerEvents="none">
                <View style={[styles.highlight, { height: itemHeight }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Onest-Regular',
    },
    selectedItem: {
        backgroundColor: 'rgba(1, 86, 86, 0.05)',
    },
    selectedItemText: {
        color: '#015656',
        fontWeight: '600',
        fontFamily: 'Onest-Medium',
    },
    highlightOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    highlight: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
});