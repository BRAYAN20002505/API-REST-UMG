const e = require('express');
const { response } = require('express');
let fs = require('fs');
let mysqlConnection = require('../database');


const FILE_NAME = './assets/Students.json';

let StudentRepo = {
    get: function (resolve, reject) 
    {
        mysqlConnection.query('SELECT * FROM testumg.alumnosdb;', (err,data , fields) => 
        {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    },

    getByid: function (id, resolve, reject) {
        mysqlConnection.query('SELECT * FROM testumg.alumnosdb WHERE correlativo = ?', [id], (err, data, fields) =>  {
            if (!err) {
               let student =  data.find(p => p.correlativo == id);
               resolve(student);
        }
        else {
            reject(err);
    }
});
},

search: function (searchObject,resolve, reject){
    fs.readFile(FILE_NAME, function (err,data) {
        if (err) {
            reject(err);
        }
        else{
            let Students = JSON.parse(data);
            //Perform search
            if(searchObject) {
            //Example search object
            //let SearchObject = {
            // "id": 1,
            // "name": 'A'
            //};
            Students = Students.filter(
                p => (searchObject.id ? p.id == searchObject.id : true) && 
                (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >=  0 : true));
            }
            resolve(Students);
        }

    } //fs read
)
},//Search

//Insert Method
insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
        if (err){
            reject(err);
        }
        else {
            //We parse the data turning JSON into string 
            let Students = JSON.parse(data);
            //we push the object into the array
            Students.push(newData);
            fs.writeFile(FILE_NAME, JSON.stringify(Students), function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(newData);
                }

            })
        }

    })//fs read
}//INSERT
,

update: function (newData, id, resolve, reject) {
fs.readFile(FILE_NAME, function (err, data) {
if (err) {
    reject(err);
}
else {
    let Students = JSON.parse(data);
    let Student = Students.find(p => p.id == id);
    if (Student) {
        Object.assign(Student, newData);
        fs.writeFile(FILE_NAME, JSON.stringify(Students), function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(newData);
            }
        });
    }
}

});//fs

}//Update
,

//Delete
delete:function(id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
        if (err) {
            reject(err);
        }
        else{
            //convert the data into a Students array
            let Students = JSON.parse(data);
            //find index of the item to be removed using the id 
            let index = Students.findIndex(p => p.id == id);
            //if we can find the item, remove it
            if (index != -1) {
                Students.splice(index, 1);
                fs.writeFile(FILE_NAME, JSON.stringify(Students), function (err){
                    if (err) {
                        reject (err);
                    }
                    else{
                        resolve(index);
                    }
                })
            }
        }
    })

}//Delete


//Final closing key
};

module.exports = StudentRepo;