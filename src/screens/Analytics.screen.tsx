import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Analytics: React.FC = function () {
    return (
        <View style={style.container}>
            <Text>Analytics</Text>
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
