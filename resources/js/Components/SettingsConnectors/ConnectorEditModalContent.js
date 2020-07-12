import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { getLocation } from "connected-react-router";
import { settingsIndexersSelector } from "@/Store/Slices/Settings/indexers";
import { settingsDownloadersSelector } from "@/Store/Slices/Settings/downloaders";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";

const ConnectorEditModalContent = React.forwardRef((props, formRef) => {
    const { item } = props;
    const { pathname } = useSelector(getLocation);

    let selector;

    if (pathname === "/settings/indexers") {
        selector = settingsIndexersSelector;
    } else {
        selector = settingsDownloadersSelector;
    }

    const{ schema:allSchema, selectedSchema } = useSelector(selector);

    let schema = null;
    if (item) {
        schema = item.schema;
    } else {
        schema = allSchema.find(item => item.type === selectedSchema )
    }

    if (!schema) {
        return <LoadingIndicator />
    }

    const { fields, initialValues } = schema;

    return (
        <Formik initialValues={initialValues} innerRef={formRef}>
            <Form id="editForm" className="horizontal-form">
                {fields.map((field) => (
                    <FormGroup className="row" key={field.name}>
                        <Label className="col-sm-3">{field.label}</Label>
                        <div className="col-sm-5">
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
});

ConnectorEditModalContent.displayName = "ConnectorEditModalContent";

ConnectorEditModalContent.propTypes = {
    item: PropTypes.object,
};

export default ConnectorEditModalContent;
