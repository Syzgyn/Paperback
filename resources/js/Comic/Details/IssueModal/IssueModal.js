import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IssueModalMenuBar from "./IssueModalMenuBar";
import DescriptionTab from "./DescriptionTab";
import SearchTab from "./SearchTab";
import HistoryTab from "./History/HistoryTab";

class IssueModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            searchResultsLoading: false,
            searchResults: [],
            didSearch: false,
        };

        this.close = this.close.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.onNavButtonClick = this.onNavButtonClick.bind(this);
        this.onManualSearchClick = this.onManualSearchClick.bind(this);
        this.onAutomaticSearchClick = this.onAutomaticSearchClick.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeTab !== this.props.activeTab) {
            switch (this.props.activeTab) {
                case "searchManual":
                    this.onManualSearchClick();
                    break;
                case "searchAutomatic":
                    this.onAutomaticSearchClick();
                    break;
            }
        }
    }

    close() {
        this.props.toggleModal();
    }

    clearResults() {
        this.setState({ searchResults: [], didSearch: false });
    }

    onManualSearchClick() {
        if (!this.state.didSearch) {
            this.setState(
                { searchResultsLoading: true, didSearch: true },
                this.props.changeActiveTab("search")
            );
            axios
                .get("/api/indexer/search", {
                    params: { cvid: this.props.issue.cvid },
                })
                .then((response) => {
                    this.setState({
                        searchResults: response.data.data,
                        searchResultsLoading: false,
                    });
                });
        }
    }

    onAutomaticSearchClick() {
        if (!this.state.didSearch) {
            this.setState(
                { searchResultsLoading: true, didSearch: true },
                this.props.changeActiveTab("search")
            );
            axios
                .get("/api/indexer/search", {
                    params: { cvid: this.props.issue.cvid },
                })
                .then((response) => {
                    this.setState({
                        searchResults: response.data.data,
                        searchResultsLoading: false,
                    });
                });
        }
    }

    onDownloadClick(guid) {
        axios
            .post("/api/trackeddownload", { guid: guid })
            .then(this.props.toggleModal());
    }

    onNavButtonClick(event) {
        event.preventDefault();
        this.props.changeActiveTab(event.target.dataset.tabname);
    }

    getContent() {
        let description = this.props.issue ? this.props.issue.description : "";
        switch (this.props.activeTab) {
            case "description":
                return <DescriptionTab description={description} />;
            case "search":
                return (
                    <SearchTab
                        loading={this.state.searchResultsLoading}
                        didSearch={this.state.didSearch}
                        results={this.state.searchResults}
                        automaticClick={this.onAutomaticSearchClick}
                        manualClick={this.onManualSearchClick}
                        downloadClick={this.onDownloadClick}
                    />
                );
            case "history":
                return <HistoryTab issue={this.props.issue} />;
            default:
                return null;
        }
    }

    render() {
        const { activeTab } = this.props;

        return (
            <Modal
                isOpen={this.props.isOpen}
                onClosed={this.clearResults}
                toggle={this.props.toggleModal}
                className="issueModal"
                size="xl"
            >
                <ModalHeader toggle={this.props.toggleModal}>
                    {name}
                </ModalHeader>
                <ModalBody>
                    <IssueModalMenuBar
                        activeTab={activeTab}
                        onClickCallback={this.onNavButtonClick}
                    />
                    {this.getContent()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.close}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

IssueModal.propTypes = {
    activeTab: PropTypes.string.isRequired,
    changeActiveTab: PropTypes.func.isRequired,
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    issue: PropTypes.shape({
        displayName: PropTypes.string,
        description: PropTypes.string,
        cvid: PropTypes.number,
        comic_id: PropTypes.number,
    }),
};

export default IssueModal;
