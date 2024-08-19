import { mapWordFrequencies } from "./helpers/mapWordFrequencies";

export class TextAnalyzer {
    wordFrequencies: Map<string, string[]>;

    constructor(text: string) {
        this.wordFrequencies = mapWordFrequencies(text
            .split(/[\ \t\n\r\f\v\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~\|]+/)
            .map((x) => x.toLowerCase()));
    };

    predictNextWord(word: string, i: number = 0) {
        const nextWords = this.wordFrequencies.get(word.toLowerCase());
        if (!nextWords || i > nextWords.length) {
            return null;
        }

        return nextWords[i] ?? null
    }
}
