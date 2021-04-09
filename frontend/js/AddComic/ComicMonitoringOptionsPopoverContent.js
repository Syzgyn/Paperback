import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';

function ComicMonitoringOptionsPopoverContent() {
  return (
    <DescriptionList>
      <DescriptionListItem
        title="All Issues"
        data="Monitor all issues except specials"
      />

      <DescriptionListItem
        title="Future Issues"
        data="Monitor issues that have not aired yet"
      />

      <DescriptionListItem
        title="Missing Issues"
        data="Monitor issues that do not have files or have not aired yet"
      />

      <DescriptionListItem
        title="Existing Issues"
        data="Monitor issues that have files or have not aired yet"
      />

      <DescriptionListItem
        title="First Season"
        data="Monitor all issues of the first season. All other seasons will be ignored"
      />

      <DescriptionListItem
        title="Latest Season"
        data="Monitor all issues of the latest season and future seasons"
      />

      <DescriptionListItem
        title="None"
        data="No issues will be monitored"
      />
    </DescriptionList>
  );
}

export default ComicMonitoringOptionsPopoverContent;
