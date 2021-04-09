import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, sizes } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import FormInputButton from 'Components/Form/FormInputButton';
import FieldSet from 'Components/FieldSet';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import NamingModal from './NamingModal';
import styles from './Naming.css';

class Naming extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNamingModalOpen: false,
      namingModalOptions: null
    };
  }

  //
  // Listeners

  onStandardNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'standardIssueFormat',
        season: true,
        issue: true,
        additional: true
      }
    });
  }

  onDailyNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'dailyIssueFormat',
        season: true,
        issue: true,
        daily: true,
        additional: true
      }
    });
  }

  onAnimeNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'animeIssueFormat',
        season: true,
        issue: true,
        anime: true,
        additional: true
      }
    });
  }

  onComicFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'comicFolderFormat'
      }
    });
  }

  onSeasonFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'seasonFolderFormat',
        season: true
      }
    });
  }

  onSpecialsFolderNamingModalOpenClick = () => {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'specialsFolderFormat',
        season: true
      }
    });
  }

  onNamingModalClose = () => {
    this.setState({ isNamingModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      isFetching,
      error,
      settings,
      hasSettings,
      examples,
      examplesPopulated,
      onInputChange
    } = this.props;

    const {
      isNamingModalOpen,
      namingModalOptions
    } = this.state;

    const renameIssues = hasSettings && settings.renameIssues.value;

    const multiIssueStyleOptions = [
      { key: 0, value: 'Extend', hint: 'S01E01-02-03' },
      { key: 1, value: 'Duplicate', hint: 'S01E01.S01E02' },
      { key: 2, value: 'Repeat', hint: 'S01E01E02E03' },
      { key: 3, value: 'Scene', hint: 'S01E01-E02-E03' },
      { key: 4, value: 'Range', hint: 'S01E01-03' },
      { key: 5, value: 'Prefixed Range', hint: 'S01E01-E03' }
    ];

    const standardIssueFormatHelpTexts = [];
    const standardIssueFormatErrors = [];
    const dailyIssueFormatHelpTexts = [];
    const dailyIssueFormatErrors = [];
    const animeIssueFormatHelpTexts = [];
    const animeIssueFormatErrors = [];
    const comicFolderFormatHelpTexts = [];
    const comicFolderFormatErrors = [];
    const seasonFolderFormatHelpTexts = [];
    const seasonFolderFormatErrors = [];
    const specialsFolderFormatHelpTexts = [];
    const specialsFolderFormatErrors = [];

    if (examplesPopulated) {
      if (examples.singleIssueExample) {
        standardIssueFormatHelpTexts.push(`Single Issue: ${examples.singleIssueExample}`);
      } else {
        standardIssueFormatErrors.push({ message: 'Single Issue: Invalid Format' });
      }

      if (examples.multiIssueExample) {
        standardIssueFormatHelpTexts.push(`Multi Issue: ${examples.multiIssueExample}`);
      } else {
        standardIssueFormatErrors.push({ message: 'Multi Issue: Invalid Format' });
      }

      if (examples.dailyIssueExample) {
        dailyIssueFormatHelpTexts.push(`Example: ${examples.dailyIssueExample}`);
      } else {
        dailyIssueFormatErrors.push({ message: 'Invalid Format' });
      }

      if (examples.animeIssueExample) {
        animeIssueFormatHelpTexts.push(`Single Issue: ${examples.animeIssueExample}`);
      } else {
        animeIssueFormatErrors.push({ message: 'Single Issue: Invalid Format' });
      }

      if (examples.animeMultiIssueExample) {
        animeIssueFormatHelpTexts.push(`Multi Issue: ${examples.animeMultiIssueExample}`);
      } else {
        animeIssueFormatErrors.push({ message: 'Multi Issue: Invalid Format' });
      }

      if (examples.comicFolderExample) {
        comicFolderFormatHelpTexts.push(`Example: ${examples.comicFolderExample}`);
      } else {
        comicFolderFormatErrors.push({ message: 'Invalid Format' });
      }

      if (examples.seasonFolderExample) {
        seasonFolderFormatHelpTexts.push(`Example: ${examples.seasonFolderExample}`);
      } else {
        seasonFolderFormatErrors.push({ message: 'Invalid Format' });
      }

      if (examples.specialsFolderExample) {
        specialsFolderFormatHelpTexts.push(`Example: ${examples.specialsFolderExample}`);
      } else {
        specialsFolderFormatErrors.push({ message: 'Invalid Format' });
      }
    }

    return (
      <FieldSet legend="Issue Naming">
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && error &&
            <div>Unable to load Naming settings</div>
        }

        {
          hasSettings && !isFetching && !error &&
            <Form>
              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>Rename Issues</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="renameIssues"
                  helpText="Paperback will use the existing file name if renaming is disabled"
                  onChange={onInputChange}
                  {...settings.renameIssues}
                />
              </FormGroup>

              <FormGroup size={sizes.MEDIUM}>
                <FormLabel>Replace Illegal Characters</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="replaceIllegalCharacters"
                  helpText="Replace illegal characters. If unchecked, Paperback will remove them instead"
                  onChange={onInputChange}
                  {...settings.replaceIllegalCharacters}
                />
              </FormGroup>

              {
                renameIssues &&
                  <div>
                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Standard Issue Format</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="standardIssueFormat"
                        buttons={<FormInputButton onPress={this.onStandardNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.standardIssueFormat}
                        helpTexts={standardIssueFormatHelpTexts}
                        errors={[...standardIssueFormatErrors, ...settings.standardIssueFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Daily Issue Format</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="dailyIssueFormat"
                        buttons={<FormInputButton onPress={this.onDailyNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.dailyIssueFormat}
                        helpTexts={dailyIssueFormatHelpTexts}
                        errors={[...dailyIssueFormatErrors, ...settings.dailyIssueFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Anime Issue Format</FormLabel>

                      <FormInputGroup
                        inputClassName={styles.namingInput}
                        type={inputTypes.TEXT}
                        name="animeIssueFormat"
                        buttons={<FormInputButton onPress={this.onAnimeNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.animeIssueFormat}
                        helpTexts={animeIssueFormatHelpTexts}
                        errors={[...animeIssueFormatErrors, ...settings.animeIssueFormat.errors]}
                      />
                    </FormGroup>
                  </div>
              }

              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>Comic Folder Format</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="comicFolderFormat"
                  buttons={<FormInputButton onPress={this.onComicFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.comicFolderFormat}
                  helpTexts={['Used when adding a new comic or moving comic via the comic editor', ...comicFolderFormatHelpTexts]}
                  errors={[...comicFolderFormatErrors, ...settings.comicFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Season Folder Format</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="seasonFolderFormat"
                  buttons={<FormInputButton onPress={this.onSeasonFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.seasonFolderFormat}
                  helpTexts={seasonFolderFormatHelpTexts}
                  errors={[...seasonFolderFormatErrors, ...settings.seasonFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup
                advancedSettings={advancedSettings}
                isAdvanced={true}
              >
                <FormLabel>Specials Folder Format</FormLabel>

                <FormInputGroup
                  inputClassName={styles.namingInput}
                  type={inputTypes.TEXT}
                  name="specialsFolderFormat"
                  buttons={<FormInputButton onPress={this.onSpecialsFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.specialsFolderFormat}
                  helpTexts={specialsFolderFormatHelpTexts}
                  errors={[...specialsFolderFormatErrors, ...settings.specialsFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Multi-Issue Style</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="multiIssueStyle"
                  values={multiIssueStyleOptions}
                  onChange={onInputChange}
                  {...settings.multiIssueStyle}
                />
              </FormGroup>

              {
                namingModalOptions &&
                  <NamingModal
                    isOpen={isNamingModalOpen}
                    advancedSettings={advancedSettings}
                    {...namingModalOptions}
                    value={settings[namingModalOptions.name].value}
                    onInputChange={onInputChange}
                    onModalClose={this.onNamingModalClose}
                  />
              }
            </Form>
        }
      </FieldSet>
    );
  }

}

Naming.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  examples: PropTypes.object.isRequired,
  examplesPopulated: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Naming;
