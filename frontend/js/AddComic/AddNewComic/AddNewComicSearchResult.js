import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds, sizes } from 'Helpers/Props';
import HeartRating from 'Components/HeartRating';
import Icon from 'Components/Icon';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import ComicPoster from 'Comic/ComicPoster';
import AddNewComicModal from './AddNewComicModal';
import styles from './AddNewComicSearchResult.css';

class AddNewComicSearchResult extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNewAddComicModalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isExistingComic && this.props.isExistingComic) {
      this.onAddComicModalClose();
    }
  }

  //
  // Listeners

  onPress = () => {
    this.setState({ isNewAddComicModalOpen: true });
  }

  onAddComicModalClose = () => {
    this.setState({ isNewAddComicModalOpen: false });
  }

  onTVDBLinkPress = (event) => {
    event.stopPropagation();
  }

  //
  // Render

  render() {
    const {
      tvdbId,
      title,
      titleSlug,
      year,
      network,
      status,
      overview,
      statistics,
      ratings,
      folder,
      comicType,
      images,
      isExistingComic,
      isSmallScreen
    } = this.props;

    const seasonCount = statistics.seasonCount;

    const {
      isNewAddComicModalOpen
    } = this.state;

    const linkProps = isExistingComic ? { to: `/comic/${titleSlug}` } : { onPress: this.onPress };
    let seasons = '1 Season';

    if (seasonCount > 1) {
      seasons = `${seasonCount} Seasons`;
    }

    return (
      <div className={styles.searchResult}>
        <Link
          className={styles.underlay}
          {...linkProps}
        />

        <div className={styles.overlay}>
          {
            isSmallScreen ?
              null :
              <ComicPoster
                className={styles.poster}
                images={images}
                size={250}
                overflow={true}
              />
          }

          <div className={styles.content}>
            <div className={styles.titleRow}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>
                  {title}

                  {
                    !title.contains(year) && year ?
                      <span className={styles.year}>
                        ({year})
                      </span> :
                      null
                  }
                </div>
              </div>

              <div className={styles.icons}>
                {
                  isExistingComic ?
                    <Icon
                      className={styles.alreadyExistsIcon}
                      name={icons.CHECK_CIRCLE}
                      size={36}
                      title="Already in your library"
                    /> :
                    null
                }

                <Link
                  className={styles.tvdbLink}
                  to={`http://www.thetvdb.com/?tab=comic&id=${tvdbId}`}
                  onPress={this.onTVDBLinkPress}
                >
                  <Icon
                    className={styles.tvdbLinkIcon}
                    name={icons.EXTERNAL_LINK}
                    size={28}
                  />
                </Link>
              </div>
            </div>

            <div>
              <Label size={sizes.LARGE}>
                <HeartRating
                  rating={ratings.value}
                  iconSize={13}
                />
              </Label>

              {
                network ?
                  <Label size={sizes.LARGE}>
                    {network}
                  </Label> :
                  null
              }

              {
                seasonCount ?
                  <Label size={sizes.LARGE}>
                    {seasons}
                  </Label> :
                  null
              }

              {
                status === 'ended' ?
                  <Label
                    kind={kinds.DANGER}
                    size={sizes.LARGE}
                  >
                    Ended
                  </Label> :
                  null
              }

              {
                status === 'upcoming' ?
                  <Label
                    kind={kinds.INFO}
                    size={sizes.LARGE}
                  >
                    Upcoming
                  </Label> :
                  null
              }
            </div>

            <div className={styles.overview}>
              {overview}
            </div>
          </div>
        </div>

        <AddNewComicModal
          isOpen={isNewAddComicModalOpen && !isExistingComic}
          tvdbId={tvdbId}
          title={title}
          year={year}
          overview={overview}
          folder={folder}
          initialComicType={comicType}
          images={images}
          onModalClose={this.onAddComicModalClose}
        />
      </div>
    );
  }
}

AddNewComicSearchResult.propTypes = {
  tvdbId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  network: PropTypes.string,
  status: PropTypes.string.isRequired,
  overview: PropTypes.string,
  statistics: PropTypes.object.isRequired,
  ratings: PropTypes.object.isRequired,
  folder: PropTypes.string.isRequired,
  comicType: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  isExistingComic: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired
};

export default AddNewComicSearchResult;
