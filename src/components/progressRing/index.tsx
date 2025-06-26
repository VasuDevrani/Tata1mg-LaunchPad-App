import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 100
  color: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  color,
  backgroundColor = '#DDE2EB',
  children,
  style
}: CircularProgressProps) {
  // Ensure progress is within valid range
  const clampedProgress = Math.max(0, Math.min(progress, 100));
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[{ width: size, height: size, position: 'relative' }, style]}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {/* Center content */}
      <View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children}
      </View>
    </View>
  );
}
