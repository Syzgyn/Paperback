import React, { Suspense, lazy, Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
//import IndexerList from './IndexerList'

const IndexerList = lazy(() => import('./IndexerList'));
const ComicList = lazy(() => import('./ComicList'));
const AddComic = lazy(() => import('./AddComic'));


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
            <div className="page container bg-light rounded-lg py-3 mt-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      <Route exact path='/'>
                        <ComicList />
                      </Route>
                      <Route path='/addcomic'>
                        <AddComic />
                      </Route>
                    </Switch>
                </Suspense>
            </div>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
