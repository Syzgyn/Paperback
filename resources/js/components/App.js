import React, { Suspense, lazy, Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
//import IndexerList from './IndexerList'

const IndexerList = lazy(() => import('./IndexerList'));
const ComicList = lazy(() => import('./ComicList'));


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
            <div className="page container bg-light rounded-lg py-3 mt-2">
                    <div className="row">
                        <div className="col-md-12">
            <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' component={ComicList} />
            </Switch>
            </Suspense>
                    </div>
                </div>
            </div>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
