import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import RootFoldersConnector from 'RootFolder/RootFoldersConnector';
import NamingConnector from './Naming/NamingConnector';
import AddRootFolderConnector from './RootFolder/AddRootFolderConnector';

const issueTitleRequiredOptions = [
  { key: 'always', value: 'Always' },
  { key: 'bulkSeasonReleases', value: 'Only for Bulk Season Releases' },
  { key: 'never', value: 'Never' }
];

const rescanAfterRefreshOptions = [
  { key: 'always', value: 'Always' },
  { key: 'afterManual', value: 'After Manual Refresh' },
  { key: 'never', value: 'Never' }
];

const downloadPropersAndRepacksOptions = [
  { key: 'preferAndUpgrade', value: 'Prefer and Upgrade' },
  { key: 'doNotUpgrade', value: 'Do not Upgrade Automatically' },
  { key: 'doNotPrefer', value: 'Do not Prefer' }
];

const fileDateOptions = [
  { key: 'none', value: 'None' },
  { key: 'localReleaseDate', value: 'Local Air Date' },
  { key: 'utcReleaseDate', value: 'UTC Air Date' }
];

class MediaManagement extends Component {

  //
  // Render

  render() {
    const {
      advancedSettings,
      isFetching,
      error,
      settings,
      hasSettings,
      isMono,
      onInputChange,
      onSavePress,
      ...otherProps
    } = this.props;

    return (
      <PageContent title="Media Management Settings">
        <SettingsToolbarConnector
          advancedSettings={advancedSettings}
          {...otherProps}
          onSavePress={onSavePress}
        />

        <PageContentBody>
          <NamingConnector />

          {
            isFetching &&
              <FieldSet legend="Naming Settings">
                <LoadingIndicator />
              </FieldSet>
          }

          {
            !isFetching && error &&
            <FieldSet legend="Naming Settings">
              <div>Unable to load Media Management settings</div>
            </FieldSet>
          }

          {
            hasSettings && !isFetching && !error &&
              <Form
                id="mediaManagementSettings"
                {...otherProps}
              >
                {
                  advancedSettings &&
                    <FieldSet legend="Folders">
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>Create empty comic folders</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="createEmptyComicFolders"
                          helpText="Create missing comic folders during disk scan"
                          onChange={onInputChange}
                          {...settings.createEmptyComicFolders}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>Delete empty folders</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="deleteEmptyFolders"
                          helpText="Delete empty comic and season folders during disk scan and when issue files are deleted"
                          onChange={onInputChange}
                          {...settings.deleteEmptyFolders}
                        />
                      </FormGroup>
                    </FieldSet>
                }

                {
                  advancedSettings &&
                    <FieldSet
                      legend="Importing"
                    >
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.SMALL}
                      >
                        <FormLabel>Issue Title Required</FormLabel>

                        <FormInputGroup
                          type={inputTypes.SELECT}
                          name="issueTitleRequired"
                          helpText="Prevent importing for up to 24 hours if the issue title is in the naming format and the issue title is TBA"
                          values={issueTitleRequiredOptions}
                          onChange={onInputChange}
                          {...settings.issueTitleRequired}
                        />
                      </FormGroup>

                      {
                        isMono &&
                          <FormGroup
                            advancedSettings={advancedSettings}
                            isAdvanced={true}
                            size={sizes.MEDIUM}
                          >
                            <FormLabel>Skip Free Space Check</FormLabel>

                            <FormInputGroup
                              type={inputTypes.CHECK}
                              name="skipFreeSpaceCheckWhenImporting"
                              helpText="Use when Paperback is unable to detect free space from your comic root folder"
                              onChange={onInputChange}
                              {...settings.skipFreeSpaceCheckWhenImporting}
                            />
                          </FormGroup>
                      }

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>Minimum Free Space</FormLabel>

                        <FormInputGroup
                          type={inputTypes.NUMBER}
                          unit='MB'
                          name="minimumFreeSpaceWhenImporting"
                          helpText="Prevent import if it would leave less than this amount of disk space available"
                          onChange={onInputChange}
                          {...settings.minimumFreeSpaceWhenImporting}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>Use Hardlinks instead of Copy</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="copyUsingHardlinks"
                          helpText="Use Hardlinks when trying to copy files from torrents that are still being seeded"
                          helpTextWarning="Occasionally, file locks may prevent renaming files that are being seeded. You may temporarily disable seeding and use Paperback's rename function as a work around."
                          onChange={onInputChange}
                          {...settings.copyUsingHardlinks}
                        />
                      </FormGroup>

                      <FormGroup size={sizes.MEDIUM}>
                        <FormLabel>Import Extra Files</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="importExtraFiles"
                          helpText="Import matching extra files (subtitles, nfo, etc) after importing an issue file"
                          onChange={onInputChange}
                          {...settings.importExtraFiles}
                        />
                      </FormGroup>

                      {
                        settings.importExtraFiles.value &&
                          <FormGroup
                            advancedSettings={advancedSettings}
                            isAdvanced={true}
                          >
                            <FormLabel>Import Extra Files</FormLabel>

                            <FormInputGroup
                              type={inputTypes.TEXT}
                              name="extraFileExtensions"
                              helpTexts={[
                                'Comma separated list of extra files to import (.nfo will be imported as .nfo-orig)',
                                'Examples: ".sub, .nfo" or "sub,nfo"'
                              ]}
                              onChange={onInputChange}
                              {...settings.extraFileExtensions}
                            />
                          </FormGroup>
                      }
                    </FieldSet>
                }

                <FieldSet
                  legend="File Management"
                >
                  <FormGroup size={sizes.MEDIUM}>
                    <FormLabel>Unmonitor Deleted Issues</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="autoUnmonitorPreviouslyDownloadedIssues"
                      helpText="Issues deleted from disk are automatically unmonitored in Paperback"
                      onChange={onInputChange}
                      {...settings.autoUnmonitorPreviouslyDownloadedIssues}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                    size={sizes.MEDIUM}
                  >
                    <FormLabel>Propers and Repacks</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="downloadPropersAndRepacks"
                      helpTexts={[
                        'Whether or not to automatically upgrade to Propers/Repacks',
                        'Use \'Do not Prefer\' to sort by preferred word score over propers/repacks'
                      ]}
                      helpTextWarning={
                        settings.downloadPropersAndRepacks.value === 'doNotPrefer' ?
                          'Use preferred words for automatic upgrades to propers/repacks' :
                          undefined
                      }
                      values={downloadPropersAndRepacksOptions}
                      onChange={onInputChange}
                      {...settings.downloadPropersAndRepacks}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                    size={sizes.MEDIUM}
                  >
                    <FormLabel>Analyse video files</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="enableMediaInfo"
                      helpText="Extract video information such as resolution, runtime and codec information from files. This requires Paperback to read parts of the file which may cause high disk or network activity during scans."
                      onChange={onInputChange}
                      {...settings.enableMediaInfo}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Rescan Comic Folder after Refresh</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="rescanAfterRefresh"
                      helpText="Rescan the comic folder after refreshing the comic"
                      helpTextWarning="Paperback will not automatically detect changes to files when not set to 'Always'"
                      values={rescanAfterRefreshOptions}
                      onChange={onInputChange}
                      {...settings.rescanAfterRefresh}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Change File Date</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="fileDate"
                      helpText="Change file date on import/rescan"
                      values={fileDateOptions}
                      onChange={onInputChange}
                      {...settings.fileDate}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Recycling Bin</FormLabel>

                    <FormInputGroup
                      type={inputTypes.PATH}
                      name="recycleBin"
                      helpText="Issue files will go here when deleted instead of being permanently deleted"
                      onChange={onInputChange}
                      {...settings.recycleBin}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Recycling Bin Cleanup</FormLabel>

                    <FormInputGroup
                      type={inputTypes.NUMBER}
                      name="recycleBinCleanupDays"
                      helpText="Set to 0 to disable automatic cleanup"
                      helpTextWarning="Files in the recycle bin older than the selected number of days will be cleaned up automatically"
                      min={0}
                      onChange={onInputChange}
                      {...settings.recycleBinCleanupDays}
                    />
                  </FormGroup>
                </FieldSet>

                {
                  advancedSettings && isMono &&
                    <FieldSet
                      legend="Permissions"
                    >
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                        size={sizes.MEDIUM}
                      >
                        <FormLabel>Set Permissions</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="setPermissionsLinux"
                          helpText="Should chmod be run when files are imported/renamed?"
                          helpTextWarning="If you're unsure what these settings do, do not alter them."
                          onChange={onInputChange}
                          {...settings.setPermissionsLinux}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>chmod Folder</FormLabel>

                        <FormInputGroup
                          type={inputTypes.UMASK}
                          name="chmodFolder"
                          helpText="Octal, applied during import/rename to media folders and files (without execute bits)"
                          helpTextWarning="This only works if the user running paperback is the owner of the file. It's better to ensure the download client sets the permissions properly."
                          onChange={onInputChange}
                          {...settings.chmodFolder}
                        />
                      </FormGroup>

                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>chown Group</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="chownGroup"
                          helpText="Group name or gid. Use gid for remote file systems."
                          helpTextWarning="This only works if the user running paperback is the owner of the file. It's better to ensure the download client uses the same group as paperback."
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.chownGroup}
                        />
                      </FormGroup>
                    </FieldSet>
                }
              </Form>
          }

          <FieldSet legend="Root Folders">
            <RootFoldersConnector />
            <AddRootFolderConnector />
          </FieldSet>
        </PageContentBody>
      </PageContent>
    );
  }

}

MediaManagement.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  isMono: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default MediaManagement;