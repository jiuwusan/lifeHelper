module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;
    //管理端
    // C端
    router.get('/custom/fm/queryAll', controller.custom.fm.queryAll);
};