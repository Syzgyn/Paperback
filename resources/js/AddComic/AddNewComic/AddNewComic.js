import axios from "axios";
import React, { Component } from "react";
import ComicItem from "./ComicItem";
import { Search as Searchbar } from "./Search";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageRow from "@/Components/Page/PageRow";

class AddNewComic extends Component {
    constructor() {
        super();
        this.state = {
            searchValue: "",
            loading: false,
            comics: [],
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(value) {
        const hasValue = !!value.trim();
        this.setState({ searchValue: value }, () => {
            if (hasValue) {
                this.search(value);
            }
        });
    }

    async search(value) {
        this.setState({ loading: true });

        await axios
            .get("/api/comic/search/", {
                params: {
                    query: value,
                },
            })
            .then((response) => {
                this.setState({ comics: response.data.data, loading: false });
            });
    }

    render() {
        const { comics, loading } = this.state;

        if (loading) {
            return (
                <PageRow>
                    <LoadingIndicator />
                </PageRow>
            );
        }

        return (
            <>
                <Searchbar searchCallback={this.onSearchSubmit} />
                <PageRow>
                    {comics ? (
                        <div id="comic-list">
                            {comics.map((comic) => (
                                <div
                                    className="comic-list-item pb-4"
                                    key={comic.cvid}
                                >
                                    <ComicItem {...comic} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </PageRow>
            </>
        );
    }
}

export default AddNewComic;
