import React, { Suspense, lazy} from 'react'
import { Route, Switch } from 'react-router-dom'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'

//const IndexerList = lazy(() => import('./IndexerList'));
const ComicIndex = lazy(() => import('@/Comic/Index/ComicIndex'));
const AddNewComic = lazy(() => import('@/AddComic/AddNewComic/AddNewComic'));
const ComicDetails = lazy(() => import('@/Comic/Details/ComicDetails'));

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
            </Switch>
        </Suspense>
    );
}

export default AppRoutes
