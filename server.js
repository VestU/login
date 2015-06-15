
global.vu = {};
vu.models = {};
vu.methods = {};
vu.env = {}
vu.version = 8;

vu.env.ENVIRONMENT = process.env.ENVIRONMENT;
vu.env.SECRET = process.env.SECRET;
vu.env.AWS_KEY = process.env.AWS_KEY;
vu.env.AWS_SECRET = process.env.AWS_SECRET;
vu.env.AWS_REGION = process.env.AWS_REGION;
vu.env.USERS_TABLE_NAME = process.env.USERS_TABLE_NAME;
vu.env.TOKENS_TABLE_NAME = process.env.TOKENS_TABLE_NAME;

vu.env.PORT = process.env.PORT;


vu.Hapi = require( 'hapi' );
vu.AWS = require( 'aws-sdk' );
vu.vogels = require( 'vogels' );
vu.Joi = require( 'joi' );
vu.Handlebars = require( 'handlebars' );


vu.server = new vu.Hapi.Server();
vu.server.connection({ 
    port: vu.env.PORT || 8888 
});

//////////////////////////////////////////////////////////
///SERVER CONFIGURATION
//////////////////////////////////////////////////////////

vu.defaultContext = {
    title: 'VestU.com',
    environment: vu.env.ENVIRONMENT,
    page_style: '',
    analytics:true,
    breadcrumbs:[]
};

//VIEWS CONFIG 
vu.server.views({
    engines: {
        html: vu.Handlebars
    },
    isCached: ( vu.env.ENVIRONMENT == 'PROD' ),
    context: vu.defaultContext,
    path: 'views',
    partialsPath: 'views/partials',
});

//COOKIE CONFIG
vu.server.state( 'service' , {
    ttl: 7884000000,
    isSecure: ( vu.env.ENVIRONMENT == 'PROD' ),
    path: "/",
    isHttpOnly: true,
    encoding: 'iron',
    password: vu.env.SECRET,
    clearInvalid: true, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

vu.server.state( 'session' , {
    ttl: null,
    isSecure: ( vu.env.ENVIRONMENT == 'PROD' ),
    path: "/",
    isHttpOnly: true,
    encoding: 'iron',
    password: vu.env.SECRET,
    clearInvalid: true, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

//FORCE HTTP in PROD
if( vu.env.ENVIRONMENT == 'PROD' ){
    vu.server.ext( 'onRequest' , function ( request , reply ) {
        if( request.headers[ 'x-forwarded-proto' ] === 'http' ){
            return reply().redirect( 'https://' + request.headers.host + request.url.path ).code( 301 );
        }
        return reply.continue();
    });
}


//////////////////////////////////////////////////////////
///SERVICES CONFIGURATION
//////////////////////////////////////////////////////////

//AWS CONFIG
vu.AWS.config.update({ 
    accessKeyId: vu.env.AWS_KEY , 
    secretAccessKey: vu.env.AWS_SECRET
});

vu.AWS.config.update({ 
    region: vu.env.AWS_REGION
});

//VOGELS DYNAMODB CONFIG
vu.vogels.AWS = vu.AWS;

//SES
vu.SES = new vu.AWS.SES();

// VOGELS DYNAMODB MODELS
// USER MODEL
vu.models.User = vu.vogels.define( 'User' , {
    hashKey: 'email',
    timestamps: true,
    schema: {
        email: vu.Joi.string().email()
    },
    tableName: vu.env.USERS_TABLE_NAME
});

// TOKEN MODEL
vu.models.Token = vu.vogels.define( 'Token' , {
    hashKey: 'token',
    timestamps: true,
    schema: {
        token: vu.vogels.types.uuid(),
        email: vu.Joi.string(),
    },
    tableName: vu.env.TOKENS_TABLE_NAME
});



//////////////////////////////////////////////////////////
///SERVER METHODS
//////////////////////////////////////////////////////////


//SEND EMAIL
vu.methods.sendEmail = function( emailOptions ){
    var params = {
        Destination: {
            ToAddresses: emailOptions.to
        },
        Message: {
            Body: {
                Text: {
                    Data: emailOptions.text
                }
            },
            Subject: {
                Data: emailOptions.subject
            }
        },
        Source: emailOptions.from,
        ReplyToAddresses: emailOptions.replyTo
    };
    vu.SES.sendEmail( params , function( err , data ) {
        if( err ){
            console.log( err , err.stack ); // an error occurred
        }
    });
}

vu.methods.cookieFromUser = function( user ){
    return user.get( 'email' ) + '|' +
        new Date( user.get( 'createdAt' ) ).getTime() + '|' +
        new Date( user.get( 'updatedAt' ) ).getTime();
};

vu.methods.cookieToContext = function( vestu , context ){
    var member = vestu.split( '|' );
    context.email = member[0];
    context.createdAt = member[1];
    context.updatedAt = member[2];
}

vu.methods.isMember = function( request , reply , context , callback ){
    //new session needed case
    //user has vestu login token, no session
    if( request.state.service != undefined && request.state.session == undefined ){
        //validate vestu and create session
        var member = request.state.service.split( '|' );
        vu.models.User.get( member[0] , function( err , user ){
        //INVALID USER
        if( user == null ){
            reply.unstate( 'service' ).unstate( 'session' );
            callback.guest( request , reply , context );
        }else{
            reply.state( 'session' , new Date().getTime() );
            vu.methods.cookieToContext( request.state.service , context );
            callback.member( request , reply , context );
        }
    });

    //existing session
    //user has vestu login token and session
    }else if( request.state.service != undefined && request.state.session != undefined ){
        vu.methods.cookieToContext( request.state.service , context );
        callback.member( request , reply , context );
        
    // no session or login token
    }else{
        callback.guest( request , reply , context );
    }
}


//////////////////////////////////////////////////////////
///SERVER ROUTES
//////////////////////////////////////////////////////////


// /home routes
require( './routes/home.js' )();

// /login routes
require( './routes/login.js' )();

// /register routes
require( './routes/register.js' )();

// /errors routes
require( './routes/errors.js' )();

// /assets routes
require( './routes/assets.js' )();

// /errors routes
require( './routes/misc.js' )();



vu.server.start( function () {
    console.log( 'Server running at:' , vu.server.info.uri );
});
