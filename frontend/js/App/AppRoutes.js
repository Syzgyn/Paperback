import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getPathWithUrlBase from 'Utilities/getPathWithUrlBase';
import NotFound from 'Components/NotFound';
import Switch from 'Components/Router/Switch';
import ComicIndexConnector from 'Comic/Index/ComicIndexConnector';
import AddNewComicConnector from 'AddComic/AddNewComic/AddNewComicConnector';
import ImportComic from 'AddComic/ImportComic/ImportComic';
import ComicEditorConnector from 'Comic/Editor/ComicEditorConnector';
import ComicDetailsPageConnector from 'Comic/Details/ComicDetailsPageConnector';
import CalendarPageConnector from 'Calendar/CalendarPageConnector';
import HistoryConnector from 'Activity/History/HistoryConnector';
import QueueConnector from 'Activity/Queue/QueueConnector';
import BlacklistConnector from 'Activity/Blacklist/BlacklistConnector';
import MissingConnector from 'Wanted/Missing/MissingConnector';
import CutoffUnmetConnector from 'Wanted/CutoffUnmet/CutoffUnmetConnector';
import Settings from 'Settings/Settings';
import MediaManagementConnector from 'Settings/MediaManagement/MediaManagementConnector';
import Profiles from 'Settings/Profiles/Profiles';
import Quality from 'Settings/Quality/Quality';
import IndexerSettingsConnector from 'Settings/Indexers/IndexerSettingsConnector';
import ImportListSettingsConnector from 'Settings/ImportLists/ImportListSettingsConnector';
import DownloadClientSettingsConnector from 'Settings/DownloadClients/DownloadClientSettingsConnector';
import NotificationSettings from 'Settings/Notifications/NotificationSettings';
import MetadataSettings from 'Settings/Metadata/MetadataSettings';
import TagSettings from 'Settings/Tags/TagSettings';
import GeneralSettingsConnector from 'Settings/General/GeneralSettingsConnector';
import UISettingsConnector from 'Settings/UI/UISettingsConnector';
import Status from 'System/Status/Status';
import Tasks from 'System/Tasks/Tasks';
import BackupsConnector from 'System/Backup/BackupsConnector';
import UpdatesConnector from 'System/Updates/UpdatesConnector';
import LogsTableConnector from 'System/Events/LogsTableConnector';
import Logs from 'System/Logs/Logs';

function AppRoutes(props) {
  const {
    app
  } = props;

  return (
    <Switch>
      {/*
        Comic
      */}

      <Route
        exact={true}
        path="/"
        component={ComicIndexConnector}
      />

      {
        window.Paperback.urlBase &&
        <Route
          exact={true}
          path="/"
          addUrlBase={false}
          render={() => {
            return (
              <Redirect
                to={getPathWithUrlBase('/')}
                component={app}
              />
            );
          }}
        />
      }

      <Route
        path="/add/new"
        component={AddNewComicConnector}
      />

      <Route
        path="/add/import"
        component={ImportComic}
      />

      <Route
        path="/comiceditor"
        component={ComicEditorConnector}
      />

      <Route
        path="/comic/:titleSlug"
        component={ComicDetailsPageConnector}
      />

      {/*
        Calendar
      */}

      <Route
        path="/calendar"
        component={CalendarPageConnector}
      />

      {/*
        Activity
      */}

      <Route
        path="/activity/history"
        component={HistoryConnector}
      />

      <Route
        path="/activity/queue"
        component={QueueConnector}
      />

      <Route
        path="/activity/blacklist"
        component={BlacklistConnector}
      />

      {/*
        Wanted
      */}

      <Route
        path="/wanted/missing"
        component={MissingConnector}
      />

      <Route
        path="/wanted/cutoffunmet"
        component={CutoffUnmetConnector}
      />

      {/*
        Settings
      */}

      <Route
        exact={true}
        path="/settings"
        component={Settings}
      />

      <Route
        path="/settings/mediamanagement"
        component={MediaManagementConnector}
      />

      <Route
        path="/settings/indexers"
        component={IndexerSettingsConnector}
      />

      <Route
        path="/settings/downloadclients"
        component={DownloadClientSettingsConnector}
      />
/*
      <Route
        path="/settings/importlists"
        component={ImportListSettingsConnector}
      />
*/
      <Route
        path="/settings/tags"
        component={TagSettings}
      />

      <Route
        path="/settings/general"
        component={GeneralSettingsConnector}
      />

      <Route
        path="/settings/ui"
        component={UISettingsConnector}
      />

      {/*
        System
      */}

      <Route
        path="/system/status"
        component={Status}
      />

      <Route
        path="/system/tasks"
        component={Tasks}
      />

      <Route
        path="/system/backup"
        component={BackupsConnector}
      />

      <Route
        path="/system/updates"
        component={UpdatesConnector}
      />

      <Route
        path="/system/events"
        component={LogsTableConnector}
      />

      <Route
        path="/system/logs/files"
        component={Logs}
      />

      {/*
        Not Found
      */}

      <Route
        path="*"
        component={NotFound}
      />
    </Switch>
  );
}

AppRoutes.propTypes = {
  app: PropTypes.func.isRequired
};

export default AppRoutes;
