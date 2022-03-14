import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppContext } from '../App.provider';
import { MoodPicker } from '../components/MoodPicker';
import { theme } from '../theme';

export const Home: React.FC = function () {
    const appContext = useAppContext();

    return (
        <View style={styles.container}>
            <MoodPicker handleSelectedMood={appContext.handleSelectedMood} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: theme.color.oldlace,
    },
});
