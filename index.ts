module.exports = class TextAnalyzer {
    words: string[];
    sortedWords: string[];

    constructor(text: string) { 
        this.words = text.split(/[^a-zA-Z0-9]+/).map((x) => x.toLowerCase());
        this.sortedWords = this.mapWordFrequencies();
    };
    
    predictNextWord(word: string, i?: number) {
        let currentWordIndex = this.words.indexOf(word.toLowerCase());

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
        let wordFrequencies = new Map<string, number>();

        for (let word of this.words) {
            let wordKey = word.toLowerCase();
            let wordFrequency = wordFrequencies.get(wordKey);
            if (wordFrequency !== undefined) {
                wordFrequencies.set(wordKey, ++wordFrequency);
            } else {
                wordFrequencies.set(wordKey, 1);
            }
        }

        return [...new Set<string>([...wordFrequencies.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]))];
    }
}
