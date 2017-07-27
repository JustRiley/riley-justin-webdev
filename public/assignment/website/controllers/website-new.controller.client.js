(function () {
    angular.module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.editWebsite = editWebsite;
        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
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
//Race condition without the .then
        function createWebsite(website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/");
            });
        }
    }
})();