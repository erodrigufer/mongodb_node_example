import mongoose from "mongoose";


const db_url = "mongodb://localhost/example"
mongoose.connect(db_url)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB: ', err))

