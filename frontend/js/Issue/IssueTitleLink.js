import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import IssueDetailsModal from 'Issue/IssueDetailsModal';
import styles from './IssueTitleLink.css';

class IssueTitleLink extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onLinkPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      issueTitle,
      ...otherProps
    } = this.props;

    return (
      <div>
        <Link
          className={styles.link}
          onPress={this.onLinkPress}
        >
          {issueTitle}
        </Link>

        <IssueDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          issueTitle={issueTitle}
          {...otherProps}
          onModalClose={this.onModalClose}
        />
      </div>
    );
  }
}

IssueTitleLink.propTypes = {
  issueTitle: PropTypes.string.isRequired
};

IssueTitleLink.defaultProps = {
  showComicButton: false
};

export default IssueTitleLink;
