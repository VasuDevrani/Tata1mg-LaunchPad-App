import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TrackerIconProps {
  type: string;
  size?: number;
  color?: string;
}

export default function TrackerIcon({ type, size = 16, color = '#1C1B1F' }: TrackerIconProps) {
  const getIconName = () => {
    switch (type) {
      case 'steps':
        return 'footsteps-outline';
      case 'water':
        return 'water-outline';
      case 'sleep':
        return 'moon-outline';
      case 'weight':
        return 'fitness-outline';
      case 'meditation':
        return 'leaf-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <Ionicons 
      name={getIconName() as any} 
      size={size} 
      color={color} 
    />
  );
}