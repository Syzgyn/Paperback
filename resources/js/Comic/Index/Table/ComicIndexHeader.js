import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { icons } from '@/Helpers/Props';
import IconButton from '@/Components/Link/IconButton';
import VirtualTableHeader from '@/Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from '@/Components/Table/VirtualTableHeaderCell';
import TableOptionsModalWrapper from '@/Components/Table/TableOptions/TableOptionsModalWrapper';
import hasGrowableColumns from './hasGrowableColumns';
import ComicIndexTableOptionsConnector from './ComicIndexTableOptionsConnector';
import styles from './ComicIndexHeader.module.scss';

function ComicIndexHeader(props) {
  const {
    showBanners,
    columns,
    onTableOptionChange,
    ...otherProps
  } = props;

  return (
    <VirtualTableHeader>
      {
        columns.map((column) => {
          const {
            name,
            label,
            isSortable,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'actions') {
            return (
              <VirtualTableHeaderCell
                key={name}
                className={styles[name]}
                name={name}
                isSortable={false}
                {...otherProps}
              >

                <TableOptionsModalWrapper
                  columns={columns}
                  optionsComponent={ComicIndexTableOptionsConnector}
                  onTableOptionChange={onTableOptionChange}
                >
                  <IconButton
                    name={icons.ADVANCED_SETTINGS}
                  />
                </TableOptionsModalWrapper>
              </VirtualTableHeaderCell>
            );
          }

          return (
            <VirtualTableHeaderCell
              key={name}
              className={classNames(
                styles[name],
                name === 'sortTitle' && showBanners && styles.banner,
                name === 'sortTitle' && showBanners && !hasGrowableColumns(columns) && styles.bannerGrow
              )}
              name={name}
              isSortable={isSortable}
              {...otherProps}
            >
              {label}
            </VirtualTableHeaderCell>
          );
        })
      }
    </VirtualTableHeader>
  );
}

ComicIndexHeader.propTypes = {
  showBanners: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTableOptionChange: PropTypes.func.isRequired
};

export default ComicIndexHeader;
