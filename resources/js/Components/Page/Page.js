import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHeader from '@/Components/Page/PageHeader'

class Page extends Component
{
    render() {
        return (
            <>
                <PageHeader />
                <div className="page container bg-light rounded-lg py-3 mt-2">
                    {this.props.children}
                </div>
            </>
        );
    }
}

Page.propTypes = {
    hasError: PropTypes.bool,
    isPopulated: PropTypes.bool,
    children: PropTypes.node,
}

export default Page;
