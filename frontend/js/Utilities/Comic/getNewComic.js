
function getNewComic(comic, payload) {
  const {
    rootFolderPath,
    monitor,
    qualityProfileId,
    languageProfileId,
    comicType,
    seasonFolder,
    tags,
    searchForMissingEpisodes = false,
    searchForCutoffUnmetEpisodes = false
  } = payload;

  const addOptions = {
    monitor,
    searchForMissingEpisodes,
    searchForCutoffUnmetEpisodes
  };

  comic.addOptions = addOptions;
  comic.monitored = true;
  comic.qualityProfileId = qualityProfileId;
  comic.languageProfileId = languageProfileId;
  comic.rootFolderPath = rootFolderPath;
  comic.comicType = comicType;
  comic.seasonFolder = seasonFolder;
  comic.tags = tags;

  return comic;
}

export default getNewComic;
