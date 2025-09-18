import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Mapping pentru icon-uri
const ICONS: Record<string, string> = {
  Home: 'home',
  App: 'apps',
  Settings: 'settings',
};

interface TabBarIconProps {
  routeName: string;
  color: string;
  size: number;
}

export default function TabBarIcon({ routeName, color, size }: TabBarIconProps) {
  const iconName = ICONS[routeName] || 'help-circle';
  return <Ionicons name={iconName as any} size={size} color={color} />;
}
