const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mashriq')
  .then(async () => {
    const db = mongoose.connection.db;
    const collection = db.collection('menus');
    
    // Check what's in the DB
    const items = await collection.find({}).toArray();
    console.log("Current DB items:");
    for (let item of items) {
      console.log(`- ${item.title}: ${item.imageUrl}`);
      
      // Fix Hummus & Warm Pita
      if (item.title === 'Hummus & Warm Pita') {
        await collection.updateOne(
          { _id: item._id },
          { $set: { imageUrl: '/images/mashriq_hummus.png' } }
        );
        console.log("  -> Updated to /images/mashriq_hummus.png");
      }
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
