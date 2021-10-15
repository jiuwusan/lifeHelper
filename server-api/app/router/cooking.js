module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/cooking/save', authenticate(), controller.admin.cooking.save);
    router.get('/admin/cooking/findById', authenticate(), controller.admin.cooking.findById);
    router.post('/admin/cooking/pageQuery', authenticate(), controller.admin.cooking.pageQuery);
    router.post('/admin/cooking/delById', authenticate(), controller.admin.cooking.delById);
    // C端
    router.post('/custom/cooking/pageQuery', controller.custom.cooking.pageQuery);
    router.post('/custom/cooking/append', controller.custom.cooking.append);
    router.post('/custom/cooking/remove', controller.custom.cooking.remove);
    router.post('/custom/cooking/zoneQuery', controller.custom.cooking.zoneQuery);
    router.post('/custom/cooking/submit', controller.custom.cooking.submit);
    router.post('/custom/cooking/status', controller.custom.cooking.status);
    router.post('/custom/cooking/delete', controller.custom.cooking.delete);
    router.post('/custom/cooking/pageQueryCuisine', controller.custom.cooking.pageQueryCuisine);
    router.post('/custom/cooking/random', controller.custom.cooking.random);

};