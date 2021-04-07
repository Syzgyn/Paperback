import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactMeasure from 'react-measure';

const Measure = (props) => {
    useEffect(() => {
        const onMeasure = _.debounce((payload) => {
            props.onMeasure(payload);
        }, 250, { leading: true, trailing: false })

        return () => {
            onMeasure.cancel();
        }
    });

    //
    // Render

    return (
        <ReactMeasure
            {...props}
        />
    );
}

Measure.propTypes = {
    onMeasure: PropTypes.func.isRequired
};

export default Measure;
