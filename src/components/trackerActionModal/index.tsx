import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveTrackingEntry } from '@/src/services/userService';

interface TrackerActionModalProps {
  visible: boolean;
  onClose: () => void;
  category: string;
  title: string;
  unit: string;
  userId: string;
  onSuccess: () => void;
}

export default function TrackerActionModal({
  visible,
  onClose,
  category,
  title,
  unit,
  userId,
  onSuccess,
}: TrackerActionModalProps) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!value.trim()) {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      Alert.alert('Error', 'Please enter a valid positive number');
      return;
    }

    setLoading(true);
    try {
      await saveTrackingEntry(userId, category, numValue, unit);
      Alert.alert('Success', `${title} entry saved successfully!`);
      setValue('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving tracking entry:', error);
      Alert.alert('Error', 'Failed to save entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (category) {
      case 'steps':
        return 'Enter steps count';
      case 'water':
        return 'Enter glasses of water';
      case 'sleep':
        return 'Enter hours of sleep';
      case 'meditationHrs':
        return 'Enter minutes of meditation';
      default:
        return `Enter ${unit}`;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Add {title} Entry</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#181A1F" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>
              How many {unit} would you like to log?
            </Text>
            <TextInput
              style={styles.input}
              placeholder={getPlaceholder()}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              autoFocus
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181A1F',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4E5665',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDE2EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#181A1F',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F2F5',
  },
  saveButton: {
    backgroundColor: '#FF5443',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4E5665',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});