
import { icons } from 'Helpers/Props';

export function getComicStatusDetails(status) {

  let statusDetails = {
    icon: icons.COMIC_CONTINUING,
    title: 'Continuing',
    message: 'More episodes/another season is expected'
  };

  if (status === 'deleted') {
    statusDetails = {
      icon: icons.COMIC_DELETED,
      title: 'Deleted',
      message: 'Comic was deleted from TheTVDB'
    };
  } else if (status === 'ended') {
    statusDetails = {
      icon: icons.COMIC_ENDED,
      title: 'Ended',
      message: 'No additional episodes or seasons are expected'
    };
  } else if (status === 'upcoming') {
    statusDetails = {
      icon: icons.COMIC_CONTINUING,
      title: 'Upcoming',
      message: 'Comic has been announced but no exact air date yet'
    };
  }

  return statusDetails;
}
