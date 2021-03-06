import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Reanimated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { theme } from '../theme';
import { MoodOption, MoodOptionWithTimeStamp } from '../types';

const moodOptions: MoodOption[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];
interface MoodPickerProps {
    handleSelectedMood: (
        moodOptionWithTimeStamp: MoodOptionWithTimeStamp,
    ) => void;
}

const imageUrl =
    'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC<MoodPickerProps> = function ({
    handleSelectedMood,
}) {
    const [selectedMood, setSelectedMood] = useState<MoodOption>();
    const [hasSelectedMood, setHasSelectedMood] = useState<boolean>(false);
    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(selectedMood ? 1 : 0.5),
            transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
        };
    }, [selectedMood]);
    return (
        <View style={styles.home}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.background_image}
                resizeMode="cover"
            />
            {hasSelectedMood ? (
                <View style={[styles.moodPicker]}>
                    <Text style={styles.thank_you}>Thank you!</Text>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require('../assets/images/draw.png')}
                    />
                    <Pressable
                        style={styles.submit}
                        onPress={() => {
                            setHasSelectedMood(false);
                        }}>
                        <Text style={styles.submitText}>Back</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={[styles.moodPicker]}>
                    <Text style={styles.title}>How are you right now?</Text>
                    <View style={styles.container}>
                        {moodOptions.map(mood => {
                            const isSelected =
                                mood.emoji === selectedMood?.emoji;
                            return (
                                <View style={styles.mood} key={mood.emoji}>
                                    <Pressable
                                        style={[
                                            styles.moodButton,
                                            isSelected &&
                                                styles.selectedMoodButton,
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
                    <ReanimatedPressable
                        style={[styles.submit, buttonStyle]}
                        onPress={() => {
                            if (selectedMood) {
                                handleSelectedMood({
                                    ...selectedMood,
                                    timeStamp: Date.now(),
                                });
                                setHasSelectedMood(true);
                            }
                        }}>
                        <Text style={styles.submitText}>Choose</Text>
                    </ReanimatedPressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background_image: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    home: {
        justifyContent: 'center',
    },
    moodPicker: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: theme.color.lightsalmon,
        backgroundColor: theme.color.oldlace,
        borderRadius: 8,
        height: 270,
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
        fontFamily: theme.fonts.kalam.bold,
    },
    mood: {
        alignItems: 'center',
        height: 70,
    },
    moodEmoji: {
        fontSize: 22,
    },
    moodDescription: {
        color: theme.color.lightsalmon,
        fontSize: 12,
        fontFamily: theme.fonts.kalam.light,
    },
    moodButton: {
        padding: 10,
        fontFamily: theme.fonts.kalam.regular,
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
        width: 160,
        alignSelf: 'center',
    },
    submitText: {
        fontSize: 16,
        fontFamily: theme.fonts.kalam.bold,
        color: theme.color.oldlace,
        alignSelf: 'center',
    },
    image: {
        height: 150,
        transform: [{ rotateZ: '-90deg' }],
        alignSelf: 'center',
    },
    thank_you: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: theme.fonts.kalam.bold,
    },
});
