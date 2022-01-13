module.exports = app => {
    const { router, controller, middleware = {} } = app;
    const { authenticate } = middleware;

    //客户端
    router.get('/custom/qrcode/wifi/findById', controller.custom.qrcode.wifi.findById);
    router.post('/custom/qrcode/wifi/checkPassword', controller.custom.qrcode.wifi.checkPassword);
};