import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from '@/Helpers/Props';
import IconButton from '@/Components/Link/IconButton';
import SpinnerIconButton from '@/Components/Link/SpinnerIconButton';
import VirtualTableRowCell from '@/Components/Table/Cells/VirtualTableRowCell';
import EditComicModalConnector from '@/Comic/Edit/EditComicModalConnector';
import DeleteComicModal from '@/Comic/Delete/DeleteComicModal';

class ComicIndexActionsCell extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: false
    };
  }

  //
  // Listeners

  onEditComicPress() {
    this.setState({ isEditComicModalOpen: true });
  }

  onEditComicModalClose() {
    this.setState({ isEditComicModalOpen: false });
  }

  onDeleteComicPress() {
    this.setState({
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: true
    });
  }

  onDeleteComicModalClose() {
    this.setState({ isDeleteComicModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      isRefreshingComic,
      onRefreshComicPress,
      ...otherProps
    } = this.props;

    const {
      isEditComicModalOpen,
      isDeleteComicModalOpen
    } = this.state;

    return (
      <VirtualTableRowCell
        {...otherProps}
      >
        <SpinnerIconButton
          name={icons.REFRESH}
          title="Refresh comic"
          isSpinning={isRefreshingComic}
          onPress={onRefreshComicPress}
        />

        <IconButton
          name={icons.EDIT}
          title="Edit Comic"
          onPress={this.onEditComicPress}
        />

        <EditComicModalConnector
          isOpen={isEditComicModalOpen}
          comicId={id}
          onModalClose={this.onEditComicModalClose}
          onDeleteComicPress={this.onDeleteComicPress}
        />

        <DeleteComicModal
          isOpen={isDeleteComicModalOpen}
          comicId={id}
          onModalClose={this.onDeleteComicModalClose}
        />
      </VirtualTableRowCell>
    );
  }
}

ComicIndexActionsCell.propTypes = {
  id: PropTypes.number.isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  onRefreshComicPress: PropTypes.func.isRequired
};

export default ComicIndexActionsCell;
