import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const App: React.FC = function () {
    return (
        <View style={style.container}>
            <Text style={style.text}>Hello !</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cornflowerblue',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
});
