import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import { Button } from "reactstrap";
import ComicBadge from "@/Components/ComicBadge";
import ComicDescriptionModal from "./ComicDescriptionModal";
import MonitoredIcon from "@/Components/MonitoredIcon";
import ComicSettings from "@/Comic/Details/ComicSettings";

class ComicItem extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.clickReadMore = this.clickReadMore.bind(this);
    }

    toggleModal() {
        this.setState({ modal: !this.state.modal });
    }

    clickReadMore(e) {
     // `target` is the element the click was on (the div we hooked or an element
     // with in it), `currentTarget` is the div we hooked the event on
     const el = e.target.closest("button");
     console.log(this);
     if (el && e.currentTarget.contains(el)) {
        this.toggleModal();
     }
    }

    descriptionModal() {
        if (this.props.descriptionIsTruncated) {
            return (
                <>
                    <ComicDescriptionModal
                        name={this.props.name}
                        description={this.props.description}
                        toggleModal={this.toggleModal}
                        modal={this.state.modal}
                    />
                </>
            );
        }

        return null;
    }

    render() {
        const {
            numIssues,
            startYear,
            publisher,
            image,
            name,
            classes,
        } = this.props;

        let displayDescription = this.props.displayDescription;
        if (this.props.descriptionIsTruncated && displayDescription.substring(displayDescription.length - 4) == '</p>') {
            displayDescription = displayDescription.substring(0, displayDescription.length - 4) + '<button type="button" class="btn btn-secondary pt-0 pb-0 ml-2">Read More</button>';
        }

        return (
            <div className={"row pb-5 " + classes}>
                <div className="col-md-2 col-sm-3">
                    <img className="cover-image" src={image} />
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row justify-content-between">
                        <div className="col-10 pb-1">
                            <span>
                                <MonitoredIcon
                                    itemType="comic"
                                    cvid={this.props.cvid}
                                    isMonitored={this.props.monitored}
                                />
                                <span className="h2 mr-2">
                                    {name}{" "}
                                    <span className="comic-year">
                                        ({startYear})
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="col-1">
                            <ComicSettings cvid={this.props.cvid} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div
                                onClick={this.clickReadMore}
                                className="comic-description"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        displayDescription,
                                        { ADD_ATTR: ["target"] }
                                    ),
                                }}
                            />
                            {this.descriptionModal()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <ComicBadge>
                                <Pluralize
                                    singular={"issue"}
                                    count={numIssues}
                                />
                            </ComicBadge>
                            <ComicBadge>{publisher}</ComicBadge>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComicItem.propTypes = {
    cvid: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    numIssues: PropTypes.number,
    startYear: PropTypes.number,
    publisher: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    displayDescription: PropTypes.string,
    descriptionIsTruncated: PropTypes.bool,
    inLibrary: PropTypes.bool,
    singleView: PropTypes.bool,
    classes: PropTypes.string,
    monitored: PropTypes.bool,
};

export default withRouter(ComicItem);
