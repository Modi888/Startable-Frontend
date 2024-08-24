import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from "./store"
import { Provider } from 'react-redux'

import './scss/style.scss'
import './scss/tailwind.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)



// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
      
      </Provider>
    )
  }
}

export default App
