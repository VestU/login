module.exports = function() {

    //404 handler
    vu.server.route({
        method: '*',
        path: '/{p*}',
        handler: function( request , reply ){
            reply.view( 'error_404' ).code( 404 );
        }
    });
}