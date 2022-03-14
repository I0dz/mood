import format from 'date-fns/format';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../App.provider';
import { theme } from '../theme';
import { MoodOptionWithTimeStamp } from '../types';

export const History: React.FC = function () {
    const appContext = useAppContext();

    return (
        <FlatList
            data={appContext.moods}
            renderItem={renderMood}
            keyExtractor={item => String(item.timeStamp)}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );

    function renderMood({ item }: { item: MoodOptionWithTimeStamp }) {
        return (
            <View key={item.timeStamp} style={styles.mood}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.date}>
                    {format(
                        new Date(item.timeStamp),
                        "dd MMM, yyyy 'at' h:mmaa",
                    )}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    mood: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
    },
    emoji: {
        fontSize: 24,
    },
    separator: {
        width: '70%',
        borderWidth: 0.6,
        borderColor: theme.color.lightsalmon,
        backgroundColor: theme.color.lightsalmon,
        alignSelf: 'center',
        marginVertical: 4,
    },
});
