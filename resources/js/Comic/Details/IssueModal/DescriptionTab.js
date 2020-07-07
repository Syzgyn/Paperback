import React, { Component } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import PageRow from "@/Components/Page/PageRow";

class DescriptionTab extends Component {
    render() {
        const { description } = this.props;

        return (
            <PageRow>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description, {
                            ADD_ATTR: ["target"],
                        }),
                    }}
                />
            </PageRow>
        );
    }
}

DescriptionTab.propTypes = {
    description: PropTypes.string,
};

export default DescriptionTab;
