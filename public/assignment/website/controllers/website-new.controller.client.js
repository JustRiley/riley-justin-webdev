(function () {
    angular.module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.editWebsite = editWebsite;
        model.createWebsite = createWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
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

        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website);
            $location.url("/user/" + model.userId + "/website/");
        }
    }
})();