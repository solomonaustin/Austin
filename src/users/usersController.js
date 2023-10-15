let usersService = require('./usersService');

let get = async (req, res) => {
    if (req.params.id) {
        console.log(req.params.id);
        console.log(req.body);
        let employee = await usersService.getDataFromDBService(req.params.id, req.body);
        res.send({ "status": true, "data": employee });
    } else {
        let employee = await usersService.getDataFromDBService();
        res.send({ "status": true, "data": employee });
    }
}
let create = async (req, res) => 
{
    let status = await usersService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}

let update = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    let result = await usersService.updateUserDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "User Updated"} );
     } else {
         res.send({ "status": false, "message": "User Updated Failed" });
     }
}

let terminate = async (req, res) => 
{
     console.log(req.params.id);
     let result = await usersService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "User Deleted"} );
     } else {
         res.send({ "status": false, "message": "User Deleted Failed" });
     }
}
module.exports = { get, create, update, terminate };