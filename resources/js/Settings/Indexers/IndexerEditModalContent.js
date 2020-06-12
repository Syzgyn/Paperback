import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';


function IndexerEditModalContent(props) {
    const {
        indexer,
    } = props;

    const {
        name,
        enableSearch,
        fields,
    } = indexer;

    return (
        <Form>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" placeholder="Indexer Name" value={name} />
            </FormGroup>
            <FormGroup>
                <Label>Enable Search</Label>
                <CustomInput type="switch" name="enableSearch" id="enableSearchSwitch" value={enableSearch} />
            </FormGroup>
            {fields.map((field) => {
                <FormGroup key={field.name}>
                    <Label>{field.label}</Label>
                    <Input type="text" value={field.value} />
                </FormGroup>
            })}
        </Form>
    );
}

IndexerEditModalContent.propTypes = {
    indexer: PropTypes.object.isRequired,
}

export default IndexerEditModalContent
