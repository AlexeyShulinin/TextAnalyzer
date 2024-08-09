# TextAnalyzer

Small module which helps you return the most likely word that follows the one passed to the method

## Usage:

```js
import TextAnalyzer from 'ash-text-analyzer';

const textAnalyzer = new TextAnalyzer('Text to predict next word');
textAnalyzer.predictNextWord('predict'); // next
```

Also there is second optional parameter which allows you to transfer which word is most popular to return (indexing from 0, where 0 is the most popular)

## Example:

```js
import TextAnalyzer from 'ash-text-analyzer';

const textAnalyzer = new TextAnalyzer('The test the most the test no');
textAnalyzer.predictNextWord("the") // test
textAnalyzer.predictNextWord("the", 1) // most
textAnalyzer.predictNextWord("the", 2) // null
textAnalyzer.predictNextWord("no") // null
```

If there is no such word, return null
