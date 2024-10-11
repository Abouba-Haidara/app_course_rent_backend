module.exports =  app => {

    const router = require("express").Router();
    const usersController  = require("../controller/user.controller"); 
    const coursesController  = require("../controller/course.controller"); 
    // inscription
    router.post('/users/register', usersController.create);
    // connexion
    router.post('/users/login', usersController.login);
    router.delete('/users', usersController.deleteAll);
    // afficher tous les utilisateurs
    router.get('/users', usersController.show);
    // afficher un utilisateur par son id 
    router.get('/users/:id', usersController.showUserById);
    // supprimer un utilisateur par son id
    router.delete("/users/:id", usersController.delete );
    // modifier un utilisateur par son id  (PUT)
    router.put("/users/:id", usersController.update);
    // afficher tous les courses
    router.post('/courses', coursesController.create);
    //
    router.delete('/courses', coursesController.deleteAll);
    // afficher les courses
    router.get('/courses', coursesController.show);
    // modifier le statut d'une course par son id (PATCH)
    router.patch("/courses/:id/status", coursesController.update);
    // route pour toutes les routes du API  (ex : ../api/users)
    app.use('/api/', router);
}
