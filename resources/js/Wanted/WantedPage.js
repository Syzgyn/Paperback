import React, { useEffect } from "react";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchItems,
    wantedIssuesSelector,
} from "@/Store/Slices/wanted";
import PageRow from "@/Components/Page/PageRow";
import WantedList from "@/Wanted/WantedList";
import WantedPageControls from "@/Wanted/WantedPageControls";
import WantedIssueControls from "@/Wanted/WantedIssueControls";

const WantedPage = () => {
    const dispatch = useDispatch();
    const { isLoading, isPopulated } = useSelector(wantedIssuesSelector);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    if (isLoading && !isPopulated) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <PageRow>
                <WantedIssueControls />
            </PageRow>
            <PageRow>
                <WantedList />
            </PageRow>
            <WantedPageControls />
        </>
    );
};

export default WantedPage;
