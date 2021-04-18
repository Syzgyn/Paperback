import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getErrorMessage from 'Utilities/Object/getErrorMessage';
import { icons, kinds } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Link from 'Components/Link/Link';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import TextInput from 'Components/Form/TextInput';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import AddNewComicSearchResultConnector from './AddNewComicSearchResultConnector';
import styles from './AddNewComic.css';

class AddNewComic extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      term: props.term || '',
      isFetching: false
    };
  }

  componentDidMount() {
    const term = this.state.term;

    if (term) {
      this.props.onComicLookupChange(term);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      term,
      isFetching
    } = this.props;

    if (term && term !== prevProps.term) {
      this.setState({
        term,
        isFetching: true
      });
      this.props.onComicLookupChange(term);
    } else if (isFetching !== prevProps.isFetching) {
      this.setState({
        isFetching
      });
    }
  }

  //
  // Listeners

  onSearchInputChange = ({ value }) => {
    const hasValue = !!value.trim();

    this.setState({ term: value, isFetching: hasValue }, () => {
      if (hasValue) {
        this.props.onComicLookupChange(value);
      } else {
        this.props.onClearComicLookup();
      }
    });
  }

  onClearComicLookupPress = () => {
    this.setState({ term: '' });
    this.props.onClearComicLookup();
  }

  //
  // Render

  render() {
    const {
      error,
      items,
      hasExistingComic
    } = this.props;

    const term = this.state.term;
    const isFetching = this.state.isFetching;

    return (
      <PageContent title="Add New Comic">
        <PageContentBody>
          <div className={styles.searchContainer}>
            <div className={styles.searchIconContainer}>
              <Icon
                name={icons.SEARCH}
                size={20}
              />
            </div>

            <TextInput
              className={styles.searchInput}
              name="comicLookup"
              value={term}
              placeholder="eg. The Avengers, cvid:####"
              autoFocus={true}
              onChange={this.onSearchInputChange}
            />

            <Button
              className={styles.clearLookupButton}
              onPress={this.onClearComicLookupPress}
            >
              <Icon
                name={icons.REMOVE}
                size={20}
              />
            </Button>
          </div>

          {
            isFetching &&
              <LoadingIndicator />
          }

          {
            !isFetching && !!error ?
              <div className={styles.message}>
                <div className={styles.helpText}>
                  Failed to load search results, please try again.
                </div>
                <div>{getErrorMessage(error)}</div>
              </div> : null
          }

          {
            !isFetching && !error && !!items.length &&
              <div className={styles.searchResults}>
                {
                  items.map((item) => {
                    return (
                      <AddNewComicSearchResultConnector
                        key={item.cvid}
                        {...item}
                      />
                    );
                  })
                }
              </div>
          }

          {
            !isFetching && !error && !items.length && !!term &&
              <div className={styles.message}>
                <div className={styles.noResults}>Couldn't find any results for '{term}'</div>
                <div>You can also search using ComicVine ID of a show. eg. cvid:5989</div>
              </div>
          }

          {
            term ?
              null :
              <div className={styles.message}>
                <div className={styles.helpText}>
                  It's easy to add a new comic, just start typing the name the comic you want to add.
                </div>
                <div>You can also search using ComicVine ID of a show. eg. cvid:5989</div>
              </div>
          }

          {
            !term && !hasExistingComic ?
              <div className={styles.message}>
                <div className={styles.noComicText}>
                  You haven't added any comic yet, do you want to import some or all of your comics first?
                </div>
                <div>
                  <Button
                    to="/add/import"
                    kind={kinds.PRIMARY}
                  >
                    Import Existing Comic
                  </Button>
                </div>
              </div> :
              null
          }

          <div />
        </PageContentBody>
      </PageContent>
    );
  }
}

AddNewComic.propTypes = {
  term: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  addError: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasExistingComic: PropTypes.bool.isRequired,
  onComicLookupChange: PropTypes.func.isRequired,
  onClearComicLookup: PropTypes.func.isRequired
};

export default AddNewComic;
