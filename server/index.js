import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/keys";
import Promise from "bluebird";
import users from "./routes/users";
import auth from "./routes/auth";
import path from "path";

const app = express();

app.use(bodyParser.json());
mongoose.Promise = Promise;

// Connect to Mongo
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
 .then(() => console.log("MongoDB connected!.."))
 .catch(err => console.log("something went wrong!..", keys.mongoURI))

 //user Routes
 app.use("/api/users", users);
 app.use("/api/auth", auth);

 // Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
  
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log(`server listening on port : ${port}`));
