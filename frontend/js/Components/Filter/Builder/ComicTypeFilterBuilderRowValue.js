import React from 'react';
import FilterBuilderRowValue from './FilterBuilderRowValue';

const comicTypeList = [
  { id: 'anime', name: 'Anime' },
  { id: 'daily', name: 'Daily' },
  { id: 'standard', name: 'Standard' }
];

function ComicTypeFilterBuilderRowValue(props) {
  return (
    <FilterBuilderRowValue
      tagList={comicTypeList}
      {...props}
    />
  );
}

export default ComicTypeFilterBuilderRowValue;
