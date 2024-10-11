const db = require('../database/db');
const Course = db.courses;
// Créer une course
exports.create =  async (req, res) => {
    const { departureAddress, arrivalAddress, user } = req.body;

    try {
        const newCourse = new Course({ departureAddress, arrivalAddress, user });
        await newCourse.save();
        res.json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour l'état d'une course
exports.update = async (req, res) => {
    const { status } = req.body;

    try {
        const course = await Course.findById(req.params.id).populate({ path: 'user',  model: 'User'});
        if (!course) return res.status(404).json({ message: 'Course non trouvée' });

        course.status = status; // Mettre à jour l'état de la course
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les courses
exports.show =  async (req, res) => {
    try {
        const courses = await Course.find().populate({ path: 'user',  model: 'User'});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.delete = async (req, res, next) => {    
    const id = req.params.id;
    if(!id) {
        res.send("Id est obligatoire").status(400);
    }

   await  Course.findByIdAndRemove(id).then(() => {
       res.send({message: "le course a ete suprrimé"});

    }).catch((error) => {
        console.log(error);
    });
}
// Delete all  from the database.
exports.deleteAll = (req, res) => {
  Course.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} course were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all course."
    });
  });
};
