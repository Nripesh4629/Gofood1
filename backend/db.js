const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://goFood:gofood%401@cluster0.wenqc.mongodb.net/goFood'
const mongoDB = async () => {
    await mongoose.connect(mongoURL, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("food_collections");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.food_collections = catData;
                    }
                })
                // if(err) console.log(err);
                // else global.food_items = data;
            })
        }
    });

}
module.exports = mongoDB;