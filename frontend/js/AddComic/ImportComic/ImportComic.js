import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Switch from 'Components/Router/Switch';
import ImportComicSelectFolderConnector from 'AddComic/ImportComic/SelectFolder/ImportComicSelectFolderConnector';
import ImportComicConnector from 'AddComic/ImportComic/Import/ImportComicConnector';

class ImportComic extends Component {

  //
  // Render

  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path="/add/import"
          component={ImportComicSelectFolderConnector}
        />

        <Route
          path="/add/import/:rootFolderId"
          component={ImportComicConnector}
        />
      </Switch>
    );
  }
}

export default ImportComic;
