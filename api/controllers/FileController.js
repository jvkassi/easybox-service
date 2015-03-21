/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird'),
    ssh2 = require('ssh2'),

    connection = new ssh2();

module.exports = {
    list: function(req, res) {
        connection.on('error', function(err) {
            connection.end()
        });
        _ = require('lodash')

        var dir = 'backup/app/';
        var listFiles = [];

        // 
        connection.on('ready', function() {

            connection.sftp(function(err, sftp) {

            	// Lis le dossier
                sftp.readdir(dir, function(err, files) {
                    // console.log(files);
                    // Faie une boucle pour verifier si c'est un fichier ou dossier
                    _.forEach(files, function(file) {
                        // fstat.name = "file";
                        if (file.attrs.mode === 16877) {
                            file.type = 'dir'
                        } else {
                            file.attrs.mode = 'file'
                        }
                        // Ajoute le fichier a la laite
                        listFiles.push(file);

                    });
                    console.log(listFiles);

                    // Stop connexion

                    // Envoi le resultat
                    res.json(listFiles)
                    connection.end()

                })
            });
        });

        connection.connect({
            host: '192.168.65.235',
            user: 'jekas',
            password: 't00r@@'
        });

    }
};
