export default [
    {
        path: '/login',
        component: '@/pages/Auth/Login',
    },
    {
        component: '@/base/MainLayout',
        routes: [
            {
                path: '/',
                component: '@/pages/Main',
            },
            {
                path: '/cooking',
                component: '@/pages/Cooking',
            }
        ],
    },
];
