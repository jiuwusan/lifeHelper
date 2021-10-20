module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    // C端
    router.get('/custom/stick/queryAll', controller.custom.stick.queryAll);
    router.post('/custom/stick/complete', controller.custom.stick.complete);

    router.get('/custom/stick/type', controller.custom.stick.type);
    router.post('/custom/stick/type/create', controller.custom.stick.createType);
    router.post('/custom/stick/type/delete', controller.custom.stick.deleteType);
};