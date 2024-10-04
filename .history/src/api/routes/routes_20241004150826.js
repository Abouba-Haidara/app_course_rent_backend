module.exports =  app => {

    const router = require("express").Router();

    const usersController  = require("../controller/user.controller"); 
    const coursesController  = require("../controller/course.controller"); 

    router.post('/users/register', usersController.create);

    router.post('/users/login', usersController.login);

    router.get('/users', usersController.show);

    router.get('/users/:id', usersController.);

    router.delete("/users/:id", usersController.delete );

    router.put("/users/:id", usersController.update);


    router.post('/courses', coursesController.create);
    router.post('/courses', coursesController.show);
    router.patch("/courses/:id/status", coursesController.update);


    app.use('/api/', router);

      

}