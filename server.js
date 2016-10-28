const MongoClient = require('mongodb').MongoClient;

const bonjour = require('bonjour')();

const {
  MONGODB
} = process.env;

const browser = bonjour.find({});

MongoClient.connect(MONGODB, (err, db)=> {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const bonjourActivity = db.collection('bonjour-activity');
  db.unref();

  browser.on('up', service => {
    console.log('up', service);
    bonjourActivity.insertOne(Object.assign({}, service, {
      event: 'up'
    }));
  });

  browser.on('down', service => {
    bonjourActivity.insertOne(Object.assign({}, service, {
      event: 'down'
    }));
  });

});



