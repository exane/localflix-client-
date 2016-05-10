class Request {
  constructor(http, cfg) {
    this.http = http;
    this.config = cfg.load()
  }

  req(url) {
    return this.http({
      url: `${this.config.server.url}:${this.config.server.port}/${url}`,
      method: "GET"
    })
  }

  get series() {
    return this.req("series")
  }

  serie(serie_id) {
    return this.req(`serie/${serie_id}`)
  }

  season(season_id) {
    return this.req(`season/${season_id}`)
  }

  episodes(season_id) {
    return this.req(`episodes/${season_id}`)
  }

  episode(episode_id) {
    return this.req(`episode/${episode_id}`)
  }
}

Request.$inject = ["$http", "app.Config"]

export { Request }