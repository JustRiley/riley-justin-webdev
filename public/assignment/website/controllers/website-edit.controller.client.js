(function () {
    angular.module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        model.editWebsite = editWebsite;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.websites = angular.copy(websiteService.findWebsitesForUser(model.userId));

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

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url("/user/"+ model.userId +"/website/");
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url("/user/"+ model.userId +"/website/");
        }
    }
})();