import React, { Suspense, lazy} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'

//const IndexerList = lazy(() => import('./IndexerList'));
const ComicIndex = lazy(() => import('@/Comic/Index/ComicIndex'));
const AddNewComic = lazy(() => import('@/AddComic/AddNewComic/AddNewComic'));
const ComicDetails = lazy(() => import('@/Comic/Details/ComicDetails'));
const IndexerSettings = lazy(() => import('@/Settings/Indexers/IndexerSettings'));
const DownloaderSettings = lazy(() => import('@/Settings/Downloaders/DownloaderSettings'));

function AppRoutes() {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Switch>
              <Route exact path='/'>
                <ComicIndex />
              </Route>
              <Route path='/add/new'>
                <AddNewComic />
              </Route>
              <Route path='/comic/:cvid'>
                <ComicDetails />
              </Route>
              <Route path='/settings' exact={true}>
                <Redirect to="/settings/indexers" />
              </Route>
              <Route path='/settings/indexers'>
                <IndexerSettings />
              </Route>
              <Route path='/settings/downloaders'>
                <DownloaderSettings />
              </Route>
            </Switch>
        </Suspense>
    );
}

export default AppRoutes