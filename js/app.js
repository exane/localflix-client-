import React from "react"
import { Provider } from 'react-redux'
import { render } from "react-dom"
import configureStore from './public/store'
import { Router, Route, Link, hashHistory, useRouterHistory } from "react-router"
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { Home } from "./public/containers/Home"
import { Serie } from "./public/containers/Serie"
import { Season } from "./public/containers/Season"
import { Video } from "./public/containers/Video"

const appHistory = useRouterHistory(createHashHistory)({queryKey: false})
const store = configureStore(hashHistory)

render((
  <Provider store={store}>
    <Router history={appHistory}>
      <Route path="/" component={Home}></Route>
      <Route path="serie/:serieID" component={Serie}></Route>
      <Route path="season/:seasonID" component={Season}></Route>
      <Route path="watch/:videoID" component={Video}></Route>
    </Router>
  </Provider>
), document.querySelector("#root"))