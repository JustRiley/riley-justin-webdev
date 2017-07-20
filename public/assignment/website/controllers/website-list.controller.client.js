/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        var userId = $routeParams.userId;

        function init() {
            model.websites = websiteService.findWebsitesForUser(userId);
        }
        init();
    }
})();