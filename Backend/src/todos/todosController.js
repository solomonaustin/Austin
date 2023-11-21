const todosService = require('./todosService');

const get = async (req, res) => {
    try {
        if (req.params.id) {
            console.log(req.params.id);
            console.log(req.body);
            const todos = await todosService.getAll( req.body);
            res.send({ "status": true, "data": todos });
        } else {
            const todos = await todosService.getDataFromDBService();
            res.send({ "status": true, "data": todos });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};

const create = async (req, res) => {
    try {
        const status = await todosService.createtodosDBService(req.body);
        if (status) {
            res.send({ "status": true, "message": "User created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating user" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};

const update = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const result = await todosService.updatetodosDBService(req.params.id, req.body);

        if (result) {
            res.send({ "status": true, "message": "User Updated" });
        } else {
            res.send({ "status": false, "message": "User Updated Failed" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};

const terminate = async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await todosService.removetodosDBService(req.params.id);
        if (result) {
            res.send({ "status": true, "message": "User Deleted" });
        } else {
            res.send({ "status": false, "message": "User Deleted Failed" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};

module.exports = { get, create, update, terminate };
