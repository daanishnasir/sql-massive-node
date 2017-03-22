const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');

const connectionString = "postgres://daanishnasir@localhost/Massive-Node";

const massiveConnect = massive.connectSync({
    connectionString: connectionString

});
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); //going to let everyone through
app.use(session({
    secret: 'keyboard cat'
})); //helps with security, should be uniqie & long






app.set('db', massiveConnect)
const db = app.get('db');


//
// db.create_taco(["Texan Taco", "From Texas", 50, "texantaco.url"], function(err, newTaco){
//   console.log(err);
//   console.log(newTaco);
// });
//
// db.read_all_tacos(function(err,allTacos){
//   console.log(err);
//   console.log(allTacos);
// });
//
// db.one_taco_data([2], function (err, readTaco){
//   console.log(err);
//   console.log(readTaco);
// });
//
// db.update_taco([5, 'The best taco in the world'], function(err, updatedTaco) {
//   console.log(err);
//   console.log(updatedTaco);
// });
//
// db.delete_taco([7], function(err, deletedTaco){
//   console.log(err);
//   console.log(deletedTaco);
// });
//


//ENDPOINTS

app.get('/', function(req,res){
  db.read_all_tacos(function(err, tacos){
    console.log('HELLO FROM GETTING TACOS!');
    console.log("All tacos", tacos)
    if(err){
      return res.status(500).json(err);

    }
    return res.status(200).json(tacos);
  });
});



app.post('/', function(req,res){
  db.create_taco([req.body.name, req.body.description, req.body.price, req.body.imageurl] , function(err, newTaco){
      console.log(err);
      console.log(newTaco);
      if (err){
          return res.status(500).json(err);
      }
      return res.status(200).json(newTaco);
  });
});


app.put('/', function(req,res){
  db.update_taco([req.body.tacoid, req.body.description], function(err, updatedTaco){
    if(err){
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(updatedTaco);
    return res.status(200).json(updatedTaco);
  });
});


app.delete('/:tacoid', function(req,res){
  db.delete_taco(req.params.tacoid, function(err, removedTaco){
    if(err){
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(removedTaco);
  });
});






app.listen(port, () => {
  console.log(`You are liserning on ${port}`)
});
