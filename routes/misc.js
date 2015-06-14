module.exports = function() {
    
    // Information Policy
    vu.server.route({
        method: 'GET',
        path: '/information_policy',
        handler: function( request , reply ){
            reply.view( 'guest_information_policy' );
        }
    });

}