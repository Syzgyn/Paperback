
function getNewComic(comic, payload) {
  const {
    rootFolderPath,
    monitor,
    qualityProfileId,
    languageProfileId,
    comicType,
    seasonFolder,
    tags,
    searchForMissingIssues = false,
    searchForCutoffUnmetIssues = false
  } = payload;

  const addOptions = {
    monitor,
    searchForMissingIssues,
    searchForCutoffUnmetIssues
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
