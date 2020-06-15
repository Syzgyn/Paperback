import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap';

class IndexerEditModalContent extends Component
{
    render() {
        const {
            implementation,
            formRef,
        } = this.props;

        const {
            enableSearch,
            fields,
        } = implementation;

        const name = "";

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
    implementation: PropTypes.object.isRequired,
    formRef: PropTypes.object.isRequired,
}

export default IndexerEditModalContent
