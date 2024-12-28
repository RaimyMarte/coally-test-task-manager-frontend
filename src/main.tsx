import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.ts'
import { Provider as ChakraProvider } from './ui/components/chakra/provider'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
