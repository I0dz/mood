import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MoodPicker } from '../components/MoodPicker';
import { theme } from '../theme';
import { MoodOptionWithTimeStamp } from '../types';

export const Home: React.FC = function () {
    const [chosenMoods, setChosenMoods] = useState<MoodOptionWithTimeStamp[]>(
        [],
    );
    return (
        <View style={styles.container}>
            <MoodPicker handleSelectedMood={addMood} />
            {chosenMoods.map(mood => {
                return (
                    <View key={mood.timeStamp} style={styles.mood}>
                        <Text>{mood.emoji}</Text>
                        <Text style={styles.date}>
                            {new Date(mood.timeStamp).toString()}
                        </Text>
                    </View>
                );
            })}
        </View>
    );

    function addMood(moodOptionWithTimeStamp: MoodOptionWithTimeStamp) {
        setChosenMoods([...chosenMoods, moodOptionWithTimeStamp]);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: theme.color.oldlace,
    },
    mood: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        fontSize: 10,
    },
});
