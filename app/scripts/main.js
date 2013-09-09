//App = Em.Application.create({
    //rootElement: $('#app'),
    //orgId: 0
//});

//App.Router.map(function(){
  //this.route('about');
//});

var App = Ember.Application.create();
App.ApplicationController = Ember.Controller.extend({
    //default zoom level
    zoomLevel: 13,
    map: null,
    zoomLevelChanged: function () {
        var zoomLevel = this.get('zoomLevel');
        var map = this.get('map');
        //Control not changing the zoom of the map if it is yet at the value
        if (zoomLevel != map.getZoom()) {
            map.setZoom(zoomLevel);
        }
    }.observes('zoomLevel'),
});

App.Router = Ember.Router.extend({
    root: Ember.Route.extend({
        index: Ember.Route.extend({
            route: '/'
        })
    })
});
App.ApplicationView = Ember.View.extend({
    templateName: 'index',
    classNames: ['full-height'],
    didInsertElement: function () {
        console.log(L);
        var center = [41.3823000, 2.1825000];
        var controller = this.get('controller');
        //var zoomLevel = controller.get('zoomLevel');
        var map = L.map('map').setView(center, 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // configure map instance...

        // Event listeners
        //map.on('zoomend', function (e) {
            //console.log('zoomend', 'Setting zoomLevel ' + e.target.getZoom());
            //controller.set('zoomLevel', e.target.getZoom());
        //});

        // save map instance
        this.controller.set('map', map);
    }
});
