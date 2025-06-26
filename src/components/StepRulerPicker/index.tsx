import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface RulerPickerProps {
    initialValue?: number;
    onChange: (value: number) => void;
    unitLabel?: string;
    min?: number;
    max?: number;
    base?: number;
    snapInterval?: number;
    startPaddingWidth?: number;
}

export default function RulerPicker({
    initialValue = 10000,
    onChange,
    unitLabel = 'Steps',
    min = 1000,
    max = 30000,
    base = 500,
    startPaddingWidth = 19.2,
    snapInterval = 12,
}: RulerPickerProps
) {
    const scrollRef = useRef<ScrollView>(null);
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const values = Array.from({ length: ((max - min) / base) + 1 }, (_, i) => min + i * base);

    // Auto scroll to initial value
    useEffect(() => {
        const index = (initialValue - min) / base;
        setTimeout(() => {
            scrollRef.current?.scrollTo({ x: index * snapInterval, animated: false });
        }, 100);
    }, []);

    const handleScroll = (e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        let index = Math.round(offsetX / snapInterval);

        // Clamp index to valid range
        index = Math.max(0, Math.min(index, values.length - 1));
        const value = values[index];

        if (value !== selectedValue) {
            setSelectedValue(value);
            onChange(value);
        }
    };

    const handleScrollEnd = (e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        let index = Math.round(offsetX / snapInterval);

        // Clamp index to valid range
        index = Math.max(0, Math.min(index, values.length - 1));
        const value = values[index];

        scrollRef.current?.scrollTo({ x: index * snapInterval, animated: true });
        setSelectedValue(value);
        onChange(value);
    };


    return (
        <View style={styles.container}>
            {/* Value display */}
            <Text style={styles.valueText}>
                {selectedValue ? selectedValue.toLocaleString() : '--'}
            </Text>
            <Text style={styles.unitText}>{unitLabel}</Text>

            {/* Ruler scroll */}
            <View style={styles.rulerContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={snapInterval}
                    decelerationRate="fast"
                    onMomentumScrollEnd={handleScrollEnd}
                    onScroll={handleScroll}
                    contentContainerStyle={{
                        paddingHorizontal: width / 2 - startPaddingWidth,
                        marginTop: 30,
                        transform: [{ rotate: '180deg' }],
                    }}
                >
                    {values.map((val, i) => (
                        <View key={val} style={[styles.tickContainer, { width: snapInterval }]}>
                            <View style={[
                                styles.tick,
                                (i % 10 === 0) ? styles.longTick :
                                    (i % 5 === 0) ? styles.mediumTick : styles.tick
                            ]} />
                        </View>
                    ))}
                </ScrollView>

                {/* Center indicator */}
                <View style={styles.indicator} >
                    <View style={styles.diamond} />
                    <View style={styles.pointer} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 40,
    },
    valueText: {
        fontSize: 54,
        fontWeight: '500',
        color: '#181A1F',
    },
    unitText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#181A1F',
        marginBottom: 30,
    },
    rulerContainer: {
        position: 'relative',
        marginTop: 70,
        height: 120,
    },
    tickContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tick: {
        height: 15,
        width: 4,
        backgroundColor: '#D9D9D9',
    },
    longTick: {
        height: 80,
    },
    mediumTick: {
        height: 30,
    },
    indicator: {
        position: 'absolute',
        bottom: -10,
        left: '47%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    diamond: {
        width: 25,
        height: 25,
        backgroundColor: '#FF5555',
        transform: 'rotate(45deg)',
    },
    pointer: {
        width: 8,
        height: 180,
        backgroundColor: '#FF5555',
    },
});
