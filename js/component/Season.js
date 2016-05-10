class Season {
  constructor(params, Request, $location) {
    this.serie_id = params.serie_id
    this.$location = $location

    Request.serie(this.serie_id).then((res) => {
      this.serie = res.data
      this.seasons = res.data.Seasons
      console.log(res.data);
    })
  }

  go(path) {
    this.$location.path(path)
  }
}

Season.$inject = ["$routeParams", "app.Request", "$location"]

export { Season }