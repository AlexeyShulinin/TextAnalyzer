export const mapWordFrequencies = (words: string[]): Map<string, string[]> => {
    const wordFrequencies = new Map<string, Map<string, number>>();
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (i + 1 >= words.length) {
            if (!wordFrequencies.has(word)) {
                wordFrequencies.set(word, null);
            }
            continue
        }

        const nextWord = words[i+1];
        if (wordFrequencies.has(word)) {
            const wordPriorities = wordFrequencies.get(word);
            if (wordPriorities.has(nextWord)) {
                wordPriorities.set(nextWord, wordPriorities.get(nextWord) + 1);
            } else {
                wordPriorities.set(nextWord, 0);
            }

            wordFrequencies.set(word, wordPriorities);
            continue;
        }

        wordFrequencies.set(word, new Map<string, number>().set(nextWord, 0));
    }

    const wordPredictions = new Map<string, string[]>();
    for (const [key, values] of wordFrequencies) {
        if (!values) {
            wordPredictions.set(key, null);
            continue;
        }

        wordPredictions.set(key, [...values].sort((a, b) => b[1] - a[1]).map(([key]) => key));
    }

    return wordPredictions;
}