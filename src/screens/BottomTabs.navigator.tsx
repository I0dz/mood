import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/Icons';
import { theme } from '../theme';
import { Analytics } from './Analytics.screen';
import { History } from './History.screen';
import { Home } from './Home.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = function () {
    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Home':
                            return <HomeIcon color={color} size={size} />;
                        case 'History':
                            return <HistoryIcon color={color} size={size} />;
                        case 'Analytics':
                            return <AnalyticsIcon color={color} size={size} />;
                        default:
                            return null;
                    }
                },
                tabBarActiveTintColor: theme.color.lightsalmon,
                tabBarInactiveTintColor: theme.color.peach,
                tabBarShowLabel: false,
            })}>
            <BottomTabs.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Today's mood",
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: theme.fonts.kalam.bold },
                }}
            />
            <BottomTabs.Screen
                name="History"
                component={History}
                options={{
                    title: 'Past moods',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: theme.fonts.kalam.bold },
                }}
            />
            <BottomTabs.Screen
                name="Analytics"
                component={Analytics}
                options={{
                    title: 'Analytics',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: theme.fonts.kalam.bold },
                }}
            />
        </BottomTabs.Navigator>
    );
};
