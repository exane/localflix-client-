class Episode {
  constructor(params, Request, $l) {
    this.season_id = params.season_id;
    this.$location = $l

    Request.season(this.season_id).then((res) => {
      console.log(res.data)
      this.season = res.data
      this.episodes = res.data.Episodes
    })

  }

  go(path) {
    this.$location.path(path)
  }
}

Episode.$inject = ["$routeParams", "app.Request", "$location"]
export { Episode }