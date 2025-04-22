import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    const scrollViewRef = useRef<ScrollView>(null);
    const [scrollOffset, setScrollOffset] = React.useState(0);
    const [actualItemHeight, setActualItemHeight] = React.useState(itemHeight);
    const lastMeasuredHeightRef = useRef(itemHeight);
    const hasInitialScrollRef = useRef(false);

    // Memoize height calculations
    const containerHeight = useMemo(() => actualItemHeight * visibleItems, [actualItemHeight, visibleItems]);
    const centerPosition = useMemo(() => {
        const centerOffset = (visibleItems - 1) / 2;
        return centerOffset * actualItemHeight;
    }, [visibleItems, actualItemHeight]);
    const padding = useMemo(() =>
        Math.ceil((visibleItems - 1) / 2) * actualItemHeight,
        [visibleItems, actualItemHeight]);

    // Calculate middle index based on scroll position
    const getMiddleIndex = useCallback((offset: number): number => {
        const centerPos = offset + centerPosition;
        return Math.min(
            data.length - 1,
            Math.max(0, Math.round(centerPos / actualItemHeight))
        );
    }, [centerPosition, actualItemHeight]);

    // Handle scroll events
    const handleScroll = useCallback((event: any) => {
        const offset = event.nativeEvent.contentOffset.y;
        setScrollOffset(offset);
    }, []);

    // Handle scroll end with proper snapping
    const handleScrollEnd = useCallback(() => {
        if (!scrollViewRef.current) return;

        const middleIndex = getMiddleIndex(scrollOffset);
        if (middleIndex >= 0 && middleIndex < data.length && middleIndex !== selected) {
            onSelect(middleIndex);
        }
    }, [scrollOffset, data.length, selected, onSelect, getMiddleIndex, centerPosition, actualItemHeight]);

    // Handle item measurement
    const handleItemLayout = useCallback((event: LayoutChangeEvent) => {
        const measuredHeight = event.nativeEvent.layout.height;
        if (measuredHeight !== lastMeasuredHeightRef.current && measuredHeight > 0) {
            lastMeasuredHeightRef.current = measuredHeight;
            setActualItemHeight(measuredHeight);
        }
    }, []);

    // Initial scroll setup with animation delay
    useEffect(() => {
        if (!hasInitialScrollRef.current && scrollViewRef.current) {
            const targetOffset = Math.max(0, (selected * actualItemHeight) - centerPosition);

            const timer = setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: targetOffset,
                    animated: true,
                });
                hasInitialScrollRef.current = true;
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [selected, actualItemHeight, centerPosition]);

    return (
        <View
            style={[styles.container, { height: containerHeight }]}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="menubar"
        >
            {/* Fixed center selection indicator */}
            <View
                style={[
                    styles.selectionIndicator,
                    {
                        top: centerPosition,
                        height: actualItemHeight
                    }
                ]}
                pointerEvents="none"
            />

            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={actualItemHeight}
                decelerationRate="fast"
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                bounces={false}
            >
                <View style={{ height: padding }} />

                {data.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.item,
                            { height: actualItemHeight }
                        ]}
                        onLayout={index === 0 ? handleItemLayout : undefined}
                    >
                        <Text style={styles.itemText}>
                            {item}
                        </Text>
                    </View>
                ))}

                <View style={{ height: padding }} />
            </ScrollView>

            <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0)']}
                style={styles.topFade}
                pointerEvents="none"
            />
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']}
                style={styles.bottomFade}
                pointerEvents="none"
            />

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
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
        fontFamily: 'Onest-Regular',
    },
    selectionIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(1, 86, 86, 0.05)',
        pointerEvents: 'none',
        zIndex: 1,
    },
    topFade: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 2,
    },
    bottomFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 2,
    },
});