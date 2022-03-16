import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './App.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

export const App: React.FC = function () {
    return (
        <AppProvider>
            <NavigationContainer>
                <BottomTabsNavigator />
            </NavigationContainer>
        </AppProvider>
    );
};
