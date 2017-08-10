/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($location, $routeParams, websiteService, user) {
        var model = this;

        model.userId = user._id;

        model.editWebsite = editWebsite;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
            })
        }
        init();

        function editWebsite(websiteId) {
                websiteService.findWebsiteById(model.userId, websiteId)
                    .then(function (response) {
                        var website = response;
                        if (website === null) {
                            model.errorMessage = "Website not found";
                        } else {
                            $location.url("/user/"+ model.userId +"/website/" + websiteId);
                        }
                });

        }
    }
})();