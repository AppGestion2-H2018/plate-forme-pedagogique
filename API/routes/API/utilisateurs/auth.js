var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

var mongoose = require('mongoose');

const COOKIE_DA_NAME = 'auth_da';
const COOKIE_TOKEN_NAME = 'auth_token';
const COOKIE_ID_NAME = 'auth_id';

// Test pour voir que ça fonctionne, à supprimer
router.get('/', function (req, res, next) {
    res.clearCookie(COOKIE_DA_NAME, {path: '/'});
    res.clearCookie(COOKIE_TOKEN_NAME, {path: '/'});
    res.cookie(COOKIE_DA_NAME, req.cookies[COOKIE_DA_NAME]);
    res.cookie(COOKIE_TOKEN_NAME, req.cookies[COOKIE_TOKEN_NAME]);
    res.json({"message": req.cookies[COOKIE_TOKEN_NAME]});
});

// Obtenir tous les Utilisateurs
router.get('/all', function (req, res, next) {
    Utilisateur.find({}, {}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});

module.exports = router;


// ********************************** MÉTHODES D'AUTOMATISATION ***************************************

/**
 * Vérifie si l'ancien token est toujours valide.
 * Retourne True si il est toujours valide, sinon False.
 * @param old_token
 * @returns {boolean}
 */
function verificationAccessToken(old_token) {
    // Vérifier si il y a la présence d'un Token
    if (old_token === undefined || old_token === null || old_token.access_token === null || old_token.access_token === undefined) return false;

//    var token = old_token[0].access_token;
    var token = old_token.access_token;

    // Vérifier que toutes les clés sont présente
    if (token.remember_token === undefined) return false;
    if (token.token_type === undefined) return false;
    if (token.expires_in === undefined) return false;
    if (token.created_at === undefined) return false;

    // Vérification de la date
    var dateToken = token.created_at;
    var numberOfDays = secondesEnJours(token.expires_in);
    dateToken.setDate(dateToken.getDate() + numberOfDays);

    // Regarde si le token n'a pas expiré
    var dateAuj = new Date(Date.now());

    // Si la date du token dépasse, sa veux dire qu'il est expiré
    if (dateToken.getFullYear() <= dateAuj.getFullYear() && dateToken.getMonth() <= dateAuj.getMonth() && dateToken.getDate() <= dateAuj.getDate()) {
        return false;
    }

    return true;
}

function genererAccessToken() {
    var nouveau_access_token = {"": ""};

    // remember_token
    var remember_token = creerToken();
    // token_type (berear)
    var token_type = "bearer";
    //expires_in (en seconde) (30 jours)
    var expires_in = 2592000;
    // created_at (aujourd'hui)
    var created_at = Date.now();

    // Créer le token
    nouveau_access_token = {
        access_token: {
            remember_token: remember_token,
            token_type: token_type,
            expires_in: expires_in,
            created_at: created_at
        }
    };

    return nouveau_access_token;
}

function creerToken() {
    var token = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 40; i++) {
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return token;
}

/**
 *
 * @param json
 * @param token
 * @returns {*}
 */
function ajouterTokenDansJson(json, token) {
    json[0]["access_token"] = token["access_token"];
    return json;
}

/**
 * Convertie le nombre de seconde en nombre de jours entier.
 * @param secondes
 * @returns {number} (en entier)
 */
function secondesEnJours(secondes) {
    return Math.floor(((secondes / 60) / 60) / 24);
}

function obtenirTokenUtilisateurBD(ID, DA) {
    // Effectue la recherche...
    return new Promise(function (resolve, reject) {
        Utilisateur.findOne({da: {$eq: DA}, _id: {$eq: ID}}, {
            _id: false,
            "access_token": true
        }, function (err, utilisateurToken) {
            var reponse = null;
            if (err) {
                reponse = null;
                //reject(reponse);
            } else {
                // Vérifier si il y a une réponse et une valeur seulement.
                if (utilisateurToken == null || utilisateurToken.length === 0) {
                    reponse = null;
                }
                else {
                    reponse = utilisateurToken;
                }
            }
            resolve(reponse);
        });
    });
}

/**
 * Gestion complète des cookies lors d'une nouvelle connexion.
 * @param req
 * @param res
 * @param da
 * @constructor
 */
GestionCompleteDesNouveauxLogin = function (req, res, da) {
    return new Promise(function (resolve, reject) {
        var reponseRetourner = [res, false];

        // Obtenir les données de login
        // Cela inclu le DA
        if (da === undefined || da === null) {
            console.log("Aucun DA");
            return resolve(reponseRetourner);
        }

        Utilisateur.findOne({da: {$eq: da}}, function (err, utilisateur) {
            if (err) return console.error(err);

            // Regarder si il a trouvé quelqu'un
            if (utilisateur === null || utilisateur.length === 0) {
                console.log("Aucun utilisateur de trouvé");
                return resolve(reponseRetourner);
            }

            // Générer les nouveaux tokens
            var nouveau_token = genererAccessToken();

            // Envoyer les tokens à l'utilisateur de la BD.
            Utilisateur.update({_id: utilisateur['_id']}, {
                    $set: {
                        access_token:
                            {
                                remember_token: nouveau_token['access_token'].remember_token,
                                token_type: nouveau_token['access_token'].token_type,
                                expires_in: nouveau_token['access_token'].expires_in,
                                created_at: nouveau_token['access_token'].created_at
                            }
                    }
                },
                function (err, raw) {
                    if (err) {
                        console.log("Error log: " + err);
                    }
                }
            );


            // Ajouter le nouveau token dans les cookies.
            res = ajouterLesCookiesReussi(res, da, nouveau_token['access_token'].remember_token, utilisateur['_id']);

            reponseRetourner[0] = res;
            reponseRetourner[1] = true;

            return resolve(reponseRetourner);
        });
    });
};

/**
 * Gestion complète de cookies et de ce qu'il va faire avec.
 * @param res
 * @param req
 * @constructor
 */
GestionCompleteDesCookiesEtDesDonneesDeConnexion = function (req, res) {
    return new Promise(function (resolve, reject) {
        var reponseRetourner = [res, false];
        // Voir si daClient et tokenClient sont valide
        // SI cookies valide
        const mesCookies = obtenirLesCookies(req);
        if (mesCookies == null) {
            console.log("J'ai pas de cookies");
            res = ajouterLesCookiesEchec(res);
            res.status(401);
            reponseRetourner[0] = res;
            reponseRetourner[1] = false;
            return resolve(reponseRetourner);
        }

        const daClient = mesCookies[COOKIE_DA_NAME];
        const tokenClient = mesCookies[COOKIE_TOKEN_NAME];
        const idClient = mesCookies[COOKIE_ID_NAME];

        // Obtenir le token de l'usager dans la BD
        return obtenirTokenUtilisateurBD(idClient, daClient).then(function (tokenBD) {
            // Le vieux token est toujours valide ?
            if (verificationAccessToken(tokenBD)) {
                // Comparer les tokens
                if (comparerCleTokens(tokenBD, tokenClient)) {
                    // Si valide, créer nouveaux tokens et les envoyers au client et BD.

                    // ON NE VA PAS RENOUVELLER LES TOKENS SI ILS SONT VALIDE
                    // console.log("Renouvelage des tokens");
                    // return nouvelleConnexionBD(daClient).then(function (nouveau_token) {
                    //     res = ajouterLesCookiesReussi(res, daClient, nouveau_token['access_token'].remember_token, idClient);
                    //     console.log("Les cookies sont ajouté");
                    //
                    //     reponseRetourner[0] = res;
                    //     reponseRetourner[1] = true;
                    //     resolve(reponseRetourner);
                    // });

                    res = ajouterLesCookiesReussi(res, daClient, tokenClient, idClient);
                    reponseRetourner[0] = res;
                    reponseRetourner[1] = true;
                    return resolve(reponseRetourner);

                } else {
                    console.log("La comparaison des 2 tokens à échoué");
                    // Si non valide, supprimer les cookies et enlever les tokens de la BD.
                    res = supprimerLesCookies(res);
                    res = ajouterLesCookiesEchec(res);
                    // TODO: Retirer tokens de la BD
                    res.status(401);
                    reponseRetourner[0] = res;
                    reponseRetourner[1] = false;
                    return resolve(reponseRetourner);
                }
            } else {
                console.log("Les tokens de la BD sont invalide");
                // Les tokens ne sont plus valide, supprimer les cookies et Token BD
                res = supprimerLesCookies(res);
                res = ajouterLesCookiesEchec(res);
                // TODO: Retirer tokens de la BD
                res.status(401);
                reponseRetourner[0] = res;
                reponseRetourner[1] = false;
                return resolve(reponseRetourner);
            }
        });

    });

};

function comparerCleTokens(tokenPrincipal, tokenSecondaire) {
    return tokenPrincipal.access_token.remember_token === tokenSecondaire;
}

/**
 * Renouvelle les tokens de l'usager dans la BD
 * @param DA
 */
function nouvelleConnexionBD(DA) {
    //TODO: Rendu ici
    return new Promise(function (resolve, reject) {
        Utilisateur.find({da: {$eq: DA}}, function (err, utilisateur) {
            if (err) return console.error(err);

            // Générer et donner le nouveau token
            var nouveau_token = genererAccessToken();

            reponse = utilisateur;

            reponse = ajouterTokenDansJson(reponse, nouveau_token);

            Utilisateur.update({_id: utilisateur[0]['_id']}, {
                    $set: {
                        access_token:
                            {
                                remember_token: nouveau_token['access_token'].remember_token,
                                token_type: nouveau_token['access_token'].token_type,
                                expires_in: nouveau_token['access_token'].expires_in,
                                created_at: nouveau_token['access_token'].created_at
                            }
                    }
                },
                function (err, raw) {
                    if (err) {
                        console.log("Error log: " + err);
                    } else {
                        console.log("Token updated : " + raw);
                    }
                }
            );

            resolve(nouveau_token);
        })
    });
}

/**
 * Supprime les cookies du navigateur client.
 * @param res
 * @returns {*}
 */
function supprimerLesCookies(res) {
    //TODO : À modifier
    //res.clearCookie(COOKIE_DA_NAME, {path: '/'});
    //res.clearCookie(COOKIE_TOKEN_NAME, {path: '/'});
    return res;
}

/**
 * Ajouter les informations de connexion dans les cookies du navigateur.
 * @param res
 * @param da
 * @param token
 * @param id
 * @param success
 * @returns {*}
 */
function ajouterLesCookies(res, da, token, id, success) {
    res.header('access-control-expose-headers', 'auth_xsrf_protection,auth_xsrf_success,auth_da,auth_token,auth_id');
    res.header('auth_xsrf_protection', 'auth_xsrf_token');
    res.header('auth_xsrf_success', success);
    res.header(COOKIE_DA_NAME, da);
    res.header(COOKIE_TOKEN_NAME, token);
    res.header(COOKIE_ID_NAME, id);
    return res;
}

function ajouterLesCookiesReussi(res, da, token, id) {
    return ajouterLesCookies(res, da, token, id, true);
}

function ajouterLesCookiesEchec(res) {
    return ajouterLesCookies(res, '', '', '', false);
}

/**
 * Obtient les informations de connexion dans les cookies du client.
 * @param req
 * @returns json | null
 */
function obtenirLesCookies(req) {
    var reponse = null;
    if (req.headers !== undefined &&
        stringCookiesValidation(req.headers[COOKIE_DA_NAME]) &&
        stringCookiesValidation(req.headers[COOKIE_TOKEN_NAME]) &&
        stringCookiesValidation(req.headers[COOKIE_ID_NAME])
    ) {

        if (mongoose.Types.ObjectId.isValid(req.headers[COOKIE_ID_NAME])) {
            reponse = {
                auth_da: req.headers[COOKIE_DA_NAME],
                auth_token: req.headers[COOKIE_TOKEN_NAME],
                auth_id: req.headers[COOKIE_ID_NAME]
            };
        }
    }
    return reponse;
}

function stringCookiesValidation(value) {
    return value !== undefined && value !== null && value !== "null";
}