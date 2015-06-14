module.exports = function() {
    
    // REGISTER/DELETE API
    /////////////////////////////////////////////////

    // /register GET
    vu.server.route({
        method: 'GET',
        path: '/register',
        handler: function( request , reply ){
            reply( 'register' ).redirect( '/' );
        }
    });


    // /register POST --> Send REG Email and login link
    vu.server.route({
        method: 'POST',
        path: '/register',
        handler: function( request , reply ){
            
            //create user
            vu.models.User.create( {
                email: request.payload.email
            });
            
            //create token
            vu.models.Token.create({
                    email: request.payload.email
                },
                function( err , token ){
        
                    //SEND EMAIL
                    vu.methods.sendEmail({
                        from: 'admin@vestu.com',
                        replyTo: [ 'admin@vestu.com' ],
                        to: [ request.payload.email ],
                        subject: 'Vestu Registration',
                        text: 'You are registered at VestU.com.\n\nSimply open the link below to login.\n\nhttps://logintest.vestu.com/login/' + token.get('token') + ' \n\nThis link will expire when clicked.'
                    });
                    reply( 'register' ).redirect( '/login/check_email' );
                }
            );
            
        }
    });
    
    // /delete POST
    vu.server.route({
        method: 'POST',
        path: '/delete',
        handler: function( request , reply ){
            if( request.payload.email == request.state.service.split( '|' )[0] ){
                //delete user
                vu.models.User.destroy( request.payload.email , function( err ){
                    reply( 'delete' ).unstate( 'service' ).unstate( 'session' ).redirect( '/' );
                });
                
            }else{
                reply( 'delete' ).redirect( '/' );
            }
        }
    });

}