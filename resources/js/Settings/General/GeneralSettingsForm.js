import React, {Component} from 'react'
import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {toast} from 'react-toastify'
import PageRow from '@/Components/Page/PageRow'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'

class GeneralSettingsForm extends Component
{
    constructor() {
        super();
        this.state = {
            loading: true,
            settings: {},
        }

        this.formRef = React.createRef();
    }

    componentDidMount() {
        axios.get('/api/settings/general')
            .then(results => {
                this.setState({loading: false, settings: results.data})
            });
    }

    onSubmit(values) {
        axios.post('/api/settings', {general: values})
            .then(results => {
                if (results.data === 1) {
                    toast.dark("Settings Saved");
                }
                else
                {
                    toast.dark("Error saving settings");
                }
            });
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />
        }

        return (
            <PageRow>
                <Formik
                    innerRef={this.formRef}
                    initialValues={this.state.settings}
                    onSubmit={this.onSubmit}
                >
                    <Form>
                        <label htmlFor="comicvine_apikey">ComicVine API Key</label>
                        <Field name="comicvine_apikey" type="text" className="form-control" />
                        <ErrorMessage name="comicvine_apikey" />
                        <label>Bypass Cache?</label>
                        <Field type="checkbox" name="bypass_cache" />
                        <ErrorMessage name="bypass_cache" />
                    </Form>
                </Formik>
            </PageRow>
        )
    }
}

export default GeneralSettingsForm

