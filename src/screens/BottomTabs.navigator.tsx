import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Analytics } from './Analytics.screen';
import { History } from './History.screen';
import { Home } from './Home.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = function () {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="Home" component={Home} />
            <BottomTabs.Screen name="History" component={History} />
            <BottomTabs.Screen name="Analytics" component={Analytics} />
        </BottomTabs.Navigator>
    );
};
