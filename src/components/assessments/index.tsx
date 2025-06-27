import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  points: number;
  status: 'available' | 'resume' | 'completed';
  progress?: number;
}

interface AssessmentsSectionProps {
  assessments?: Assessment[];
  onAssessmentPress?: (assessmentId: string) => void;
  onSeeAllPress?: () => void;
}

const AssessmentsSection: React.FC<AssessmentsSectionProps> = ({
  assessments = defaultAssessments,
  onAssessmentPress,
  onSeeAllPress,
}) => {
  const renderAssessmentCard = (assessment: Assessment) => (
    <View key={assessment.id} style={styles.assessmentWrapper}>
      {/* Main Card */}
      <View style={styles.assessmentCard}>
        <View style={styles.cardContent}>
          <View style={styles.assessmentInfo}>
            <Text style={styles.assessmentTitle}>{assessment.title}</Text>
            <Text style={styles.assessmentDescription}>{assessment.description}</Text>
            
            <View style={styles.tagContainer}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{assessment.category}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.assessmentActions}>
            {assessment.status === 'resume' ? (
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={styles.continueButton}
                  onPress={() => onAssessmentPress?.(assessment.id)}
                >
                  <Text style={styles.continueText}>Continue</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FF5443" />
                </TouchableOpacity>
                <View style={styles.resumeBadge}>
                  <Text style={styles.resumeText}>Resume</Text>
                </View>
              </View>
            ) : (
              <View style={styles.singleActionRow}>
                <TouchableOpacity 
                  style={styles.startNowButton}
                  onPress={() => onAssessmentPress?.(assessment.id)}
                >
                  <Text style={styles.startNowText}>Start now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.assessmentsList}>
        {assessments.map(renderAssessmentCard)}
      </View>
      
      <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAllPress}>
        <Text style={styles.seeAllText}>See all Assessment</Text>
        <Ionicons name="chevron-forward" size={20} color="#FF5443" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const defaultAssessments: Assessment[] = [
  {
    id: '1',
    title: 'How motivated you are at your work?',
    description: 'Assessing motivation at work is crucial for understanding how engaged and productive individuals feel in their roles.',
    category: 'Mindfulness',
    duration: '10 min',
    points: 20,
    status: 'resume',
  },
  {
    id: '2',
    title: 'How much sleep is good for me?',
    description: 'Sound sleep is a treasure, check now about your sleeping pattern!',
    category: 'Mindfulness',
    duration: '8 min',
    points: 20,
    status: 'available',
  },
  {
    id: '3',
    title: 'How healthy is my food?',
    description: 'People are increasingly making informed food choices, check your food habits now !',
    category: 'Heart health',
    duration: '12 min',
    points: 20,
    status: 'available',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  assessmentsList: {
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  assessmentWrapper: {
    position: 'relative',
  },
  pointsBadge: {
    position: 'absolute',
    top: 8,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingLeft: 4,
    paddingRight: 6,
    borderRadius: 12,
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  coinIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  coinText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#B8860B',
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B3B3B',
    fontFamily: 'Figtree',
    textAlign: 'center',
    lineHeight: 16,
  },
  categoryBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#CC749C',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Figtree',
    lineHeight: 16,
  },
  assessmentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE2EB',
    borderRadius: 8,
    position: 'relative',
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
    paddingTop: 32,
    paddingBottom: 16,
  },
  assessmentInfo: {
    paddingHorizontal: 16,
    gap: 4,
  },
  assessmentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181A1F',
    fontFamily: 'Figtree',
    lineHeight: 28,
    marginBottom: 4,
  },
  assessmentDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#868E9E',
    lineHeight: 20,
    fontFamily: 'Figtree',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: 'rgba(106, 71, 180, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6A47B4',
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  assessmentActions: {
    paddingHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    gap: 8,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5443',
    fontFamily: 'Figtree',
  },
  resumeBadge: {
    backgroundColor: '#3291DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    position: 'absolute',
    bottom: 195,
    left: 0,
  },
  resumeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Figtree',
    textAlign: 'center',
    lineHeight: 16,
  },
  startNowButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  startNowText: {
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

export default AssessmentsSection;
