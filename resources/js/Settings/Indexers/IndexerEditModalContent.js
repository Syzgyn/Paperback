import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap';

class IndexerEditModalContent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            //implementation: props.implementation || props.indexer.schema || {}
        };
    }

    render() {
        const {
            formRef,
            indexer,
        } = this.props;

        let schema = null;
        if (indexer) {
            schema = this.props.indexer.schema;

            //Populate default values
            schema.name = indexer.name;
            schema.fields.forEach((item, index) => {
                schema.fields[index].value = indexer.settings[item.name];
            });
        } else {
            schema = this.props.implementation;
        }

        const {
            enableSearch,
            fields,
            name,
        } = schema;

        return (
            <Form onSubmit={this.onFormSubmit} id="addForm" innerRef={formRef}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" placeholder="Indexer Name" defaultValue={name} />
                </FormGroup>
                <FormGroup>
                    <Label>Enable Search</Label>
                    <Input type="checkbox" name="enableSearch" defaultChecked={enableSearch} />
                </FormGroup>
                {fields.map((field) => 
                    <FormGroup key={field.name}>
                        <Label>{field.label}</Label>
                        <Input type={field.type} name={field.name} defaultValue={field.value}/> 
                    </FormGroup>
                )}
            </Form>
        );
    }
}

IndexerEditModalContent.propTypes = {
    implementation: PropTypes.object,
    indexer: PropTypes.object,
    formRef: PropTypes.object.isRequired,
}

export default IndexerEditModalContent
