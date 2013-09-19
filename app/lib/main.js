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
      var center, controller, map, socket;
      center = [55.8580, -4.2590];
      controller = this.get("controller");
      map = L.map("map").setView(center, 13);
      L.tileLayer("http://{s}.tile.cloudmade.com/b926644956b94dff87b45a2955a502c7/997/256/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://cloudmade.com\">CloudMade</a>",
        maxZoom: 18
      }).addTo(map);
      this.controller.set("map", map);
      socket = io.connect("http://0.0.0.0:8080/");
      socket.on("connect", function(obj) {
        return console.log("connected successfully");
      });
      return socket.on("message", function(obj) {
        var coords, x, y, _ref;
        console.log(obj);
        if (!obj) {
          return;
        }
        _ref = obj.split(','), y = _ref[0], x = _ref[1];
        coords = [x, y];
        L.marker(coords).addTo(map).bindPopup("" + coords).openPopup();
        return map.panTo(new L.LatLng(x, y));
      });
    }
  });

}).call(this);
