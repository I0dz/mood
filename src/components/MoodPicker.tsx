import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = function () {
    const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
    return (
        <View style={styles.moodPicker}>
            <Text style={styles.title}>How are you right now?</Text>
            <View style={styles.container}>
                {moodOptions.map(mood => {
                    const isSelected = mood.emoji === selectedMood?.emoji;
                    return (
                        <View style={styles.mood} key={mood.emoji}>
                            <Pressable
                                style={[
                                    styles.moodButton,
                                    isSelected && styles.selectedMoodButton,
                                ]}
                                onPress={() => {
                                    setSelectedMood(mood);
                                }}>
                                <View>
                                    <Text style={[styles.moodEmoji]}>
                                        {mood.emoji}
                                    </Text>
                                </View>
                            </Pressable>
                            {isSelected && (
                                <Text style={styles.moodDescription}>
                                    {mood.description}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
            <Pressable style={styles.submit}>
                <Text style={styles.submitText}>Choose</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    moodPicker: {
        justifyContent: 'center',
        alignItems: 'center',
        // justifySelf: 'strench',
        marginHorizontal: 12,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: theme.color.lightsalmon,
        borderRadius: 8,
    },
    container: {
        marginVertical: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mood: {
        alignItems: 'center',
    },
    moodEmoji: {
        fontSize: 22,
    },
    moodDescription: {
        color: theme.color.lightsalmon,
        fontSize: 12,
    },
    moodButton: {
        padding: 10,
    },
    selectedMoodButton: {
        backgroundColor: theme.color.peach,
        borderRadius: 50,
    },
    submit: {
        backgroundColor: theme.color.lightsalmon,
        paddingHorizontal: 28,
        paddingVertical: 8,
        borderRadius: 20,
    },
    submitText: {
        fontWeight: 'bold',
        color: theme.color.oldlace,
    },
});
