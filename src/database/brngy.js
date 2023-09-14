const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'brngy';

async function insertBrngy(brngys) {
     try {
          const database = await getDatabase();
          const {insertedId} = await database.collection(collectionName).insertOne(brngys);
          return insertedId;
     } catch (error) {
          console.error('Error inserting barangay information', error);
          throw error;
     }
}


async function getBrngy() {
     const database = await getDatabase();
     return await database.collection(collectionName).find({}).toArray();
}


async function deleteBrngy(id) {
     const database = await getDatabase();
     await database.collection(collectionName).deleteOne({
       _id: new ObjectID(id),
     });
}


async function updateBrngy(id, brngy) {
     const database = await getDatabase();
     delete ad._id;
     await database.collection(collectionName).update(
       { _id: new ObjectID(id), },
       {
         $set: {
           ...brngy,
         },
       },
     );
}


module.exports = {
     insertBrngy,
     getBrngy,
     deleteBrngy,
     updateBrngy,
};