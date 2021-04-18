import * as addComic from './addComicActions';
import * as app from './appActions';
import * as blacklist from './blacklistActions';
import * as calendar from './calendarActions';
import * as captcha from './captchaActions';
import * as customFilters from './customFilterActions';
import * as commands from './commandActions';
import * as issues from './issueActions';
import * as issueFiles from './issueFileActions';
import * as issueHistory from './issueHistoryActions';
import * as history from './historyActions';
import * as importComic from './importComicActions';
import * as interactiveImportActions from './interactiveImportActions';
import * as oAuth from './oAuthActions';
import * as organizePreview from './organizePreviewActions';
import * as paths from './pathActions';
import * as providerOptions from './providerOptionActions';
import * as queue from './queueActions';
import * as releases from './releaseActions';
import * as rootFolders from './rootFolderActions';
import * as seasonPass from './seasonPassActions';
import * as comic from './comicActions';
import * as comicEditor from './comicEditorActions';
import * as comicHistory from './comicHistoryActions';
import * as comicIndex from './comicIndexActions';
import * as settings from './settingsActions';
import * as system from './systemActions';
import * as tags from './tagActions';
import * as wanted from './wantedActions';

export default [
  addComic,
  app,
  blacklist,
  calendar,
  captcha,
  comic,
  comicEditor,
  comicHistory,
  comicIndex,
  commands,
  customFilters,
  issues,
  issueFiles,
  issueHistory,
  history,
  importComic,
  interactiveImportActions,
  oAuth,
  organizePreview,
  paths,
  providerOptions,
  queue,
  releases,
  rootFolders,
  seasonPass,
  settings,
  system,
  tags,
  wanted
];
