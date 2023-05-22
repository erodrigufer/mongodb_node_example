import mongoose from "mongoose";


const db_url = "mongodb://localhost/example"
mongoose.connect(db_url)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB: ', err))

// First create a schema, then compile the schema with the
// model() method to create a Class from which you can then
// create further objects.
const tennisPlayerSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    world_ranking_position: Number,
    active: Boolean,
});

// The first argument of the model() method names the collection
// in which the object following this schema will be stored.
const Player = mongoose.model('players', tennisPlayerSchema);

// const createPlayer = async ()=> {
// const player = new Player({
//     name: 'Boris Becker',
//     nationality: 'DE',
//     // world_ranking_position: 500,
//     active: false,
// });


//     try{
//     const result = await player.save();
//     console.log('Stored player in DB. ', result)
//     }
//     catch (err){
//         console.error(err)
//     }
    
// }

// createPlayer()

const getAllPlayers = async () => {
    const players = await Player
    .find()
    console.log(players);
}

getAllPlayers();

const getPlayers = async () => {
    const players = await Player
    .find({nationality: 'SPA'})
    .limit(10)
    .sort({name: 1}) // Sort by name.
    .select({name: 1}); // Only display names.
    console.log(players)
}


getPlayers();

// MongoDB comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte
// lt
// lte (less than or equal to)
// in
// nin (not in)

const getTop10Players = async () => {
    const top10Players = await Player
    .find({ world_ranking_position: {$lte: 10}})
    .sort({name:1})
    console.log(top10Players)
}

getTop10Players();

async function updatePlayerInactive(id: string) {
    const result = await Player.updateOne({_id: id}, {
        $set: {
            active: false
        }
    });

    console.log(result);
}

updatePlayerInactive('646782a234dbc2c0bedf785e'); // Rafael Nadal