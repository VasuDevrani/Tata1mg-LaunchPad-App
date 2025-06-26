import { Href, router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({ headerText, skip, skipRoute, backRoute }: { headerText: string; skip?: boolean; skipRoute?: Href, backRoute?: Href }) {
    const handleBack = () => {
        router.push(backRoute || '/landing');
    };

    const handleSkip = () => {
        skipRoute = (skipRoute || '/dashboard') as Href;
        router.push(skipRoute);
    };

    return (
        <View style={styles.header}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <View style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={24} color="#181A1F" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.backButtonText}>
                    {headerText || "Home"}
                </Text>
            </View>
            {
                skip && (
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: { padding: 15, paddingTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButtonText: { fontSize: 20, color: '#181A1F', fontWeight: '600' },
    backButtonContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    backIcon: { backgroundColor: "#F0F2F5", padding: 14, borderRadius: 100 },
    skipButtonText: { fontSize: 16, color: '#007AFF', fontWeight: '500' }
});
