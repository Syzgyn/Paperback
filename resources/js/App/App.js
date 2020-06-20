import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './AppRoutes'
import Page from '@/Components/Page/Page'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
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
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
