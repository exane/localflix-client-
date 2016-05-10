class Home {
  constructor(Request) {
    Request.series.then((res) => {
      this.series = res.data
    })
  }
}

Home.$inject = ["app.Request"]

export { Home }