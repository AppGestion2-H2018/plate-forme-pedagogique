var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

const COOKIE_DA_NAME = 'auth_da';
const COOKIE_TOKEN_NAME = 'auth_token';

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


// ROUTES PRINCIPALES POUR LA GESTION DES TOKENS AVEC LES COOKIES

// Nouvelle connexion
router.get('/login/:id', function (req, res, next) {

    nouvelleConnexionBD(req.params.id).then(function (jsonConnexion) {
        res = ajouterLesCookies(res, DA, jsonConnexion.access_token.remember_token);
        res.json(jsonConnexion);
    });
});

// Tester si il est toujours bien connecté
router.get('/is', function (req, res, next) {

});

// Ajoute les cookies de connexion au client.
router.get('/obtenir', function (req, res, next) {
    res = ajouterLesCookies(res, 1234567, genererAccessToken().access_token.remember_token);
    res.send("Cookies ajouter!")
});

// Affiche les cookies actuelle du client
router.get('/afficher', function (req, res, next) {
    res.json(obtenirLesCookies(req));
});

// Supprime les tokens dans les cookies
router.get('/supprimer', function (req, res, next) {
    res = supprimerLesCookies(res);
    res.send("Cookies supprimer!");
});

// Obtient les informations de l'usager avec les informations du POST (ou des variables de session) et non grâce à l'URL.
/**
 * @deprecated
 */
router.get('/moncompte', function (req, res, next) {
    // Informations à retourner
    var reponse = {"default": "default"};

    // Obtient l'information du Token du client
    var Token = req.headers.token;

    // Obtient l'ID de l'utilisateur actuelle.
    var DA = req.headers.da;

    // Effectue la recherche...
    Utilisateur.find({da: {$eq: DA}, 'access_token.remember_token': {$eq: Token}}, {}, function (err, utilisateur) {
        if (err) {
            console.log("erreur : " + err.toString());
            reponse = {"message": "Une erreur est survenue"};
        } else {
            // Vérifier si il y a une réponse et une valeur seulement.
            if (utilisateur == null || utilisateur.length === 0) {
                reponse = {"message": "Aucun utilisateur de trouvé..."};
            }
            else if (!verificationAccessToken(utilisateur)) // Vérifier si le Token est toujours valide
            {
                reponse = {"message": "La connection n'est plus valide, redirection vers la page de connection!"};
            }
            else {

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
            }


            // Renvoie l'information
            res.json(reponse);
        }
    });
});

// Ajouter un nouvelle utilisateur
// SEULEMENT POUR FAIRE DES TESTS, À RETIRER PLLUS TARD
router.post('/ajouter', function (req, res, next) {
    var infoUtilisateur = {
        da: 1111111,
        nom: "Delaroche",
        prenom: "Caillou",
        courriel: "delaroche.caillou@carrefour.cegepvicto.ca",
        datedenaissance: Date.parse("1999-03-12"),
        codepermanent: "DELC12039905",
        programme: 4,
        sexe: "masculin",
        role: 2,
        motdepasse: "cailloualamaison",
        photo: ""
    };
    var utilisateur = new Utilisateur(infoUtilisateur);

    utilisateur.save(function (err, utilisateurFinal) {
        if (err) return res.send("Une erreur est survenue...");
        res.json(utilisateurFinal);
    });
});

// Renouvle le token du compte demandé
router.get('/login/:da', function (req, res, next) {
    var reponse = {"default": "default"};

    Utilisateur.find({da: {$eq: req.params.da}}, function (err, utilisateur) {
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

        res.json(reponse);
    });
});

//Renouvelle mon token
/**
 * @deprecated
 */
router.get('/renouvelle', function (req, res, next) {
    // Obtient le token
    var oldToken = req.headers.token;
    // Obtient le DA
    var DA = req.headers.da;

    obtenirTokenUtilisateurBD(DA).then(function (token) {
        res.json(token);

        //TODO: Updater la BD avec des nouveaux token
    });
});

// Obtient les informations de l'usager avec son DA
router.get('/:da', function (req, res, next) {
    Utilisateur.find({da: {$eq: req.params.da}}, function (err, utilisateur) {
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

    if (old_token === undefined || old_token.access_token === undefined) return false;

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

function obtenirTokenUtilisateurBD(DA) {
    // Effectue la recherche...
    return new Promise(function (resolve, reject) {
        Utilisateur.findOne({da: {$eq: DA}}, {_id: false, "access_token": true}, function (err, utilisateurToken) {
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
            resolve(reponseRetourner);
        }

        Utilisateur.findOne({da: {$eq: da}}, function (err, utilisateur) {
            if (err) return console.error(err);

            // Regarder si il a trouvé quelqu'un
            if (utilisateur === null || utilisateur.length === 0) {
                console.log("Aucun utilisateur de trouvé");
                resolve(reponseRetourner);
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
            res = ajouterLesCookies(res, da, nouveau_token['access_token'].remember_token);

            reponseRetourner[0] = res;
            reponseRetourner[1] = true;

            resolve(reponseRetourner);
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
            resolve(reponseRetourner);
        }

        const daClient = mesCookies[COOKIE_DA_NAME];
        const tokenClient = mesCookies[COOKIE_TOKEN_NAME];

        // Obtenir le token de l'usager dans la BD
        return obtenirTokenUtilisateurBD(daClient).then(function (tokenBD) {
            // Le vieux token est toujours valide ?
            if (verificationAccessToken(tokenBD)) {
                // Comparer les tokens
                if (comparerCleTokens(tokenBD, tokenClient)) {
                    // Si valide, créer nouveaux tokens et les envoyers au client et BD.
                    //TODO: Faire générer tokens et cookies
                    console.log("Renouvelage des tokens");
                    return nouvelleConnexionBD(daClient).then(function (nouveau_token) {
                        ajouterLesCookies(res, daClient, nouveau_token['access_token'].remember_token);
                        console.log("Les cookies sont ajouté");

                        reponseRetourner[0] = res;
                        reponseRetourner[1] = true;
                        resolve(reponseRetourner);
                    });


                } else {
                    console.log("La comparaison des 2 tokens à échoué");
                    // Si non valide, supprimer les cookies et enlever les tokens de la BD.
                    res = supprimerLesCookies(res);
                    // TODO: Retirer tokens de la BD
                    reponseRetourner[0] = res;
                    reponseRetourner[1] = false;
                    resolve(reponseRetourner);
                }
            } else {
                console.log("Les tokens de la BD sont invalide");
                // Les tokens ne sont plus valide, supprimer les cookies et Token BD
                res = supprimerLesCookies(res);
                // TODO: Retirer tokens de la BD
                reponseRetourner[0] = res;
                reponseRetourner[1] = false;
                resolve(reponseRetourner);
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
    res.clearCookie(COOKIE_DA_NAME, {path: '/'});
    res.clearCookie(COOKIE_TOKEN_NAME, {path: '/'});
    return res;
}

/**
 * Ajouter les informations de connexion dans les cookies du navigateur.
 * @param res
 * @param da
 * @param token
 * @returns {*}
 */
function ajouterLesCookies(res, da, token) {
    res.cookie(COOKIE_DA_NAME, da, {path: '/'});
    res.cookie(COOKIE_TOKEN_NAME, token, {path: '/'});
    return res;
}

/**
 * Obtient les informations de connexion dans les cookies du client.
 * @param req
 * @returns json | null
 */
function obtenirLesCookies(req) {
    var reponse = null;
    if (req.cookies !== undefined && req.cookies[COOKIE_DA_NAME] !== undefined && req.cookies[COOKIE_TOKEN_NAME] !== undefined) {
        reponse = {
            auth_da: req.cookies[COOKIE_DA_NAME],
            auth_token: req.cookies[COOKIE_TOKEN_NAME]
        };
    }
    return reponse;
}