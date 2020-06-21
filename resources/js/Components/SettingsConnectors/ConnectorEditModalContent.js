import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap';

class ConnectorEditModalContent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            //implementation: props.implementation || props.item.schema || {}
        };
    }

    render() {
        const {
            formRef,
            item,
        } = this.props;

        let schema = null;
        if (item) {
            schema = this.props.item.schema;

            //Populate default values
            schema.name = item.name;
            schema.fields.forEach((field, index) => {
                schema.fields[index].value = item.settings[field.name];
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
                    <Input type="text" name="name" placeholder="Connector Name" defaultValue={name} />
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

ConnectorEditModalContent.propTypes = {
    implementation: PropTypes.object,
    item: PropTypes.object,
    formRef: PropTypes.object.isRequired,
}

export default ConnectorEditModalContent
