import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';

interface StepTrackerModalProps {
  visible: boolean;
  onClose: () => void;
  onConnectPress: () => void;
  isManualConnection?: boolean;
}

export default function StepTrackerModal({
  visible,
  onClose,
  onConnectPress,
  isManualConnection = false,
}: StepTrackerModalProps) {
  const handleConnectPress = () => {
    onConnectPress();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" barStyle="light-content" translucent />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Choose Your Step Tracker</Text>
            <Text style={styles.description}>
              One step closer to your goals — connect your tracker to begin.
            </Text>
          </View>

          {isManualConnection && <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.goManualButton}
              onPress={handleConnectPress}
              activeOpacity={0.8}
            >
              <Text style={styles.goManualButtonText}>
                I will go manually
              </Text>
            </TouchableOpacity>
          </View>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleConnectPress}
              activeOpacity={0.8}
            >
              <Text style={styles.connectButtonText}>
                Connect your fitness tracker
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    width: 328,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#181A1F',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Figtree',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#414752',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Figtree',
  },
  buttonContainer: {
    width: '100%',
  },
  connectButton: {
    backgroundColor: '#FF5443',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  goManualButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#FF5443',
    alignItems: 'center',
    marginBottom: 16,
  },
  goManualButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5443',
    textAlign: 'center',
    fontFamily: 'Figtree',
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Figtree',
  },
});
