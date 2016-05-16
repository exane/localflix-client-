import fetch from 'isomorphic-fetch'
import config from "../config"

let cfg = config.load()

export const requestSeries = () => {
  return {
    type: "REQUEST_SERIES"
  }
}
export const requestSerie = (serieID) => {
  return {
    type: "REQUEST_SERIE",
    id: serieID,
  }
}
export const requestSeason = (seasonID) => {
  return {
    type: "REQUEST_SEASON",
    id: seasonID,
  }
}
export const requestVideo = (videoID) => {
  return {
    type: "REQUEST_VIDEO",
    id: videoID,
  }
}

const receiveSeries = (json) => {
  return {
    type: "RECEIVE_SERIES",
    series: json
  }
}
const receiveSerie = (serieID, json) => {
  return {
    type: "RECEIVE_SERIE",
    id: serieID,
    serie: json
  }
}
const receiveSeason = (seasonID, json) => {
  return {
    type: "RECEIVE_SEASON",
    id: seasonID,
    season: json
  }
}
const receiveVideo = (videoID, json) => {
  return {
    type: "RECEIVE_VIDEO",
    id: videoID,
    video: json
  }
}

const isCached = (state = {}) => {
  return !!Object.keys(state).length
}

export const allSeries = () => {
  return (dispatch, getState) => {
    const series = getState().rootReducer.series
    dispatch(requestSeries())
    return fetch(`${cfg.server.url}:${cfg.server.port}/series`)
    .then(res => res.json())
    .then(json => {
      console.log("request all series");
      return dispatch(receiveSeries(json))
    })
  }
}
export const getSerie = serieID => {
  return (dispatch, getState) => {
    const serie = getState().rootReducer.series[serieID]
    dispatch(requestSerie(serieID))
    return fetch(`${cfg.server.url}:${cfg.server.port}/serie/${serieID}`)
    .then(res => res.json())
    .then(json => {
      console.log("request serie", serieID);
      return dispatch(receiveSerie(serieID, json))
    })
  }
}
export const getSeason = seasonID => {
  return dispatch => {
    dispatch(requestSeason(seasonID))
    return fetch(`${cfg.server.url}:${cfg.server.port}/season/${seasonID}`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return dispatch(receiveSeason(seasonID, json))
    })
  }
}
export const getVideo = videoID => {
  return dispatch => {
    dispatch(requestVideo(videoID))
    return fetch(`${cfg.server.url}:${cfg.server.port}/episode/${videoID}`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return dispatch(receiveVideo(videoID, json))
    })
  }
}