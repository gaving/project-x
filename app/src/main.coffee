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
    center = [55.8580, -4.2590]
    controller = @get("controller")
    map = L.map("map").setView(center, 13)
    #L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors").addTo map
    L.tileLayer("http://{s}.tile.cloudmade.com/b926644956b94dff87b45a2955a502c7/997/256/{z}/{x}/{y}.png", 
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://cloudmade.com\">CloudMade</a>"
      maxZoom: 18
    ).addTo map
    @controller.set "map", map

    socket = io.connect("http://0.0.0.0:8080/")
    socket.on "connect", (obj) ->
      console.log "connected successfully"
    socket.on "message", (obj) ->
      console.log obj
      return unless obj

      [y, x] = obj.split(',')
      coords = [x, y]

      L.marker(coords).addTo(map)
        .bindPopup("#{coords}")
        .openPopup()

      map.panTo(new L.LatLng(x, y))
)
