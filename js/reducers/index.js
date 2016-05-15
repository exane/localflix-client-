import { combineReducers } from 'redux'

/*
const Request = (state, action) =>  {
  switch(action.type) {
    case "REQUEST_SERIES":
      return {

      }
  }
}

const Requests = (state = [], action) => {
  switch(action.type) {
    case "REQUEST_SERIES":
      return [...state, Request()]
  }
}*/

const defaultState = {
  series: [],
  serie: [],
  season: {},
  video: {},
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case "RECEIVE_SERIES":
      return Object.assign({}, state, {
        series: action.series
      })
    case "RECEIVE_SERIE":
      return Object.assign({}, state, {
        serie: action.serie
      })
    case "RECEIVE_SEASON":
      return Object.assign({}, state, {
        season: action.season
      })
    case "RECEIVE_VIDEO":
      return Object.assign({}, state, {
        video: action.video
      })
    case "REQUEST_SERIES":
    case "REQUEST_SERIE":
    case "REQUEST_SEASON":
    default:
      return state
  }
}