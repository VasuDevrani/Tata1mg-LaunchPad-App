import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface GenderPickerProps {
  selectedGender: string;
  onGenderSelect: (gender: string) => void;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ selectedGender, onGenderSelect }) => {
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) => onGenderSelect(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          {genders.map((gender) => (
            <Picker.Item key={gender.value} label={gender.label} value={gender.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  picker: {
    height: 55,
    width: 300,
    color: '#333',
    backgroundColor: '#F0F2F5',
  },
});

export default GenderPicker;
