import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  status: 'ongoing' | 'available';
  tags: string[];
}

interface ChallengesSectionProps {
  challenges?: Challenge[];
  onChallengePress?: (challengeId: string) => void;
  onSeeAllPress?: () => void;
}

const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  challenges = defaultChallenges,
  onChallengePress,
  onSeeAllPress,
}) => {
  const renderChallengeCard = (challenge: Challenge) => (
    <View key={challenge.id} style={styles.challengeCard}>
      <View style={styles.cardContent}>
        <View style={styles.challengeInfo}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
          </View>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.tagsContainer}>
            {challenge.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, getTagStyle(tag)]}>
                <Text style={[styles.tagText, getTagTextStyle(tag)]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.challengeActions}>
          {challenge.status === 'ongoing' ? (
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={styles.checkInButton}
                onPress={() => onChallengePress?.(challenge.id)}
              >
                <Text style={styles.checkInText}>Check-in</Text>
                <Ionicons name="chevron-forward" size={16} color="#FF5443" />
              </TouchableOpacity>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Ongoing</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.knowMoreButton}
              onPress={() => onChallengePress?.(challenge.id)}
            >
              <Text style={styles.knowMoreText}>Know more</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.challengesList}>
        {challenges.map(renderChallengeCard)}
      </View>
      
      <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAllPress}>
        <Text style={styles.seeAllText}>See all Challenges</Text>
        <Ionicons name="chevron-forward" size={20} color="#FF5443" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const defaultChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Green tea a day',
    description: 'Drinking green tea burns calories',
    category: 'Eating habit',
    duration: '7 days',
    status: 'ongoing',
    tags: ['Eating habit', '7 days'],
  },
  {
    id: '2',
    title: '500 stairs everyday',
    description: 'Step up your game and burn those calories by taking the stairs!',
    category: 'Heart health',
    duration: '14 days',
    status: 'available',
    tags: ['Heart health', '14 days'],
  },
  {
    id: '3',
    title: 'No junk & sugar',
    description: 'Avoid junk food and sugar containing food which will prevent you from bloating',
    category: 'Eating habit',
    duration: '30 days',
    status: 'available',
    tags: ['Eating habit', '30 days'],
  },
];

const getTagStyle = (tag: string) => {
  if (tag.includes('habit') || tag.includes('health')) {
    return styles.categoryTag;
  }
  return styles.durationTag;
};

const getTagTextStyle = (tag: string) => {
  if (tag.includes('habit') || tag.includes('health')) {
    return styles.categoryTagText;
  }
  return styles.durationTagText;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  challengesList: {
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE2EB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    paddingVertical: 16,
  },
  challengeInfo: {
    paddingHorizontal: 16,
    gap: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181A1F',
    fontFamily: 'Figtree',
  },
  challengeDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#868E9E',
    lineHeight: 20,
    fontFamily: 'Figtree',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryTag: {
    backgroundColor: 'rgba(106, 71, 180, 0.1)',
  },
  durationTag: {
    backgroundColor: 'rgba(0, 157, 165, 0.1)',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 18,
  },
  categoryTagText: {
    color: '#6A47B4',
  },
  durationTagText: {
    color: '#009DA5',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  challengeActions: {
    paddingHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
  },
  checkInText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5443',
    fontFamily: 'Figtree',
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#FF5443',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    position: 'absolute',
    bottom: 130,
    left: 0,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Figtree',
    textAlign: 'center',
    lineHeight: 16,
  },
  knowMoreButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  knowMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5443',
    fontFamily: 'Figtree',
  },
  seeAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5443',
    fontFamily: 'Figtree',
    textAlign: 'center',
  },
});

export default ChallengesSection;
