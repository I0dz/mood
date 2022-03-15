import format from 'date-fns/format';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../App.provider';
import { MoodOptionWithTimeStamp } from '../types';

export const History: React.FC = function () {
    const appContext = useAppContext();

    return (
        <FlatList
            data={appContext.moods}
            renderItem={renderMood}
            inverted={true}
            keyExtractor={item => String(item.timeStamp)}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );

    function renderMood({ item }: { item: MoodOptionWithTimeStamp }) {
        return (
            <View key={item.timeStamp} style={styles.mood}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.date}>{item.description}</Text>
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
        marginHorizontal: 4,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
    },
    emoji: {
        fontSize: 24,
    },
    separator: {
        width: '100%',
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 4,
    },
});
