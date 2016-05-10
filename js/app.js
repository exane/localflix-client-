import angular from "angular";
import route from "angular-route";
import { Config } from "./public/service/Config";
import { Episode } from "./public/component/Episode";
import { Season } from "./public/component/Season";
import { Home } from "./public/component/Home";
import { Video } from "./public/component/Video";
import { Request } from "./public/service/Requests";

function config($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './public/view/home.html',
    controller: 'app.Home',
    controllerAs: 'home'
  })
  .when('/season/:serie_id', {
    templateUrl: './public/view/season_overview.html',
    controller: 'app.Season',
    controllerAs: 'season'
  })
  .when('/episode/:season_id', {
    templateUrl: './public/view/episode_overview.html',
    controller: 'app.Episode',
    controllerAs: 'episode'
  })
  .when('/watch/:id', {
    templateUrl: './public/view/video.html',
    controller: 'app.Video',
    controllerAs: 'video'
  })
  .otherwise({redirectTo: '/'});
}
config.$inject = ['$routeProvider'];

angular.module("app", [route])
.controller("app.Episode", Episode)
.controller("app.Season", Season)
.controller("app.Home", Home)
.controller("app.Video", Video)
.service("app.Request", Request)
.service("app.Config", Config)
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*((chrome-extension|https?|file|ftp|blob):|data:image\/)/);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|chrome-extension|ftp|mailto|tel):/);
}])
.config(config);

angular.bootstrap(document, ["app"])