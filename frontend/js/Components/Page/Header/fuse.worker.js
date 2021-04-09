import Fuse from 'fuse.js';

const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  ignoreLocation: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title',
    'alternateTitles.title',
    'tags.label'
  ]
};

function getSuggestions(comic, value) {
  const limit = 10;
  let suggestions = [];

  if (value.length === 1) {
    for (let i = 0; i < comic.length; i++) {
      const s = comic[i];
      if (s.firstCharacter === value.toLowerCase()) {
        suggestions.push({
          item: comic[i],
          indices: [
            [0, 0]
          ],
          matches: [
            {
              value: s.title,
              key: 'title'
            }
          ],
          arrayIndex: 0
        });
        if (suggestions.length > limit) {
          break;
        }
      }
    }
  } else {
    const fuse = new Fuse(comic, fuseOptions);
    suggestions = fuse.search(value, { limit });
  }

  return suggestions;
}

onmessage = function(e) {
  if (!e) {
    return;
  }

  const {
    comic,
    value
  } = e.data;

  const suggestions = getSuggestions(comic, value);

  const results = {
    value,
    suggestions
  };

  self.postMessage(results);
};
