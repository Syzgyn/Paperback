import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

class ConnectorEditModalContent extends Component {
    render() {
        const { formRef, item } = this.props;

        let schema = null;
        if (item) {
            schema = this.props.item.schema;
        } else {
            schema = this.props.implementation;
        }

        const { fields, initialValues } = schema;

        console.log(initialValues);

        return (
            <Formik initialValues={initialValues} innerRef={formRef}>
                <Form id="editForm" className="horizontal-form">
                    {fields.map((field) => (
                        <FormGroup className="row" key={field.name}>
                            <Label className="col-sm-3">{field.label}</Label>
                            <div className="col-sm-5">
                                {console.log(field.name)}
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    className="form-control"
                                />
                                <ErrorMessage name={field.name} />
                            </div>
                        </FormGroup>
                    ))}
                </Form>
            </Formik>
        );
    }
}

ConnectorEditModalContent.propTypes = {
    implementation: PropTypes.object,
    item: PropTypes.object,
    formRef: PropTypes.object.isRequired,
};

export default ConnectorEditModalContent;
