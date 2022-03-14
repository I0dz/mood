import React, { useState } from 'react';

import { MoodOptionWithTimeStamp } from './types';

interface AppContextProps {
    moods: MoodOptionWithTimeStamp[];
    handleSelectedMood: (
        moodOptionWithTimeStamp: MoodOptionWithTimeStamp,
    ) => void;
}
const defaultValue = { moods: [], handleSelectedMood: () => {} };
const AppContext = React.createContext<AppContextProps>(defaultValue);
export const useAppContext = () => React.useContext(AppContext);

export const AppProvider: React.FC = function ({ children }) {
    const [chosenMoods, setChosenMoods] = useState<MoodOptionWithTimeStamp[]>(
        [],
    );
    return (
        <AppContext.Provider
            value={{ moods: chosenMoods, handleSelectedMood: addMood }}>
            {children}
        </AppContext.Provider>
    );

    function addMood(moodOptionWithTimeStamp: MoodOptionWithTimeStamp) {
        setChosenMoods([...chosenMoods, moodOptionWithTimeStamp]);
    }
};
