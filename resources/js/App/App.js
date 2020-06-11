import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Page from '@/Components/Page/Page'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Page>
                    <AppRoutes />
                </Page>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
