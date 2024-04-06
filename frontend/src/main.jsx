import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import './assets/index.css'
import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from 'react-query'
import store from './app/logic/store.js'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
