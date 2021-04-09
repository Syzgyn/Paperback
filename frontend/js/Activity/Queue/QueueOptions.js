import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { inputTypes } from 'Helpers/Props';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

class QueueOptions extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      includeUnknownComicItems: props.includeUnknownComicItems
    };
  }

  componentDidUpdate(prevProps) {
    const {
      includeUnknownComicItems
    } = this.props;

    if (includeUnknownComicItems !== prevProps.includeUnknownComicItems) {
      this.setState({
        includeUnknownComicItems
      });
    }
  }

  //
  // Listeners

  onOptionChange = ({ name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.onOptionChange({
        [name]: value
      });
    });
  }

  //
  // Render

  render() {
    const {
      includeUnknownComicItems
    } = this.state;

    return (
      <Fragment>
        <FormGroup>
          <FormLabel>Show Unknown Comic Items</FormLabel>

          <FormInputGroup
            type={inputTypes.CHECK}
            name="includeUnknownComicItems"
            value={includeUnknownComicItems}
            helpText="Show items without a comic in the queue, this could include removed comic, movies or anything else in Paperback's category"
            onChange={this.onOptionChange}
          />
        </FormGroup>
      </Fragment>
    );
  }
}

QueueOptions.propTypes = {
  includeUnknownComicItems: PropTypes.bool.isRequired,
  onOptionChange: PropTypes.func.isRequired
};

export default QueueOptions;
