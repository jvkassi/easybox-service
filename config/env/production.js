/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

// var parse = require('url-parse'),
//     REDISCLOUD_URL = "redis://rediscloud:XktHNcGUiFmnO88M@pub-redis-16172.us-east-1-4.4.ec2.garantiadata.com:16172",
//     redis_url = parse(REDISCLOUD_URL);

// console.log(redis_url);


module.exports = {
    // port: process.env.OPENSHIFT_NODEJS_PORT || 1337,
    // host: process.env.OPENSHIFT_NODEJS_IP,


    gulp: {
        _hookTimeout: 1000000,
    },
    connections: {
        ictdb: {
            adapter: 'sails-mysql',
            host: 'mail.it-academy.ci',
            user: 'snapchat',
            password: 'snapchat@@',
            database: 'snaps'
        },
        awsdb: {
             adapter: 'sails-mysql',
            host: 'devdb.c249i99bv9ix.us-west-2.rds.amazonaws.com',
            user: 'snap',
            password: 'L17VpL2kzV',
            database: 'snaps'
            
        }

    },
    models: {
        migrate: 'alter',
        connection: 'awsdb',
        schema: true
    },
    //   sockets: {
    //     adapter: 'redis',
    //     host: '127.0.0.1',
    //     port: 6399,
    //     db: 'sails',
    //     // pass: '<redis auth password>'

    // },
    // session: {
    //     adapter: 'redis',

    //     host: 'localhost',
    //     port: 6399,
    //     db: 'sails',
    //     prefix: 'sess:'

    // }
    // sockets: {
    //     adapter: 'redis',
    //     host: redis_url.hostname,
    //     port: redis_url.port,
    //     // prefix: 'sess:',
    //     pass: redis_url.password

    // },
    // session: {
    //     adapter: 'redis',
    //     host: redis_url.hostname,
    //     port: redis_url.port,
    //     // prefix: 'sess:',
    //     pass: redis_url.password

    // }  google: {




};
