import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/src/context/auth';
import { getUserGoals, Goal, getTodayTrackingEntries, TrackingEntry, getLatestWeight } from '@/src/services/userService';
import { Ionicons } from '@expo/vector-icons';
import TrackerActionModal from '@/src/components/trackerActionModal';
import TrackerIcon from '@/src/components/trackerIcon';
import { useRouter } from 'expo-router';

interface TrackerCardProps {
    title: string;
    current: number;
    target: number;
    unit: string;
    icon: string;
    color: string;
    onAction: () => void;
    actionType: 'add' | 'refresh';
}

const TrackerCard: React.FC<TrackerCardProps> = ({
    title,
    current,
    target,
    unit,
    icon,
    color,
    onAction,
    actionType,
}) => {
    const getProgressText = () => {
        if (title === 'Weight Tracker') {
            if (current > 0 && target > 0) {
                const diff = Math.abs(target - current);
                return `You've come ${diff} kg closer to your goal`;
            }
            return 'Track your weight progress';
        }

        if (current === 0) return `0 ${unit} of ${target} ${unit}`;
        return `${current} ${unit} of ${target} ${unit}`;
    };

    return (
        <View style={styles.trackerCard}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <View style={[styles.iconBackground, { backgroundColor: '#F0F2F5' }]}>
                        <View style={[styles.iconCircle, { backgroundColor: color }]} />
                        <TrackerIcon
                            type={icon}
                            size={16}
                            color="#1C1B1F"
                        />
                    </View>
                </View>

                <View style={styles.textContent}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.progressText}>{getProgressText()}</Text>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={onAction}>
                    <Ionicons
                        name={actionType === 'add' ? 'add' : 'refresh'}
                        size={14}
                        color="#414752"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('Trackers');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTracker, setSelectedTracker] = useState<any>(null);
    const [currentWeight, setCurrentWeight] = useState<number>(0);

    const fetchGoals = async () => {
        if (!user) return;

        try {
            const userGoals = await getUserGoals(user.id);
            const todayEntries = await getTodayTrackingEntries(user.id);
            const latestWeight = await getLatestWeight(user.id);
            setGoals(userGoals);
            setTrackingEntries(todayEntries);
            setCurrentWeight(latestWeight);
        } catch (error) {
            console.error('Error fetching goals:', error);
            Alert.alert('Error', 'Failed to load your tracking data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [user]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchGoals();
    };

    const getGoalByCategory = (category: string) => {
        return goals.find(goal => goal.category === category);
    };

    const getCurrentProgress = (category: string) => {
        if (category === 'steps') {
            // For steps, sum all entries for today
            return trackingEntries
                .filter(entry => entry.category === 'steps')
                .reduce((sum, entry) => sum + entry.value, 0);
        } else if (category === 'water') {
            // For water, count glasses
            return trackingEntries.filter(entry => entry.category === 'water').length;
        } else {
            // For other categories, get the latest entry value
            const entry = trackingEntries.find(entry => entry.category === category);
            return entry ? entry.value : 0;
        }
    };

    const handleTrackerAction = (category: string, actionType: 'add' | 'refresh') => {
        if (actionType === 'refresh') {
            // Refresh data
            fetchGoals();
        } else if (actionType === 'add') {
            // Open modal for adding entry
            const trackerData = getTrackerData().find(t =>
                t.title.toLowerCase().replace(' tracker', '').replace(' ', '') === category
            );
            setSelectedTracker(trackerData);
            setModalVisible(true);
        }
    };

    const handleModalSuccess = () => {
        fetchGoals();
    };

    const getCategoryKey = (title: string): string => {
        switch (title) {
            case 'Steps': return 'steps';
            case 'Water': return 'water';
            case 'Sleep': return 'sleep';
            case 'Weight Tracker': return 'currentWeight';
            case 'Meditation': return 'meditationHrs';
            default: return title.toLowerCase();
        }
    };

    const getTrackerData = () => {
        const stepsGoal = getGoalByCategory('steps');
        const waterGoal = getGoalByCategory('water');
        const sleepGoal = getGoalByCategory('sleep');
        const currentWeightGoal = getGoalByCategory('currentWeight');
        const goalWeightGoal = getGoalByCategory('goalWeight');
        const meditationGoal = getGoalByCategory('meditationHrs');

        return [
            {
                title: 'Steps',
                current: getCurrentProgress('steps'),
                target: stepsGoal?.target_value || 10000,
                unit: 'steps',
                icon: 'steps',
                color: '#FCAB10',
                actionType: 'refresh' as const,
            },
            {
                title: 'Water',
                current: getCurrentProgress('water'),
                target: waterGoal?.target_value || 8,
                unit: 'glass',
                icon: 'water',
                color: '#2684FE',
                actionType: 'add' as const,
            },
            {
                title: 'Sleep',
                current: getCurrentProgress('sleep'),
                target: sleepGoal?.target_value || 8,
                unit: 'h',
                icon: 'sleep',
                color: '#44AF69',
                actionType: 'add' as const,
            },
            {
                title: 'Weight Tracker',
                current: currentWeight,
                target: goalWeightGoal?.target_value || 0,
                unit: 'kg',
                icon: 'weight',
                color: '#EE6352',
                actionType: 'add' as const,
            },
            {
                title: 'Meditation',
                current: getCurrentProgress('meditationHrs'),
                target: meditationGoal?.target_value || 10,
                unit: 'min',
                icon: 'meditation',
                color: '#44AF69',
                actionType: 'add' as const,
            },
        ];
    };

    const tabs = ['Trackers', 'Challenges', 'Assessments'];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <LinearGradient
                colors={['#AE4E7B', '#D78979']}
                start={{ x: 0, y: 0.2 }}
                end={{ x: 1, y: 0.2 }}
                style={styles.header}
            >
                {/* Top Navigation */}
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/landing')}>
                        <View style={styles.backIcon}>
                            <Ionicons name="chevron-back" size={20} color="#181A1F" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Wellness</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greeting}>
                        Hey {user?.user_metadata?.full_name || 
                             user?.user_metadata?.name || 
                             'there!'}
                    </Text>
                    <Text style={styles.subtitle}>Let's make today count</Text>
                </View>
            </LinearGradient>

            {/* Content */}
            <View style={styles.content}>
                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <View style={styles.tabRow}>
                        {tabs.map((tab, index) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                    {tab}
                                </Text>
                                {activeTab === tab && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.tabSeparator} />
                </View>

                {/* Trackers Content */}
                {activeTab === 'Trackers' && (
                    <ScrollView
                        style={styles.trackersContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {getTrackerData().map((tracker, index) => (
                            <TrackerCard
                                key={tracker.title}
                                title={tracker.title}
                                current={tracker.current}
                                target={tracker.target}
                                unit={tracker.unit}
                                icon={tracker.icon}
                                color={tracker.color}
                                actionType={tracker.actionType}
                                onAction={() => handleTrackerAction(tracker.title.toLowerCase().replace(' tracker', '').replace(' ', ''), tracker.actionType)}
                            />
                        ))}
                    </ScrollView>
                )}

                {/* Other Tabs Content */}
                {activeTab === 'Challenges' && (
                    <View style={styles.emptyContent}>
                        <Text style={styles.emptyText}>Challenges coming soon!</Text>
                    </View>
                )}

                {activeTab === 'Assessments' && (
                    <View style={styles.emptyContent}>
                        <Text style={styles.emptyText}>Assessments coming soon!</Text>
                    </View>
                )}
            </View>
            {/* Tracker Action Modal */}
            {selectedTracker && (
                <TrackerActionModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    category={getCategoryKey(selectedTracker.title)}
                    title={selectedTracker.title}
                    unit={selectedTracker.unit}
                    userId={user?.id || ''}
                    onSuccess={handleModalSuccess}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: 35,
        paddingBottom: 100,
    },
    topNav: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingHorizontal: 16,
        marginBottom: 50,
    },
    backButton: {
        width: 40,
        height: 40,
    },
    backIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    placeholder: {
        width: 40,
    },
    greetingSection: {
        paddingHorizontal: 16,
        gap: 4,
    },
    greeting: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        lineHeight: 40,
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        paddingTop: 24,
    },
    tabContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    tabRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    tab: {
        alignItems: 'center',
        paddingVertical: 4,
        position: 'relative',
    },
    activeTab: {
        // Active tab styling handled by text color and indicator
    },
    tabText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#181A1F',
    },
    activeTabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#181A1F',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -28,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: '#181A1F',
        borderRadius: 2,
    },
    tabSeparator: {
        height: 1,
        backgroundColor: '#DDE2EB',
        marginHorizontal: -16,
    },
    trackersContent: {
        flex: 1,
        paddingHorizontal: 16,
    },
    trackerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F0F2F5',
        marginBottom: 12,
        padding: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconContainer: {
        width: 44,
        height: 44,
    },
    iconBackground: {
        width: 44,
        height: 44,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        opacity: 0.8,
    },
    icon: {
        zIndex: 1,
    },
    textContent: {
        flex: 1,
        gap: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4E5665',
        lineHeight: 24,
    },
    progressText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#868E9E',
        lineHeight: 16,
    },
    actionButton: {
        width: 24,
        height: 24,
        backgroundColor: '#F0F2F5',
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#868E9E',
    },
});
