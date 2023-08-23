import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import initStore from './app/reducers/combine.reducer';
import {Provider} from "react-redux";
import i18n from './app/libraries/i18n';
import {I18nextProvider} from 'react-i18next';
import {AuthContextProvider} from './app/contexts/auth.context';
import App from './app/App';
import './assets/bootstrap/bootstrap.min.css'
import './assets/bootstrap-icons/bootstrap-icons.css'
import './style.scss';
import './assets/theme/theme.css';
// @ts-ignore
import $ from 'jquery'
import popper from "@popperjs/core";
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/js/select2/select2.min.css'
import './assets/js/select2/select2.min.js'
import './assets/js/custom.js'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<React.StrictMode>
    <Provider store={initStore}>
        <I18nextProvider i18n={i18n}>
            <AuthContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AuthContextProvider>
        </I18nextProvider>
    </Provider>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// initStore.subscribe(() => {
//     console.log(initStore.getState());
// });
export {initStore};

