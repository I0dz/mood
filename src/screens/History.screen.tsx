import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const History: React.FC = function () {
    return (
        <View style={style.container}>
            <Text>History</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
