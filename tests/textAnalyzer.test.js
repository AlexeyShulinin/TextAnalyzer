"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textAnalyzer_1 = require("../textAnalyzer");
const text = 'The test the most the test no most most next most nope';
describe('First word without index tests', () => {
    test('First word in text should return next word', () => {
        let textAnalyzer = new textAnalyzer_1.default(text);
        expect(textAnalyzer.predictNextWord("the")).toBe("test");
        expect(textAnalyzer.predictNextWord("no")).toBe("most");
        expect(textAnalyzer.predictNextWord("test")).toBe("the");
    });
});
describe('First word with index tests', () => {
    test('First word in text should return next frequent word', () => {
        let textAnalyzer = new textAnalyzer_1.default(text);
        expect(textAnalyzer.predictNextWord("the", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("the", 1)).toBe("the");
        expect(textAnalyzer.predictNextWord("next", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("most", 0)).toBe("most");
    });
});
describe('First word with out of range index tests', () => {
    test('Out of range index should return null', () => {
        let textAnalyzer = new textAnalyzer_1.default(text);
        expect(textAnalyzer.predictNextWord("the", 9999)).toBe(null);
    });
});
describe('Text with letter cases', () => {
    test('Should return lower case words', () => {
        let textAnalyzer = new textAnalyzer_1.default('ThE test tHe mOst The teSt no moSt Most NEXT MOST nope');
        expect(textAnalyzer.predictNextWord("the")).toBe("test");
        expect(textAnalyzer.predictNextWord("no")).toBe("most");
        expect(textAnalyzer.predictNextWord("test")).toBe("the");
        expect(textAnalyzer.predictNextWord("next", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("most", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("the", 1)).toBe("the");
    });
});
describe('Text with different separators', () => {
    test('Should split text successfully and return correct values', () => {
        let textAnalyzer = new textAnalyzer_1.default('The|test,the(most)the test|no most.most. next most nope.');
        expect(textAnalyzer.predictNextWord("the")).toBe("test");
        expect(textAnalyzer.predictNextWord("no")).toBe("most");
        expect(textAnalyzer.predictNextWord("test")).toBe("the");
        expect(textAnalyzer.predictNextWord("next", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("most", 0)).toBe("most");
        expect(textAnalyzer.predictNextWord("the", 1)).toBe("the");
    });
});
describe('Text with different separators, words and numbers', () => {
    test('Should split text successfully and return correct values', () => {
        let textAnalyzer = new textAnalyzer_1.default('555|test 555(5555) and 555 123 TEST');
        expect(textAnalyzer.predictNextWord("555")).toBe("test");
        expect(textAnalyzer.predictNextWord("test", 0)).toBe("555");
        expect(textAnalyzer.predictNextWord("123")).toBe("test");
        expect(textAnalyzer.predictNextWord("555", 2)).toBe("5555");
    });
});
//# sourceMappingURL=textAnalyzer.test.js.map