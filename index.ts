export default class TextAnalyzer {
    words: string[];
    sortedWords: string[];
    wordFrequencies: Map<string, number>;

    constructor(text: string) { 
        this.words = text.split(/[^a-zA-Z0-9]+/).map((x) => x.toLowerCase());
        this.sortedWords = this.mapWordFrequencies();
    };
    
    predictNextWord(word: string, i?: number) {
        let currentWordIndex = this.words.indexOf(word.toLowerCase());

        if (currentWordIndex < 0) {
            return null;
        }

        if (i !== undefined) {
            if (i >= this.words.length) {
                return null;
            }

            let nextWordIndex = this.words.lastIndexOf(this.sortedWords[i]);
            return nextWordIndex < currentWordIndex ? null : this.words[nextWordIndex]
        }

        return currentWordIndex + 1 < this.words.length ? this.words[currentWordIndex + 1] : null;
    }

    private mapWordFrequencies(): string[] {
        this.wordFrequencies = new Map<string, number>();

        for (let word of this.words) {
            let wordKey = word.toLowerCase();
            let wordFrequency = this.wordFrequencies.get(wordKey);
            if (wordFrequency !== undefined) {
                this.wordFrequencies.set(wordKey, ++wordFrequency);
            } else {
                this.wordFrequencies.set(wordKey, 1);
            }
        }

        return [...new Set<string>([...this.wordFrequencies.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]))];
    }
}
