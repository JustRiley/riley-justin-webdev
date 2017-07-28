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
            websiteService.findWebsiteById(model.userId, model.websiteId)
                .then(function (response) {
                    model.website = response.data;
            });
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
           // model.websites = angular.copy(websiteService.findWebsitesForUser(model.userId));
        }
        init();

        function editWebsite(websiteId) {
            websiteService.findWebsiteById(model.userId, websiteId)
                .then(function (website) {
                    if (website === null) {
                        model.errorMessage = "Website not found";
                    } else {
                        $location.url("/user/"+ model.userId +"/website/" + websiteId);
                    }
            })
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(function () {
                    $location.url("/user/"+ model.userId +"/website/");
            });
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/");
                });
            }
    }
})();