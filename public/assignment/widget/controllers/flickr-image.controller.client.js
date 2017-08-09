/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("flickrController", flickrController);

    function flickrController(flickrService, widgetService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.wgid = $routeParams.wgid;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .findWidgetById(model.wgid)
                .then(function (widget) {
                    var improvedWidget = widget;
                    improvedWidget.url = url;
                    return widgetService.updateWidget(model.wgid, improvedWidget);
                })
                .then($location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.wgid));

        }

        function searchPhotos(searchTerm) {
            flickrService.searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function init() {
        }
        init();
    }
})();


