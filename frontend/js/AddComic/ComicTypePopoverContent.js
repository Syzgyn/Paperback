import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';

function ComicTypePopoverContent() {
  return (
    <DescriptionList>
      <DescriptionListItem
        title="Anime"
        data="Issues released using an absolute issue number"
      />

      <DescriptionListItem
        title="Daily"
        data="Issues released daily or less frequently that use year-month-day (2017-05-25)"
      />

      <DescriptionListItem
        title="Standard"
        data="Issues released with SxxEyy pattern"
      />
    </DescriptionList>
  );
}

export default ComicTypePopoverContent;
