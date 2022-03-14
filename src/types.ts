export interface MoodOption {
    emoji: '🧑‍💻' | '🤔' | '😊' | '🥳' | '😤';
    description: string;
}

export interface MoodOptionWithTimeStamp extends MoodOption {
    timeStamp: number;
}
