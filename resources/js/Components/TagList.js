import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from '@/Helpers/Props';
import Label from './Label';
import styles from './TagList.module.scss';
import { useSelector } from "react-redux";

function TagList({ tags, tagListProp }) {
  const tagList = Object.assign({}, tagListProp);

  if (tagListProp === null) {
    tagList = useSelector(tagsSelector);
  }
  return (
    <div className={styles.tags}>
      {
        tags.map((t) => {
          const tag = _.find(tagList, { id: t });

          if (!tag) {
            return null;
          }

          return (
            <Label
              key={tag.id}
              kind={kinds.INFO}
            >
              {tag.label}
            </Label>
          );
        })
      }
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.object)
};

export default TagList;
