import wjs from "wcjs-player";

class Video {
  constructor($scope, params, Request, $l, config) {
    this.player = new wjs("#player").addPlayer({autoplay: true});
    this.player.volume(50);
    this.$location = $l
    this.config = config.load()

    Request.episode(params.id).then((res) => {
      console.log(res.data);
      this.episode = res.data
      let url = `${this.config.fileserver.url}:${this.config.fileserver.port}/${res.data.SerieName}/${res.data.SeasonName}/${res.data.Name}.${res.data.Extension}`
      this.player.addPlaylist(encodeURI(url))
    })

    $scope.$on("$destroy", () => {
      this.player.stop();
    })
  }
  go(path) {
    this.$location.path(path)
  }
}

Video.$inject = ["$scope", "$routeParams", "app.Request", "$location", "app.Config"]

export { Video }