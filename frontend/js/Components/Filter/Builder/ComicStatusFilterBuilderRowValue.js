import React from 'react';
import FilterBuilderRowValue from './FilterBuilderRowValue';

const comicStatusList = [
  { id: 'continuing', name: 'Continuing' },
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'ended', name: 'Ended' }
];

function ComicStatusFilterBuilderRowValue(props) {
  return (
    <FilterBuilderRowValue
      tagList={comicStatusList}
      {...props}
    />
  );
}

export default ComicStatusFilterBuilderRowValue;
