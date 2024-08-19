import * as assert from "assert";
import { TextAnalyzer } from '../index';

const text = 'The test the most the test no most most next most nope';

describe('Word without index', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer(text);

        expect(textAnalyzer.predictNextWord('the')).toBe('test');
        expect(textAnalyzer.predictNextWord('no')).toBe('most');
        expect(textAnalyzer.predictNextWord('test')).toBe('the');
    });
});

describe('Word with index', () => {
    it('Should return correct value', () => {
        const textAnalyzer = new TextAnalyzer(text);

        expect(textAnalyzer.predictNextWord('the', 0)).toBe('test');
        expect(textAnalyzer.predictNextWord('the', 1)).toBe('most');
        expect(textAnalyzer.predictNextWord('next', 0)).toBe('most');
        expect(textAnalyzer.predictNextWord('most', 0)).toBe('the');
        expect(textAnalyzer.predictNextWord('the', 3)).toBe(null);
        expect(textAnalyzer.predictNextWord('no', 3)).toBe(null);
    })
});

describe('Word with out of range index', () => {
    it('Should return null', () => {
        const textAnalyzer = new TextAnalyzer(text);

        expect(textAnalyzer.predictNextWord('the', 9999)).toBe(null);
    })
});

describe('Text with letter cases', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('ThE test tHe mOst The teSt no moSt Most NEXT MOST nope');

        expect(textAnalyzer.predictNextWord('the')).toBe('test');
        expect(textAnalyzer.predictNextWord('no')).toBe('most');
        expect(textAnalyzer.predictNextWord('test')).toBe('the');
        expect(textAnalyzer.predictNextWord('next', 0)).toBe('most');
        expect(textAnalyzer.predictNextWord('most', 0)).toBe('the');
        expect(textAnalyzer.predictNextWord('the', 0)).toBe('test');
    })
});

describe('Text with different separator', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('The|test,the(most)the test|no most.most. next most nope.');

        expect(textAnalyzer.predictNextWord('the')).toBe('test');
        expect(textAnalyzer.predictNextWord('no')).toBe('most');
        expect(textAnalyzer.predictNextWord('test')).toBe('the');
        expect(textAnalyzer.predictNextWord('next', 0)).toBe('most');
        expect(textAnalyzer.predictNextWord('most', 0)).toBe('the');
        expect(textAnalyzer.predictNextWord('the', 1)).toBe('most');
    })
});

describe('Text with different separator and numbers', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

        expect(textAnalyzer.predictNextWord('555')).toBe('test');
        expect(textAnalyzer.predictNextWord('test', 0)).toBe('555');
        expect(textAnalyzer.predictNextWord('123', 0)).toBe('test');
        expect(textAnalyzer.predictNextWord('555', 2)).toBe('123');
    })
});

describe('Word to prediction not exists at text', () => {
    it('Should return null', () => {
        const textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

        expect(textAnalyzer.predictNextWord('12412514')).toBe(null);
    })
});

describe('Whitespace word to prediction not exists at text', () => {
    it('Should return null', () => {
        const textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

        expect(textAnalyzer.predictNextWord('')).toBe(null);
    })
});

describe('Test common string for priority', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('test 1 test 2 key 5 key 6 test 3 test 4');

        expect(textAnalyzer.predictNextWord('test')).toBe('1');
        expect(textAnalyzer.predictNextWord('test', 0)).toBe('1');
        expect(textAnalyzer.predictNextWord('test', 1)).toBe('2');
        expect(textAnalyzer.predictNextWord('test', 2)).toBe('3');
        expect(textAnalyzer.predictNextWord('test', 3)).toBe('4');
        expect(textAnalyzer.predictNextWord('test', 4)).toBe(null);
        expect(textAnalyzer.predictNextWord('key')).toBe('5');
        expect(textAnalyzer.predictNextWord('key', 0)).toBe('5');
        expect(textAnalyzer.predictNextWord('key', 1)).toBe('6');
        expect(textAnalyzer.predictNextWord('1')).toBe('test');
        expect(textAnalyzer.predictNextWord('2')).toBe('key');
        expect(textAnalyzer.predictNextWord('3')).toBe('test');
        expect(textAnalyzer.predictNextWord('4')).toBe(null);
        expect(textAnalyzer.predictNextWord('5')).toBe('key');
        expect(textAnalyzer.predictNextWord('6')).toBe('test');
    })
});

describe('The test the most the test no', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('The test the most the test no');

        expect(textAnalyzer.predictNextWord('the')).toBe('test');
        expect(textAnalyzer.predictNextWord('the', 1)).toBe('most');
        expect(textAnalyzer.predictNextWord('the', 2)).toBe(null);
        expect(textAnalyzer.predictNextWord('no')).toBe(null);
    })
});

describe('Not English text', () => {
    it('Should return correct values', () => {
        const textAnalyzer = new TextAnalyzer('Привет, МИР! раз два привет повтор раз мир раз пока');

        expect(textAnalyzer.predictNextWord('Привет')).toBe('мир');
        expect(textAnalyzer.predictNextWord('Привет', 1)).toBe('повтор');
        expect(textAnalyzer.predictNextWord('Привет', 2)).toBe(null);
        expect(textAnalyzer.predictNextWord('раз')).toBe('два');
        expect(textAnalyzer.predictNextWord('пока')).toBe(null);
    })
});