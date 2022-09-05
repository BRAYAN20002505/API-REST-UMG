
let express = require('express')
let app = express();
let studentRepo = require('./src/alumnos');
let mysqlConnection = require('./database');
let randomToken = require('./rand');


let router = express.Router();
 

app.use(express.json());



//Mysql GET Method
router.get('/', function (req, res, next) {
  studentRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All students retrieved.",
      "data": data
    });
  }, function (err) {
    next(err);
  });
});

//MYSQL GET by ID method
router.get('/:id', function (req, res, next) {
  studentRepo.getByid(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved.",
        "data": data
       
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function (err) {
    next(err);
  });
}); 


  router.get('/search', function (req, res, next) {
    let searchObject = {
      "id": req.query.id,
      "name": req.query.name
    };
  
    studentRepo.search(searchObject, function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All students retrieved.",
        "data": data
      });
    }, function (err) {
      next(err);
    });
  });

 //POST METHOD mysql  
router.post('/',  (req, res) => {
  
  const { nombre, carrera, año, correlativo} = req.body;
 
  var token = randomToken(8);
  const query = 'INSERT INTO alumnosdb (nombre, carrera, año, correlativo, token) VALUES (?, ?, ?, ?, ?);';

  mysqlConnection.query(query, [nombre, carrera, año, correlativo, token], (err, data, fields) => {
      if(!err){
        "token " + token
        res.status(201).json({
          "status": 201, //Confirmation for post is 201
          "statusText": "Created",
          "message": "New Student Added",
          "token": token,
          "data": data 
          
          
        })
        
      }
        else {
          reject(err);
        }

  });
});



//PUT method
router.put('/:id', function (req, res, next) {
  studentRepo.getByid(req.params.id, function (data) {
    if (data) {
    studentRepo.update(req.body, req.params.id, function (data) {
      res.status(200).jsonp({
        "status": 200,
        "statusText": "OK",
        "message": "Student '" + req.params.id +"' updated.",
        "data": data 
      })
    })
              }
    else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The Student '" + req.params.id +"' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The Student '" + req.params.id +"' could not be found."
        }
      })
    }
    })
})

//DELETE Method
router.delete('/:id', function(req, res, next) {
studentRepo.getByid(req.params.id, function(data) {
  if (data) {

    studentRepo.delete(req.params.id, function(data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "The Student '" + req.params.id +"' was successfully deleted successfully",
        "data": "Student '" + req.params.id +"'deleted."
      })
    })
  }
  
  else {
    res.status(404).json({
      "status": 404,
      "statusText": "Not Found",
      "message": "The Student '" + req.params.id +"' could not be found.",
      "error": {
        "code": "NOT_FOUND",
        "message": "The Student '" + req.params.id +"' could not be found."
                        }
                      }); 
      }

}, function (err) {
  next(err);
});

});


router.patch('/:id', function (req, res) {
  studentRepo.getByid(req.params.id, function (data) {
    if (data) {

      studentRepo.update(req.body, req.params.id, function (data){
        res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Student '" + req.params.id +"' Patched.",
        "data": data 
        })
      })
    }
    else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The Student '" + req.params.id +"' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The Student '" + req.params.id +"' could not be found."
        }})
      }
  })
})


app.use('/api/', router);


app.use(errorHelper.logErrors);

app.use(errorHelper.clientErrorHandler);

app.use(errorHelper.errorHandler);



//This is called insted of the exception middleware that comes with Express, overriding the default
app.use(function(err, req, res, next) {

  res.status(500).json(errorBuilder(err));
});


let port = 5000;
var server = app.listen(port, function() {  
    console.log('Node Server is running on http://localhost:'+ port);
});




  

