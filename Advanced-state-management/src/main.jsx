import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({ notes: noteReducer, filter: filterReducer })

const store = createStore(reducer)

console.log(store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// )