import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import FieldSet from 'Components/FieldSet';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItemTitle from 'Components/DescriptionList/DescriptionListItemTitle';
import DescriptionListItemDescription from 'Components/DescriptionList/DescriptionListItemDescription';

class MoreInfo extends Component {

  //
  // Render

  render() {
    return (
      <FieldSet legend="More Info">
        <DescriptionList>
          <DescriptionListItemTitle>Home page</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://paperback.tv/">paperback.tv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Wiki</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://wiki.servarr.com/Paperback">wiki.servarr.com/Paperback</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Forums</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://forums.paperback.tv/">forums.paperback.tv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Twitter</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://paperback.tv/">@paperbacktv</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Discord</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://discord.gg/73QUuf3bgA">discord.gg/73QUuf3bgA</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>IRC</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="irc://irc.freenode.net/#paperback">#paperback on Freenode</Link>
          </DescriptionListItemDescription>
          <DescriptionListItemDescription>
            <Link to="http://webchat.freenode.net/?channels=#paperback">Freenode webchat</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Donations</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://paperback.tv/donate">paperback.tv/donate</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Source</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://github.com/Paperback/Paperback/">github.com/Paperback/Paperback</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Feature Requests</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://forums.paperback.tv/">forums.paperback.tv</Link>
          </DescriptionListItemDescription>
          <DescriptionListItemDescription>
            <Link to="https://github.com/Paperback/Paperback/issues">github.com/Paperback/Paperback/issues</Link>
          </DescriptionListItemDescription>

        </DescriptionList>
      </FieldSet>
    );
  }
}

MoreInfo.propTypes = {

};

export default MoreInfo;
