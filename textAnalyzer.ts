export class TextAnalyzer {
    words: string[];
    wordsFrequencies: string[];

    constructor(text: string) {
        this.words = text.split(/[^a-zA-Z0-9]+/).map((x) => x.toLowerCase());
        this.wordsFrequencies = this.mapWordFrequencies();
    };

    predictNextWord(word: string, i?: number) {
        const currentWordIndex = this.words.indexOf(word.toLowerCase());

        if (currentWordIndex < 0) {
            return null;
        }

        if (i !== undefined) {
            if (i >= this.wordsFrequencies.length) {
                return null;
            }

            const matchedWords = this.wordsFrequencies[i];
            let nextWordIndex = -1;
            for (let matchedWord of matchedWords) {
                const index = this.words.lastIndexOf(matchedWord);
                if (index > currentWordIndex) {
                    nextWordIndex = index;
                    break;
                }
            }

            return nextWordIndex < currentWordIndex ? null : this.words[nextWordIndex]
        }

        return currentWordIndex + 1 < this.words.length ? this.words[currentWordIndex + 1] : null;
    }

    private mapWordFrequencies(): string[] {
        const wordFrequencies = new Map<string, number>();

        for (const word of this.words) {
            const wordKey = word.toLowerCase();
            let wordFrequency = wordFrequencies.get(wordKey);
            if (wordFrequency !== undefined) {
                wordFrequencies.set(wordKey, ++wordFrequency);
            } else {
                wordFrequencies.set(wordKey, 1);
            }
        }

        const grouppedWordFrequencies = [...wordFrequencies]
            .reduce((acc, currentValue) => {
                acc[currentValue[1]] = (acc[currentValue[1]] || []).concat(currentValue[0]);
                return acc;
            }, {});

        return Object.entries(grouppedWordFrequencies)
            .sort((a: any, b: any) => b[0] - a[0])
            .map((word) => word[1]) as string[];
    }
}