import { get } from 'lodash';
import monitorOptions from 'Utilities/Comic/monitorOptions';

export default function migrateAddComicDefaults(persistedState) {
  const monitor = get(persistedState, 'addComic.defaults.monitor');

  if (!monitor) {
    return;
  }

  if (!monitorOptions.find((option) => option.key === monitor)) {
    persistedState.addComic.defaults.monitor = monitorOptions[0].key;
  }
}
