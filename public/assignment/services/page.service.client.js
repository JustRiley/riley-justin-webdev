(function () {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService() {
        //JSON JavaScript object Notation
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var pagers = [];
            for(var p in pages){
                if(pages[p].websiteId === websiteId){
                    pagers.push(pages[p]);
                }
            }
            return pagers;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId){
                    return pages[p];
                }
            }
        }
        //TODO: Needs improvement
        function updatePage(pageId, page) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    pages[p] =  page;
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.pop(pages[u]);
                }
            }
        }

    }
})();