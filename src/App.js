import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import MainComponent from './MainComponent'
import { ConfigureStore } from "./redux/configureStore"; 
const store = ConfigureStore();
function App() {
    return (
        <BrowserRouter> 
           <Provider store={store}>  
                <MainComponent />
            </Provider>
        </BrowserRouter>
    )
}

export default App
