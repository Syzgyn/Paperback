import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { repopulatePage } from 'Utilities/pagePopulator';
import titleCase from 'Utilities/String/titleCase';
import { fetchCommands, updateCommand, finishCommand } from 'Store/Actions/commandActions';
import { setAppValue, setVersion } from 'Store/Actions/appActions';
import { update, updateItem, removeItem } from 'Store/Actions/baseActions';
import { fetchComic } from 'Store/Actions/comicActions';
import { fetchHealth } from 'Store/Actions/systemActions';
import { fetchQueue, fetchQueueDetails } from 'Store/Actions/queueActions';
import { fetchRootFolders } from 'Store/Actions/rootFolderActions';
import { fetchTags, fetchTagDetails } from 'Store/Actions/tagActions';

function getState(status) {
  switch (status) {
    case 0:
      return 'connecting';
    case 1:
      return 'connected';
    case 2:
      return 'closed';
    default:
      throw new Error(`invalid status ${status}`);
  }
}

function isAppDisconnected(disconnectedTime) {
  if (!disconnectedTime) {
    return false;
  }

  return Math.floor(new Date().getTime() / 1000) - disconnectedTime > 180;
}

function getHandlerName(name) {
  name = titleCase(name);
  name = name.replace('/', '');

  return `handle${name}`;
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.app.isReconnecting,
    (state) => state.app.isDisconnected,
    (state) => state.queue.paged.isPopulated,
    (isReconnecting, isDisconnected, isQueuePopulated) => {
      return {
        isReconnecting,
        isDisconnected,
        isQueuePopulated
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchFetchCommands: fetchCommands,
  dispatchUpdateCommand: updateCommand,
  dispatchFinishCommand: finishCommand,
  dispatchSetAppValue: setAppValue,
  dispatchSetVersion: setVersion,
  dispatchUpdate: update,
  dispatchUpdateItem: updateItem,
  dispatchRemoveItem: removeItem,
  dispatchFetchHealth: fetchHealth,
  dispatchFetchQueue: fetchQueue,
  dispatchFetchQueueDetails: fetchQueueDetails,
  dispatchFetchRootFolders: fetchRootFolders,
  dispatchFetchComic: fetchComic,
  dispatchFetchTags: fetchTags,
  dispatchFetchTagDetails: fetchTagDetails
};

class EventSourceConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.eventsource = null;
    this.disconnectedTime = null;
  }

  componentDidMount() {
    console.log('Connecting Server-Send Events');

    const url = `${window.Paperback.urlBase}/api/system/events`;

    this.eventsource = new EventSource(url);

    this.eventsource.onopen = this.onConnected;
    this.eventsource.onmessage = this.onReceived;
    this.eventsource.onerror = this.onDisconnected;
  }

  componentWillUnmount() {
    this.eventsource.close();
    this.eventsource = null;
  }

  //
  // Control

  handleMessage = (message) => {
    const {
      name,
      body
    } = message;

    const handler = this[getHandlerName(name)];

    if (handler) {
      handler(body);
      return;
    }

    console.error(`EventSource: Unable to find handler for ${event}`);
  }

  handleCalendar = (body) => {
    if (body.action === 'updated') {
      this.props.dispatchUpdateItem({
        section: 'calendar',
        updateOnly: true,
        ...body.resource
      });
    }
  }

  handleCommand = (body) => {
    if (body.action === 'sync') {
      this.props.dispatchFetchCommands();
      return;
    }

    const resource = body.resource;
    const status = resource.status;

    // Both sucessful and failed commands need to be
    // completed, otherwise they spin until they timeout.

    if (status === 'completed' || status === 'failed') {
      this.props.dispatchFinishCommand(resource);
    } else {
      this.props.dispatchUpdateCommand(resource);
    }
  }

  handleIssue = (body) => {
    if (body.action === 'updated') {
      this.props.dispatchUpdateItem({
        section: 'issues',
        updateOnly: true,
        ...body.resource
      });
    }
  }

  handleIssuefile = (body) => {
    const section = 'issueFiles';

    if (body.action === 'updated') {
      this.props.dispatchUpdateItem({ section, ...body.resource });

      // Repopulate the page to handle recently imported file
      repopulatePage('issueFileUpdated');
    } else if (body.action === 'deleted') {
      this.props.dispatchRemoveItem({ section, id: body.resource.id });
    }
  }

  handleHealth = () => {
    this.props.dispatchFetchHealth();
  }

  handleComic = (body) => {
    const action = body.action;
    const section = 'comic';

    if (action === 'updated') {
      this.props.dispatchUpdateItem({ section, ...body.resource });
    } else if (action === 'deleted') {
      this.props.dispatchRemoveItem({ section, id: body.resource.id });
    }
  }

  handleQueue = () => {
    if (this.props.isQueuePopulated) {
      this.props.dispatchFetchQueue();
    }
  }

  handleQueueDetails = () => {
    this.props.dispatchFetchQueueDetails();
  }

  handleQueueStatus = (body) => {
    this.props.dispatchUpdate({ section: 'queue.status', data: body.resource });
  }

  handleVersion = (body) => {
    const version = body.Version;

    this.props.dispatchSetVersion({ version });
  }

  handleWantedCutoff = (body) => {
    if (body.action === 'updated') {
      this.props.dispatchUpdateItem({
        section: 'cutoffUnmet',
        updateOnly: true,
        ...body.resource
      });
    }
  }

  handleWantedMissing = (body) => {
    if (body.action === 'updated') {
      this.props.dispatchUpdateItem({
        section: 'missing',
        updateOnly: true,
        ...body.resource
      });
    }
  }

  handleSystemTask = () => {
    this.props.dispatchFetchCommands();
  }

  handleRootfolder = () => {
    this.props.dispatchFetchRootFolders();
  }

  handleTag = (body) => {
    if (body.action === 'sync') {
      this.props.dispatchFetchTags();
      this.props.dispatchFetchTagDetails();
      return;
    }
  }

  //
  // Listeners

  onConnected = () => {
    console.log("SSE: Connected");

    // Clear disconnected time
    this.disconnectedTime = null;

    const {
      dispatchFetchCommands,
      dispatchFetchComic,
      dispatchSetAppValue
    } = this.props;

    // Repopulate the page (if a repopulator is set) to ensure things
    // are in sync after reconnecting.

    if (this.props.isReconnecting || this.props.isDisconnected) {
      dispatchFetchComic();
      dispatchFetchCommands();
      repopulatePage();
    }

    dispatchSetAppValue({
      isConnected: true,
      isReconnecting: false,
      isDisconnected: false,
      isRestarting: false
    });
  }

  onReceived = (event) => {
    const message = JSON.parse(event.data);
    console.debug('SSE: received', message.name, message.body);

    this.handleMessage(message);
  }

  onDisconnected = () => {
    if (window.Paperback.unloading) {
      return;
    }

    if (!this.disconnectedTime) {
      this.disconnectedTime = Math.floor(new Date().getTime() / 1000);
    }

    this.props.dispatchSetAppValue({
      isConnected: false,
      isReconnecting: true,
      isDisconnected: isAppDisconnected(this.disconnectedTime)
    });
  }

  //
  // Render

  render() {
    return null;
  }
}

EventSourceConnector.propTypes = {
  isReconnecting: PropTypes.bool.isRequired,
  isDisconnected: PropTypes.bool.isRequired,
  isQueuePopulated: PropTypes.bool.isRequired,
  dispatchFetchCommands: PropTypes.func.isRequired,
  dispatchUpdateCommand: PropTypes.func.isRequired,
  dispatchFinishCommand: PropTypes.func.isRequired,
  dispatchSetAppValue: PropTypes.func.isRequired,
  dispatchSetVersion: PropTypes.func.isRequired,
  dispatchUpdate: PropTypes.func.isRequired,
  dispatchUpdateItem: PropTypes.func.isRequired,
  dispatchRemoveItem: PropTypes.func.isRequired,
  dispatchFetchHealth: PropTypes.func.isRequired,
  dispatchFetchQueue: PropTypes.func.isRequired,
  dispatchFetchQueueDetails: PropTypes.func.isRequired,
  dispatchFetchRootFolders: PropTypes.func.isRequired,
  dispatchFetchComic: PropTypes.func.isRequired,
  dispatchFetchTags: PropTypes.func.isRequired,
  dispatchFetchTagDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EventSourceConnector);
