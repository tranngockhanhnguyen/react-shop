import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './app/store'
import './index.css'

const rootNode = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  rootNode
)
