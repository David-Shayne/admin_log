import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import UserList from './components/UserList';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AppNavbar />
                <UserList />
            </Provider>
        </div>
    );
}

export default App;
