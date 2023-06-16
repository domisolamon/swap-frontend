import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from "./Providers";
import { Provider } from "react-redux";
import './polyfill'
import { store } from './app/store.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Providers >
                <App />
            </Providers>
        </Provider>
    </React.StrictMode>
);
