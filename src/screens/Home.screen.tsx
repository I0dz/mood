import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MoodPicker } from '../components/MoodPicker';
import { theme } from '../theme';

export const Home: React.FC = function () {
    return (
        <View style={style.container}>
            <MoodPicker />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: theme.color.oldlace,
    },
});
