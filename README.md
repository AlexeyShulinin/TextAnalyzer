# TextAnalyzer

Small module which helps you return the most likely word that follows the one passed to the method

## Usage:

```js
import TextAnalyzer from 'ash-text-analyzer';

const textAnalyzer = new TextAnalyzer('Text to predict next word');
textAnalyzer('predict');
```

Also there is second optional parameter which allows you to transfer which word is most popular to return (indexing from 0, where 0 is the most popular)

## Example:

```js
import TextAnalyzer from 'ash-text-analyzer';

const textAnalyzer = new TextAnalyzer('One two two one one next no one one');
textAnalyzer('two', 0);	// 'one'
```

If there is no such word, return null
