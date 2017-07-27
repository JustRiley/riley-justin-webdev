/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

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
            var website = websiteService.findWebsiteById(websiteId);
            if (website === null) {
                model.errorMessage = "Website not found";
            } else {
                $location.url("/user/"+ model.userId +"/website/" + websiteId);
            }
        }
    }
})();