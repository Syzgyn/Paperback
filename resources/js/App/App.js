import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './AppRoutes'
import Page from '@/Components/Page/Page'
import store, {history} from '@/Store/createStore'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Page>
                        <AppRoutes />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable={false}
                            pauseOnHover
                        />
                    </Page>
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
