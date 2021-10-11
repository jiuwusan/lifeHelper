module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    router.post('/admin/cooking/save', authenticate(), controller.admin.cooking.save);
    router.get('/admin/cooking/findById', authenticate(), controller.admin.cooking.findById);
    router.post('/admin/cooking/pageQuery', authenticate(), controller.admin.cooking.pageQuery);
    router.post('/admin/cooking/delById', authenticate(), controller.admin.cooking.delById);
    // C端
    // router.post('/custom/cooking/query', controller.custom.cooking.query);
};