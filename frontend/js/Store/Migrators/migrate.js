import migrateAddComicDefaults from './migrateAddComicDefaults';

export default function migrate(persistedState) {
  migrateAddComicDefaults(persistedState);
}
