var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

// Test pour voir que ça fonctionne, à supprimer
router.get('/', function (req, res, next) {
    res.send(genererAccessToken());
});

// Obtenir tous les Utilisateurs
router.get('/all', function (req, res, next) {
    Utilisateur.find({}, {/*_id: 0, da: 1*/}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});

// Obtient les informations de l'usager avec les informations du POST (ou des variables de session) et non grâce à l'URL.
router.get('/moncompte', function (req, res, next) {
    // Informations à retourner
    var reponse = {"default": "default"};

    // Obtient l'information du Token du client
    var Token = "";

    // Obtient l'ID de l'utilisateur actuelle.
    var DA = 1111111;

    // Effectue la recherche...
    Utilisateur.find({'da': DA/*, 'access_token': {'remember_token': Token}*/}, {}, function (err, utilisateur) {
        if (err) {
            reponse = {"message": "Une erreur est survenue"};
        } else {
            // Vérifier si il y a une réponse et une valeur seulement.
            if (utilisateur.length === 0) {
                reponse = {"message": "Aucun utilisateur de trouvé..."};
            }
            else if (!verificationAccessToken(utilisateur)) // Vérifier si le Token est toujours valide
            {
                reponse = {"message": "La connection n'est plus valide, redirection vers la page de connection!"};
            }
            else {

                //TODO: Compléter la validation du token si il est valide!

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

    Utilisateur.find({'da': req.params.da}, function (err, utilisateur) {
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

// Obtient les informations de l'usager avec son DA
router.get('/:da', function (req, res, next) {
    Utilisateur.find({'da': req.params.da}, function (err, utilisateur) {
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
    if (old_token[0].access_token === undefined) return false;

    var token = old_token[0].access_token;

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

function ajouterTokenDansJson(json, token) {
    json[0]["access_token"] = token["access_token"];
    return json;
}

function secondesEnJours(secondes) {
    return ((secondes / 60) / 60) / 24;
}