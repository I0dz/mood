import format from 'date-fns/format';
import React from 'react';
import {
    FlatList,
    LayoutAnimation,
    LogBox,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Reanimated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { AppContextProps, useAppContext } from '../App.provider';
import { theme } from '../theme';
import { MoodOptionWithTimeStamp } from '../types';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export const History: React.FC = function () {
    const appContext = useAppContext();

    return (
        <GestureHandlerRootView>
            <FlatList
                data={appContext.moods}
                renderItem={({ item }) => {
                    return <Mood item={item} appContext={appContext} />;
                }}
                inverted={true}
                keyExtractor={item => String(item.timeStamp)}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.container}
            />
        </GestureHandlerRootView>
    );
};

const Mood: React.FC<{
    item: MoodOptionWithTimeStamp;
    appContext: AppContextProps;
}> = ({ item, appContext }) => {
    const offsetX = useSharedValue(0);
    const animatedMoodStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }],
    }));

    const eventHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { shouldRemove: boolean }
    >({
        onActive: (e, ctx) => {
            offsetX.value = e.translationX;
            if (Math.abs(offsetX.value) > 100) {
                ctx.shouldRemove = true;
            } else {
                ctx.shouldRemove = false;
            }
        },
        onEnd: (_, ctx) => {
            if (ctx.shouldRemove) {
                offsetX.value = withTiming(Math.sign(offsetX.value) * 1000);
                runOnJS(removeWithDelay)(item);
            } else {
                offsetX.value = withTiming(0);
            }
        },
    });
    return (
        <PanGestureHandler
            activeOffsetX={[-10, 10]}
            onGestureEvent={eventHandler}>
            <Reanimated.View
                key={item.timeStamp}
                style={[styles.mood, animatedMoodStyle]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>
                    {format(new Date(item.timeStamp), 'dd MMM, yyyy')}
                </Text>
                <Pressable
                    onPress={() => {
                        removeWithDelay(item);
                    }}>
                    <Text style={styles.deleteText}>delete</Text>
                </Pressable>
            </Reanimated.View>
        </PanGestureHandler>
    );

    function removeWithDelay(mood: MoodOptionWithTimeStamp) {
        setTimeout(() => {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            appContext.handleDeletedMood(mood);
        }, 300);
    }
};

const styles = StyleSheet.create({
    deleteText: {
        fontFamily: theme.fonts.kalam.regular,
        color: theme.color.lightsalmon,
    },
    container: {
        backgroundColor: theme.color.peach,
    },
    mood: {
        marginHorizontal: 4,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 22,
        paddingRight: 12,
        backgroundColor: theme.color.oldlace,
    },
    description: {
        fontSize: 18,
        fontFamily: theme.fonts.kalam.bold,
    },
    date: {
        fontSize: 16,
        fontFamily: theme.fonts.kalam.regular,
    },
    emoji: {
        fontSize: 24,
    },
    separator: {
        width: '100%',
        borderWidth: 1,
        borderColor: theme.color.peach,
        backgroundColor: theme.color.peach,
        alignSelf: 'center',
        marginVertical: 4,
    },
});
