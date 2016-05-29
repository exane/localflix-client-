import config from "../config"
import $ from "jquery"

let cfg = config.load()

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

const receiveSearchSeries = (data) => {
  return {
    type: "RECEIVE_SEARCH_SERIES",
    data
  }
}

const handleResponse = (response, xhr) => {
  if(xhr.status >= 400) {
    console.error(xhr)
    throw new Error("Bad response from server");
  }
  return response
}

export const searchSeries = title => {
  return dispatch => {
    return $.ajax({
      url: `${cfg.server.url}:${cfg.server.port}/tmdb/search/${title}`
    })
    .then((res, status, xhr) => handleResponse(res, xhr))
    .then(json => {
      return dispatch(receiveSearchSeries(json))
    })
  }
}
export const allSeries = () => {
  return (dispatch, getState) => {
    const series = getState().rootReducer.series
    return $.ajax({
      url: `${cfg.server.url}:${cfg.server.port}/series`
    })
    .then((res, status, xhr) => handleResponse(res, xhr))
    .then(json => {
      console.log("request all series");
      return dispatch(receiveSeries(json))
    })
  }
}
export const getSerie = serieID => {
  return (dispatch, getState) => {
    const serie = getState().rootReducer.series[serieID]
    return $.ajax({
      url: `${cfg.server.url}:${cfg.server.port}/serie/${serieID}`
    })
    .then((res, status, xhr) => handleResponse(res, xhr))
    .then(json => {
      console.log("request serie", serieID);
      return dispatch(receiveSerie(serieID, json))
    })
  }
}
export const getSeason = seasonID => {
  return dispatch => {
    return $.ajax({
      url: `${cfg.server.url}:${cfg.server.port}/season/${seasonID}`
    })
    .then((res, status, xhr) => handleResponse(res, xhr))
    .then(json => {
      return dispatch(receiveSeason(seasonID, json))
    })
  }
}
export const getVideo = videoID => {
  return dispatch => {
    return $.ajax({
      url: `${cfg.server.url}:${cfg.server.port}/episode/${videoID}`
    })
    .then((res, status, xhr) => handleResponse(res, xhr))
    .then(json => {
      console.log(json);
      return dispatch(receiveVideo(videoID, json))
    })
  }
}