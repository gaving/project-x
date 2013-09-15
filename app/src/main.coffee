App = Ember.Application.create()
App.ApplicationController = Ember.Controller.extend(
  zoomLevel: 13
  map: null
  zoomLevelChanged: -> (
    zoomLevel = @get("zoomLevel")
    map = @get("map")
    map.setZoom zoomLevel  unless zoomLevel == map.getZoom()
  ).observes("zoomLevel")
)

App.Router = Ember.Router.extend(
  root: Ember.Route.extend(
    index: Ember.Route.extend(route: "/")
  )
)

App.ApplicationView = Ember.View.extend(
  templateName: "index"
  classNames: [ "full-height" ]
  didInsertElement: ->
    center = [ 41.3823000, 2.1825000 ]
    controller = @get("controller")
    map = L.map("map").setView(center, 13)
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors").addTo map
    @controller.set "map", map
)
