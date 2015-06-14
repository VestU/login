module.exports = function() {
    
    //ASSETS HANDLER
    vu.server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: 'static/assets/',
                lookupCompressed:true
            }
        }
    });

    //fonts
    vu.server.route({
        method: 'GET',
        path: '/fonts/{param*}',
        handler: {
            directory: {
                path: 'static/fonts/',
                lookupCompressed:true
            }
        }
    });

    //favicon handlers
    vu.server.route({
        method: 'GET',
        path: '/android-icon-36x36.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-36x36.png',
                lookupCompressed: true
            }
        }
    });

    vu.server.route({
        method: 'GET',
        path: '/android-icon-48x48.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-48x48.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/android-icon-72x72.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-72x72.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/android-icon-96x96.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-96x96.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/android-icon-144x144.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-144x144.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/android-icon-192x192.png',
        handler:{
            file:{
                path:'static/favicon/android-icon-192x192.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-57x57.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-57x57.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-60x60.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-60x60.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-72x72.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-72x72.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-76x76.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-76x76.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-114x114.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-114x114.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-120x120.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-120x120.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-144x144.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-144x144.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-152x152.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-152x152.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-180x180.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-180x180.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon-precomposed.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon-precomposed.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/apple-icon.png',
        handler:{
            file:{
                path:'static/favicon/apple-icon.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/browserconfig.xml',
        handler:{
            file:{
                path:'static/favicon/browserconfig.xml',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/favicon-16x16.png',
        handler:{
            file:{
                path:'static/favicon/favicon-16x16.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/favicon-32x32.png',
        handler:{
            file:{
                path:'static/favicon/favicon-32x32.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/favicon-96x96.png',
        handler:{
            file:{
                path:'static/favicon/favicon-96x96.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler:{
            file:{
                path:'static/favicon/favicon.ico',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/manifest.json',
        handler:{
            file:{
                path:'static/favicon/manifest.json',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/ms-icon-70x70.png',
        handler:{
            file:{
                path:'static/favicon/ms-icon-70x70.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/ms-icon-144x144.png',
        handler:{
            file:{
                path:'static/favicon/ms-icon-144x144.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/ms-icon-150x150.png',
        handler:{
            file:{
                path:'static/favicon/ms-icon-150x150.png',
                lookupCompressed: true
            }
        }
    });
    vu.server.route({
        method: 'GET',
        path: '/ms-icon-310x310.png',
        handler:{
            file:{
                path:'static/favicon/ms-icon-310x310.png',
                lookupCompressed: true
            }
        }
    });

}
