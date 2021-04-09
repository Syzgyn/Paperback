/* eslint max-params: 0 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createEpisodeFileSelector from 'Store/Selectors/createEpisodeFileSelector';
import EpisodeRow from './EpisodeRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createEpisodeFileSelector(),
    (comic = {}, episodeFile) => {
      return {
        useSceneNumbering: comic.useSceneNumbering,
        comicMonitored: comic.monitored,
        comicType: comic.comicType,
        episodeFilePath: episodeFile ? episodeFile.path : null,
        episodeFileRelativePath: episodeFile ? episodeFile.relativePath : null,
        episodeFileSize: episodeFile ? episodeFile.size : null,
        alternateTitles: comic.alternateTitles
      };
    }
  );
}
export default connect(createMapStateToProps)(EpisodeRow);
