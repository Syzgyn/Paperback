import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getIndexOfFirstCharacter from '@/Utilities/Array/getIndexOfFirstCharacter';
import { sortDirections } from '@/Helpers/Props';
import VirtualTable from '@/Components/Table/VirtualTable';
import VirtualTableRow from '@/Components/Table/VirtualTableRow';
import ComicIndexItemConnector from '@/Comic/Index/ComicIndexItemConnector';
import ComicIndexHeaderConnector from './ComicIndexHeaderConnector';
import ComicIndexRow from './ComicIndexRow';
import styles from './ComicIndexTable.module.scss';

class ComicIndexTable extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      scrollIndex: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      items,
      jumpToCharacter
    } = this.props;

    if (jumpToCharacter != null && jumpToCharacter !== prevProps.jumpToCharacter) {

      const scrollIndex = getIndexOfFirstCharacter(items, jumpToCharacter);

      if (scrollIndex != null) {
        this.setState({ scrollIndex });
      }
    } else if (jumpToCharacter == null && prevProps.jumpToCharacter != null) {
      this.setState({ scrollIndex: null });
    }
  }

  //
  // Control

  rowRenderer({ key, rowIndex, style }) {
    const {
      items,
      columns,
      showBanners
    } = this.props;

    const comic = items[rowIndex];

    return (
      <VirtualTableRow
        key={key}
        style={style}
      >
        <ComicIndexItemConnector
          key={comic.id}
          component={ComicIndexRow}
          columns={columns}
          comicId={comic.id}
          languageProfileId={comic.languageProfileId}
          qualityProfileId={comic.qualityProfileId}
          showBanners={showBanners}
        />
      </VirtualTableRow>
    );
  }

  //
  // Render

  render() {
    const {
      items,
      columns,
      sortKey,
      sortDirection,
      showBanners,
      isSmallScreen,
      onSortPress,
      scroller
    } = this.props;

    return (
      <VirtualTable
        className={styles.tableContainer}
        items={items}
        scrollIndex={this.state.scrollIndex}
        scroller={scroller}
        isSmallScreen={isSmallScreen}
        rowHeight={showBanners ? 70 : 38}
        overscanRowCount={2}
        rowRenderer={this.rowRenderer}
        header={
          <ComicIndexHeaderConnector
            showBanners={showBanners}
            columns={columns}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortPress={onSortPress}
          />
        }
        columns={columns}
      />
    );
  }
}

ComicIndexTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  showBanners: PropTypes.bool.isRequired,
  jumpToCharacter: PropTypes.string,
  scroller: PropTypes.instanceOf(Element).isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  onSortPress: PropTypes.func.isRequired
};

export default ComicIndexTable;
