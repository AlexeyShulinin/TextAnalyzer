"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextWithDifferentSeparatorsAndNumbersShouldReturnCorrectValues = exports.TextWithDifferentSeparatorsShouldReturnCorrectValues = exports.TextWithLetterCasesShouldReturnCorrectValues = exports.WordWithOutOfRangeIndexShouldReturnNull = exports.WordWithIndexShouldReturnCorrectValues = exports.WordWithoutIndexShouldReturnCorrectValues = void 0;
const assert = require("assert");
const textAnalyzer_1 = require("../textAnalyzer");
const text = 'The test the most the test no most most next most nope';
function WordWithoutIndexShouldReturnCorrectValues() {
    let textAnalyzer = new textAnalyzer_1.default(text);
    assert.strictEqual(textAnalyzer.predictNextWord("the"), "test");
    assert.strictEqual(textAnalyzer.predictNextWord("no"), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("test"), "the");
}
exports.WordWithoutIndexShouldReturnCorrectValues = WordWithoutIndexShouldReturnCorrectValues;
;
function WordWithIndexShouldReturnCorrectValues() {
    let textAnalyzer = new textAnalyzer_1.default(text);
    assert.strictEqual(textAnalyzer.predictNextWord("the", 0), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("the", 1), "the");
    assert.strictEqual(textAnalyzer.predictNextWord("next", 0), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("most", 0), "most");
}
exports.WordWithIndexShouldReturnCorrectValues = WordWithIndexShouldReturnCorrectValues;
;
function WordWithOutOfRangeIndexShouldReturnNull() {
    let textAnalyzer = new textAnalyzer_1.default(text);
    assert.strictEqual(textAnalyzer.predictNextWord("the", 9999), null);
}
exports.WordWithOutOfRangeIndexShouldReturnNull = WordWithOutOfRangeIndexShouldReturnNull;
;
function TextWithLetterCasesShouldReturnCorrectValues() {
    let textAnalyzer = new textAnalyzer_1.default('ThE test tHe mOst The teSt no moSt Most NEXT MOST nope');
    assert.strictEqual(textAnalyzer.predictNextWord("the"), "test");
    assert.strictEqual(textAnalyzer.predictNextWord("no"), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("test"), "the");
    assert.strictEqual(textAnalyzer.predictNextWord("next", 0), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("most", 0), "most");
    assert.strictEqual(textAnalyzer.predictNextWord("the", 1), "the");
}
exports.TextWithLetterCasesShouldReturnCorrectValues = TextWithLetterCasesShouldReturnCorrectValues;
;
function TextWithDifferentSeparatorsShouldReturnCorrectValues() {
    let textAnalyzer = new textAnalyzer_1.default('The|test,the(most)the test|no most.most. next most nope.');
    assert.strictEqual(textAnalyzer.predictNextWord("the"), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord("no"), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord("test"), 'the');
    assert.strictEqual(textAnalyzer.predictNextWord("next", 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord("most", 0), 'most');
    assert.strictEqual(textAnalyzer.predictNextWord("the", 1), 'the');
}
exports.TextWithDifferentSeparatorsShouldReturnCorrectValues = TextWithDifferentSeparatorsShouldReturnCorrectValues;
;
function TextWithDifferentSeparatorsAndNumbersShouldReturnCorrectValues() {
    let textAnalyzer = new textAnalyzer_1.default('555|test 555(5555) and 555 123 TEST');
    assert.strictEqual(textAnalyzer.predictNextWord("555"), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord("test", 0), '555');
    assert.strictEqual(textAnalyzer.predictNextWord("123"), 'test');
    assert.strictEqual(textAnalyzer.predictNextWord("555", 2), '5555');
}
exports.TextWithDifferentSeparatorsAndNumbersShouldReturnCorrectValues = TextWithDifferentSeparatorsAndNumbersShouldReturnCorrectValues;
;
//# sourceMappingURL=text.test.js.map