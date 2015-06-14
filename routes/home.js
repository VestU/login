module.exports = function() {

    // Fork between guest and member
    vu.server.route({
        method: 'GET',
        path: '/',
        handler: function( request , reply ){
            var context = {};
            vu.methods.isMember( request , reply , context , {
                member:function( request , reply , context ){
                    reply.view( 'member_index' , context );
                },
                guest:function( request , reply , context ){
                    reply.view( 'guest_index' , context );
                }
            })
        }
    });
    
}