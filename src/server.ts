// import { Types } from "mongoose";
import mongoose from "mongoose";


// 'example' is the name of the db within the local mongodb instance.
const db_url = "mongodb://localhost/example"
mongoose.connect(db_url)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB: ', err))

// Available countries acronyms
const CountriesList = [ 'SPA', 'DE', 'HR', 'CH', 'GB', 'AUS', 'ITA', 'ARG', 'RUS'];

interface IPlayer{
    name: string;
    nationality: string;
    world_ranking_position: number;
    active?: boolean;
}

// First create a schema, then compile the schema with the
// model() method to create a Class from which you can then
// create further objects.
const tennisPlayerSchema = new mongoose.Schema<IPlayer>({
    name: { type: String, required: true},
    nationality: { 
        type: String, 
        // If country acronyms is not in array, validation will fail.
        enum: CountriesList, 
        required: true},
    world_ranking_position: { type: Number, required: false},
    active: {
        type: Boolean,
        required: true,
    }
});

// The first argument of the model() method names the collection
// in which the object following this schema will be stored.
const Player = mongoose.model('players', tennisPlayerSchema);

const createPlayer = async ()=> {
const player = new Player({
    name: 'Juan Martin del Potro',
    nationality: 'ARG',
    active: false,
});


    try{
    const result = await player.save();
    console.log('Stored player in DB. ', result)
    }
    catch (err){
        console.error(err)
    }
    
}

createPlayer()

const getAllPlayers = async () => {
    const players = await Player
    .find()
    console.log("Get All players: ", players);
}

getAllPlayers();

const getPlayers = async () => {
    const players = await Player
    .find({nationality: 'CH'})
    .limit(10)
    .sort({name: 1}) // Sort by name.
    .select({name: 1}); // Only display names.
    console.log("Get Swiss players: ", players)
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
    console.log("Top 10 players: ", top10Players)
}

getTop10Players();

// async function updatePlayerInactive(id: Types.ObjectId) {
//     const result = await Player.updateOne({_id: id}, {
//         $set: {
//             active: false
//         }
//     });

//     console.log("Update Player active status: ", result);
// }

// updatePlayerInactive(new Types.ObjectId('6467a2d46cea48979fa43f3f')); 