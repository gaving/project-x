(function() {
  var App;

  App = Ember.Application.create();

  App.ApplicationController = Ember.Controller.extend({
    zoomLevel: 13,
    map: null,
    zoomLevelChanged: function() {
      var map, zoomLevel;
      return (zoomLevel = this.get("zoomLevel"), map = this.get("map"), zoomLevel !== map.getZoom() ? map.setZoom(zoomLevel) : void 0).observes("zoomLevel");
    }
  });

  App.Router = Ember.Router.extend({
    root: Ember.Route.extend({
      index: Ember.Route.extend({
        route: "/"
      })
    })
  });

  App.ApplicationView = Ember.View.extend({
    templateName: "index",
    classNames: ["full-height"],
    didInsertElement: function() {
      var center, controller, map;
      center = [41.3823000, 2.1825000];
      controller = this.get("controller");
      map = L.map("map").setView(center, 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
      }).addTo(map);
      return this.controller.set("map", map);
    }
  });

}).call(this);
