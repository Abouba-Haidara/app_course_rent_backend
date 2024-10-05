const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = db.users;

exports.create = async (req, res) => {
    const  u  = req.body || {};
    if(!u) {
        res.status(400).send({message: "Tous les informations sont obligatoire"});
    }
 
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(u.password, 10);

    const  user = new User({
        username: u.username,
        password: hashedPassword,
        email: u.email,
        status: "active",
    })

    user.save(user).then(() => {
        res.send({message: 'L inscription reussie avec succé', status: 200})
    }).catch(err => {
        console.error(err);
    })

}

exports.login =  async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

        // Génération du token
       // const token = jwt.sign({ id: user._id }, config.SECRET_KEY, { expiresIn: '1h' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.show= async (req, res, next) => {
User.find({}).then(users => {
    res.status(200).send(users);
}).catch(err => {
   console.log(err);
});
}

exports.showUserById= async (req, res, next) => {
    const id = req.params.id;
    if(!id) {
        res.send("Id est obligatoire").status(400);
    }
    await User.findById(id).then(user => { 
        res.send(user);
    })
    .catch(err => {
       console.log(err);
    });
};

exports.delete = async (req, res, next) => {    
    const id = req.params.id;
    if(!id) {
        res.send("Id est obligatoire").status(400);
    }

   await  User.findByIdAndRemove(id).then(() => {
       res.send({message: "le user a ete suprrimé"});

    }).catch((error) => {
        console.log(error);
    });
}

exports.update =  async (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.send("Id est obligatoire").status(400);
    }
    const username =  req.body.username;

    User.findOneAndUpdate(
        {
          _id: id
       },  
       {
        $set: {
           username: username
        }
    }, {new: true}, (err, data) => {
        if(err) {
            res.send("User non exitant").status(500);
        }
        if(data) {
            res.send({message: "La mise a jour est effective!"})
        }
      }
    
    ).catch(err => console.log(err));
};

// Delete all Annonce from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({ })
  .then(data => {
    res.send({
      message: `${data.deletedCount} users were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  });
};
