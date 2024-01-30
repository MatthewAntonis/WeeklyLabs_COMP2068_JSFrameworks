import express from "express";
import PageRoutes from "./routes/pageRoutes.js";
import CardRoutes from "./routes/CardRoutes.js";
import FeaturesRoutes from "./routes/FeaturesRoutes.js"; 
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//Connect to Mongo using Mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.amaxzic.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.info("MongoDB Connected"))
    .catch(error => console.error(error));
    
const  app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use((req, _, next) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {        
        const method = req.body._method;

        delete req.body._method;

        req.method = method;
    }

    next();
});

app.use("/", PageRoutes); 
app.use("/cards", CardRoutes);
app.use("/features", FeaturesRoutes);

app.use((error, _, res, __) => {
    if (typeof error === "string") {
        const error = new Error(error);
    }

    if (!error.status) error.status = 404;

    console.error(error);

    res.status(error.status).send(error.message);
});

export default app;