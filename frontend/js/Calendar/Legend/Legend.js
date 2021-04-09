import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import LegendItem from './LegendItem';
import LegendIconItem from './LegendIconItem';
import styles from './Legend.css';

function Legend(props) {
  const {
    view,
    showFinaleIcon,
    showSpecialIcon,
    showCutoffUnmetIcon,
    fullColorEvents,
    colorImpairedMode
  } = props;

  const iconsToShow = [];
  const isAgendaView = view === 'agenda';

  if (showFinaleIcon) {
    iconsToShow.push(
      <LegendIconItem
        name="Finale"
        icon={icons.INFO}
        kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
        tooltip="Comic or season finale"
      />
    );
  }

  if (showSpecialIcon) {
    iconsToShow.push(
      <LegendIconItem
        name="Special"
        icon={icons.INFO}
        kind={kinds.PINK}
        darken={fullColorEvents}
        tooltip="Special issue"
      />
    );
  }

  if (showCutoffUnmetIcon) {
    iconsToShow.push(
      <LegendIconItem
        name="Cutoff Not Met"
        icon={icons.ISSUE_FILE}
        kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
        tooltip="Quality or language cutoff has not been met"
      />
    );
  }

  return (
    <div className={styles.legend}>
      <div>
        <LegendItem
          status="unaired"
          tooltip="Issue hasn't aired yet"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="unmonitored"
          tooltip="Issue is unmonitored"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendItem
          status="onAir"
          name="On Air"
          tooltip="Issue is currently airing"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="missing"
          tooltip="Issue has aired and is missing from disk"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendItem
          status="downloading"
          tooltip="Issue is currently downloading"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />

        <LegendItem
          status="downloaded"
          tooltip="Issue was downloaded and sorted"
          isAgendaView={isAgendaView}
          fullColorEvents={fullColorEvents}
          colorImpairedMode={colorImpairedMode}
        />
      </div>

      <div>
        <LegendIconItem
          name="Premiere"
          icon={icons.INFO}
          kind={kinds.INFO}
          darken={true}
          tooltip="Comic or season premiere"
        />

        {iconsToShow[0]}
      </div>

      {
        iconsToShow.length > 1 &&
          <div>
            {iconsToShow[1]}
            {iconsToShow[2]}
          </div>
      }
    </div>
  );
}

Legend.propTypes = {
  view: PropTypes.string.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  showSpecialIcon: PropTypes.bool.isRequired,
  showCutoffUnmetIcon: PropTypes.bool.isRequired,
  fullColorEvents: PropTypes.bool.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired
};

export default Legend;
