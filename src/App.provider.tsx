import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOptionWithTimeStamp } from './types';

const storageKey = '@mood_tracker';
interface AppData {
    moods: MoodOptionWithTimeStamp[];
}

async function storeData(value: AppData) {
    const jsonValue = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
        console.error(e);
    }
}

async function getData(): Promise<AppData | null> {
    try {
        const stringifiedJsonValue = await AsyncStorage.getItem(storageKey);
        return stringifiedJsonValue !== null
            ? JSON.parse(stringifiedJsonValue)
            : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export interface AppContextProps {
    moods: MoodOptionWithTimeStamp[];
    handleSelectedMood: (
        moodOptionWithTimeStamp: MoodOptionWithTimeStamp,
    ) => void;
    handleDeletedMood: (
        moodOptionWithTimeStamp: MoodOptionWithTimeStamp,
    ) => void;
}
const defaultValue = {
    moods: [],
    handleSelectedMood: () => {},
    handleDeletedMood: () => {},
};
const AppContext = React.createContext<AppContextProps>(defaultValue);

export const AppProvider: React.FC = function ({ children }) {
    const [chosenMoods, setChosenMoods] = useState<MoodOptionWithTimeStamp[]>(
        [],
    );

    useEffect(() => {
        (async function getDataFromStorage() {
            const data = await getData();
            if (data) {
                setChosenMoods(data?.moods);
            }
        })();
    }, []);

    return (
        <AppContext.Provider
            value={{
                moods: chosenMoods,
                handleSelectedMood: addMood,
                handleDeletedMood: deleteMood,
            }}>
            {children}
        </AppContext.Provider>
    );

    function addMood(moodOptionWithTimeStamp: MoodOptionWithTimeStamp) {
        const moodList = [...chosenMoods, moodOptionWithTimeStamp];
        setChosenMoods(moodList);
        storeData({ moods: moodList });
    }

    function deleteMood(moodOptionWithTimeStamp: MoodOptionWithTimeStamp) {
        const moodList = chosenMoods.filter(mood => {
            return mood.timeStamp !== moodOptionWithTimeStamp.timeStamp;
        });
        setChosenMoods(moodList);
        storeData({ moods: moodList });
    }
};

export const useAppContext = () => React.useContext(AppContext);
