/// importer les packages
const express =  require("express");
const db = require("./src/api/database/db");
require("dotenv").config();
var cors = require('cors')
const PORT = process.env.PORT | 3000;
const app = express();
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(express.json(corsOptions));
app.use(cors())
app.get('/api/test', (req, res) => {
   res.json({message: "Test request"});
});

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connexion reussie");
}).catch( err => {
    console.log(err);
    process.exit();
});


// import routes
require("./src/api/routes/routes")(app);

app.listen(PORT, () => {
    console.log("Le serveur est demarré sur le port :" + PORT)
});
