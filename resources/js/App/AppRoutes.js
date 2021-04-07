import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";

const ComicIndex = lazy(() =>
    import("@/Comic/Index/ComicIndex")
);
const ComicDetails = lazy(() => 
    import("@/Comic/Details/ComicDetails")
);
const GeneralSettings = lazy(() =>
    import("@/Settings/General/GeneralSettings")
);
const IndexerSettings = lazy(() =>
    import("@/Settings/Indexers/IndexerSettings")
);
const DownloaderSettings = lazy(() =>
    import("@/Settings/Downloaders/DownloaderSettings")
);
const WantedPage = lazy(() =>
    import("@/Wanted/WantedPage")
);

function AppRoutes() {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Switch>
                <Route exact path="/">
                    <ComicIndex />
                </Route>
                <Route path="/comic/:cvid">
                    <ComicDetails />
                </Route>
                <Route path="/settings" exact={true}>
                    <Redirect to="/settings/general" />
                </Route>
                <Route path="/settings/general">
                    <GeneralSettings />
                </Route>
                <Route path="/settings/indexers">
                    <IndexerSettings />
                </Route>
                <Route path="/settings/downloaders">
                    <DownloaderSettings />
                </Route>
                <Route path="/wanted">
                    <WantedPage />
                </Route>
            </Switch>
        </Suspense>
    );
}

export default AppRoutes;
