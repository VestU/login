module.exports = function() {
    
    // LOGIN/LOGOUT API
    /////////////////////////////////////////////////

    // /login GET show form to post
    vu.server.route({
        method: 'GET',
        path: '/login',
        handler: function( request , reply ){
            //SHOW FORM
            reply( 'login' ).redirect( '/' );
        }
    });


    // /login POST Form( email )
    vu.server.route({
        method: 'POST',
        path: '/login',
        handler: function( request, reply ){
            //GET USER
            vu.models.User.get( request.payload.email , function( err , user ){
                //NO USER
                if( user == null ){
                    reply( 'login' ).redirect( '/' );
                    return;
                }else{
                    //CREATE TOKEN
                    vu.models.Token.create({
                            email: request.payload.email
                        },
                        function (err, token) {
                            //SEND EMAIL
                            vu.methods.sendEmail({
                                from: 'admin@vestu.com',
                                replyTo: [ 'admin@vestu.com' ],
                                to: [ request.payload.email ],
                                subject: 'Vestu Login',
                                text: 'Open the link below to login.\n\nhttps://logintest.vestu.com/login/' + token.get('token') + ' \n\nOnce opened this link will expire.'
                            });
                            reply( 'login' ).redirect( '/login/check_email' );
                        }
                    );
                }
            });
        }
    });

    // /login/check_email --> Show notice to check email
    vu.server.route({
        method: 'GET',
        path: '/login/check_email',
        handler: function( request , reply ){
            reply.view( 'login_check_email' );
        }
    });


    // /login/{token} --> Log user in and expire token
    vu.server.route({
        method: 'GET',
        path: '/login/{token}',
        handler: function( request , reply ){
            // GET TOKEN
            vu.models.Token.get( encodeURIComponent( request.params.token ) , function( err , token ){
                //NO TOKEN
                if( token == null ){
                    //no result
                    reply( 'login' ).redirect( '/' );

                // TOKEN
                }else{
                    //GET USER VIA EMAIL IN TOKEN
                    vu.models.User.get( token.get( 'email' ) , function( err , user ){
                    //result
                        //INVALID USER
                        if( user == null ){
                            reply( 'login' ).unstate( 'service' ).unstate( 'session' ).redirect( '/' );
                        }else{
                            reply( 'login' ).state( 'service' , vu.methods.cookieFromUser( user ) ).state( 'session' , new Date().getTime() ).redirect( '/' );
                        }
                    });
                    //DELETE TOKEN
                    vu.models.Token.destroy( encodeURIComponent( request.params.token ) );
                }
            });
        }
    });
    
    // /logout REMOVE COOKIE GOTO /
    vu.server.route({
        method: 'POST',
        path: '/logout',
        handler: function( request , reply ){
            reply( 'logout' ).unstate( 'service' ).unstate( 'session' ).redirect( '/' );
        }
    });
}
