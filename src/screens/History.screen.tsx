import format from 'date-fns/format';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../App.provider';

export const History: React.FC = function () {
    const appContext = useAppContext();
    return (
        <View style={styles.container}>
            {appContext.moods.map(mood => {
                return (
                    <View key={mood.timeStamp} style={styles.mood}>
                        <Text>{mood.emoji}</Text>
                        <Text style={styles.date}>
                            {format(
                                new Date(mood.timeStamp),
                                "dd MMM, yyyy 'at' h:mmaa",
                            )}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
