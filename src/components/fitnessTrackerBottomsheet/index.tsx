import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import GlobalModal from '../globalModal';

interface FitnessTracker {
  id: string;
  name: string;
  image: any;
  connected: boolean;
}

interface FitnessTrackerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onTrackerConnect: (trackerId: string) => void;
}

export default function FitnessTrackerBottomSheet({
  visible,
  onClose,
  onTrackerConnect
}: FitnessTrackerBottomSheetProps) {
  const [trackers, setTrackers] = useState<FitnessTracker[]>([
    { id: 'google-fit', name: 'Google Fit', image: require('@/src/assets/images/google-connect.png'), connected: false },
    { id: 'apple-health', name: 'Apple Health', image: require('@/src/assets/images/apple-connect.png'), connected: false },
    { id: 'strava', name: 'Strava', image: require('@/src/assets/images/strava-connect.png'), connected: false },
    { id: 'fitbit', name: 'Fitbit', image: require('@/src/assets/images/fitbit-connect.png'), connected: false },
  ]);

  const handleTrackerPress = (trackerId: string) => {
    setTrackers(prev =>
      prev.map(tracker => ({
        ...tracker,
        connected: tracker.id === trackerId ? !tracker.connected : false
      }))
    );
    onTrackerConnect(trackerId);
  };

  return (
    <GlobalModal
      visible={visible}
      onClose={onClose}
      backgroundOpacity={0.5}
      showCloseButton={true}
    >
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Connect your fitness tracker</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.description}>
              Select a application you want to connect to track your steps/calories
            </Text>

            <ScrollView
              style={styles.trackersList}
              showsVerticalScrollIndicator={false}
            >
              {trackers.map((tracker) => (
                <TouchableOpacity
                  key={tracker.id}
                  style={[
                    styles.trackerItem,
                    tracker.connected && styles.trackerItemConnected
                  ]}
                  onPress={() => handleTrackerPress(tracker.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.trackerIcon}>
                    <Image
                      source={tracker.image}
                      style={styles.trackerImage}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.trackerContent}>
                    <Text style={styles.trackerName}>{tracker.name}</Text>
                  </View>

                  {tracker.connected && (
                    <View style={styles.connectedButton}>
                      <Text style={styles.connectedButtonText}>Connected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </GlobalModal>
  );
}

const getTrackerColor = (trackerId: string): string => {
  switch (trackerId) {
    case 'google-fit': return '#4285F4';
    case 'apple-health': return '#FF6B6B';
    case 'strava': return '#FC4C02';
    case 'fitbit': return '#00B0B9';
    default: return '#DDE2EB';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  closeIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine1: {
    position: 'absolute',
    width: 13.18,
    height: 1,
    backgroundColor: '#212121',
    transform: [{ rotate: '45deg' }],
  },
  closeLine2: {
    position: 'absolute',
    width: 13.18,
    height: 1,
    backgroundColor: '#212121',
    transform: [{ rotate: '-45deg' }],
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE2EB',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#181A1F',
    fontFamily: 'Figtree',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 64,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#414752',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Figtree',
  },
  trackersList: {
    flex: 1,
  },
  trackerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backdropFilter: 'blur(4px)',
  },
  trackerItemConnected: {
    backgroundColor: 'rgba(240, 242, 245, 0.5)',
  },
  trackerIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  trackerImage: {
    width: 32,
    height: 32,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE2EB',
  },
  trackerContent: {
    flex: 1,
  },
  trackerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181A1F',
    fontFamily: 'Figtree',
  },
  connectedButton: {
    backgroundColor: '#181A1F',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  connectedButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Figtree',
  },
});
