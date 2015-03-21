/**
 * Local environment settings
 *
 * While you're developing your app, this config file should include
 * any settings specifically for your development computer (db passwords, etc.)
 * When you're ready to deploy your app in production, you can use this file
 * for configuration options on the server where it will be deployed.
 *
 *
 * PLEASE NOTE:
 *    This file is included in your .gitignore, so if you're using git
 *    as a version control solution for your Sails app, keep in mind that
 *    this file won't be committed to your repository!
 *
 *    Good news is, that means you can specify configuration for your local
 *    machine in this file without inadvertently committing personal information
 *    (like database passwords) to the repo.  Plus, this prevents other members
 *    of your team from commiting their local configuration changes on top of yours.
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#documentation
 */

module.exports = {

    // The `port` setting determines which TCP port your app will be deployed on
    // Ports are a transport-layer concept designed to allow many different
    // networking applications run at the same time on a single computer.
    // More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)
    // 
    // By default, if it's set, Sails uses the `PORT` environment variable.
    // Otherwise it falls back to port 1337.
    //
    // In production, you'll probably want to change this setting 
    // to 80 (http://) or 443 (https://) if you have an SSL certificate

    port: process.env.PORT || 1337,

    orm: {
        _hookTimeout: 1000000,
    },
    pubsub: {
        _hookTimeout: 10000000,
    },
    connections: {
        nedb: {
            adapter: 'waterline-nedb',

            dbPath: 'db/nedb', // Required, set to an empty directory for a new project

            // Optional options:
            inMemoryOnly: false // Enable in memory (no file access) mode.

        },
        localdb: {
            adapter: 'sails-mysql',
            host: '127.0.0.1',
            user: 'root',
            port: 3309,
            password: '3Hmz5u2d552Mk',
            database: 'snaps',
            connectTimeout: 600000,
            // waitForConnections: false,
            pool: false
        },
    },
    models: {
        // alter database, at least trying
        migrate: 'safe',
        connection: 'nedb',
        schema: true
    },
    // sockets: {
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

};
