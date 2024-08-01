import * as assert from "assert";
import TextAnalyzer from '../index';

const text = 'The test the most the test no most most next most nope';

export function WordWithoutIndexShouldReturnCorrectValues() {
    let textAnalyzer = new TextAnalyzer(text);

    assert.strictEqual(textAnalyzer.predictNextWord('the'), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord('no'), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('test'), 'the');
};

export function WordWithIndexShouldReturnCorrectValues() {
    let textAnalyzer = new TextAnalyzer(text);

    assert.strictEqual(textAnalyzer.predictNextWord('the', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('the', 1), 'the');
    assert.strictEqual(textAnalyzer.predictNextWord('next', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('most', 0), 'most');
};

export function WordWithOutOfRangeIndexShouldReturnNull() {
    let textAnalyzer = new TextAnalyzer(text);

    assert.strictEqual(textAnalyzer.predictNextWord('the', 9999), null);
};

export function TextWithLetterCasesShouldReturnCorrectValues() {
    let textAnalyzer = new TextAnalyzer('ThE test tHe mOst The teSt no moSt Most NEXT MOST nope');

    assert.strictEqual(textAnalyzer.predictNextWord('the'), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord('no'), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('test'), 'the');
    assert.strictEqual(textAnalyzer.predictNextWord('next', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('most', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('the', 1), 'the');
};

export function TextWithDifferentSeparatorsShouldReturnCorrectValues() {
    let textAnalyzer = new TextAnalyzer('The|test,the(most)the test|no most.most. next most nope.');

    assert.strictEqual(textAnalyzer.predictNextWord('the'), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord('no'), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('test'), 'the');
    assert.strictEqual(textAnalyzer.predictNextWord('next', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('most', 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord('the', 1), 'the');
};

export function TextWithDifferentSeparatorsAndNumbersShouldReturnCorrectValues() {
    let textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

    assert.strictEqual(textAnalyzer.predictNextWord('555'), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord('test', 0), '555');
    assert.strictEqual(textAnalyzer.predictNextWord('123'), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord('555', 2), '5555');
};

export function WordToPredictionNotExistsAtTextShouldReturnNull() {
    let textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

    assert.strictEqual(textAnalyzer.predictNextWord('12412514'), null);
};

export function WhitespaceWordToPredictionNotExistsAtTextShouldReturnNull() {
    let textAnalyzer = new TextAnalyzer('555|test 555(5555) and 555 123 TEST');

    assert.strictEqual(textAnalyzer.predictNextWord(''), null);
};
