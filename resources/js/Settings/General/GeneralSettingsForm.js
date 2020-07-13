import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup } from "reactstrap";
import PageRow from "@/Components/Page/PageRow";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchSettings,
    submitSettings,
    settingsGeneralSelector,
} from "@/Store/Slices/Settings/general";

const GeneralSettingsForm = React.forwardRef((props, formRef) => {
    const dispatch = useDispatch();

    function onSubmit(values) {
        dispatch(submitSettings(values));
    }

    const { isLoading, isPopulated, items } = useSelector(
        settingsGeneralSelector
    );

    useEffect(() => {
        if (!isPopulated) {
            dispatch(fetchSettings());
        }
    }, [dispatch, isPopulated]);

    if (isLoading || !isPopulated) {
        return <LoadingIndicator />;
    }

    return (
        <PageRow>
            <Formik
                innerRef={formRef}
                initialValues={items}
                onSubmit={onSubmit}
            >
                <Form>
                    <FormGroup>
                        <label htmlFor="comicvine_apikey">
                            ComicVine API Key
                        </label>
                        <Field
                            name="comicvine_apikey"
                            type="text"
                            className="form-control"
                        />
                        <ErrorMessage name="comicvine_apikey" />
                    </FormGroup>
                    <FormGroup>
                        <label>Bypass Cache?</label>
                        <Field type="checkbox" name="bypass_cache" />
                        <ErrorMessage name="bypass_cache" />
                    </FormGroup>
                    <FormGroup>
                        <label>Destination Directory</label>
                        <Field
                            type="text"
                            name="destination_dir"
                            className="form-control"
                        />
                        <ErrorMessage name="destination_dir" />
                    </FormGroup>
                </Form>
            </Formik>
        </PageRow>
    );
});

GeneralSettingsForm.displayName = "GeneralSettingsForm";

export default GeneralSettingsForm;
