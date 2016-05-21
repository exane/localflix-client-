import { combineReducers } from 'redux'

const defaultState = {
  series: {},
  seasons: {},
  episodes: {},
}

const series = (state = defaultState.series, action) => {
  switch(action.type) {
    case "RECEIVE_SERIES":
      let series = {...action.series}
      let res = {}
      Object.keys(series).forEach((key) => {
        res[series[key].ID] = series[key]
      })
      return Object.assign({}, state, {
        ...res
      })
    case "RECEIVE_SERIE":
      let obj = {
        [action.id]: {
          ...action.serie
        }
      }
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

const seasons = (state = defaultState.seasons, action) => {
  switch(action.type) {
    case "RECEIVE_SEASON":
      let obj = {
        [action.id]: {
          ...action.season
        }
      }
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

const episodes = (state = defaultState.episodes, action) => {
  switch(action.type) {
    case "RECEIVE_VIDEO":
      let obj = {
        [action.id]: {
          ...action.video
        }
      }
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch(action.type) {
    case "RECEIVE_SEARCH_SERIES":
      console.log(action.data);
      return action.data
    default:
      return state
  }

}
const cr = combineReducers({
  series,
  seasons,
  episodes,
  data,
})

export default cr