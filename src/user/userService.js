var userModel = require('./userModel');

module.exports.getDataFromDBService = () => {

    return new Promise(function checkURL(resolve, reject) {
 
        userModel.find({})
            .then(result => {
            resolve(result);
        })
            .catch(error => {
            reject(false);
        });

    });
 
 }

 module.exports.createUserDBService = (userDetails) => {


    return new Promise(function myFn(resolve, reject) {
 
        var userModelData = new userModel();
 
        userModelData.title = userDetails.title;
        userModelData.description = userDetails.description;
        userModelData.duedate = userDetails.duedate;

        userModelData.save()
            .then(result => {
            resolve(true);
        })
             .catch(error => {
              reject(false);
        });
 
    });
 
 }


 module.exports.updateUserDBService = (id,userDetails) => {     
    console.log(userDetails);
    return new Promise(function myFn(resolve, reject) {
        userModel.findOneAndUpdate({ _id: id }, userDetails, { new: true })
        .then(result => {
            if (!result) {
                 reject(false);
            } else {
                resolve(result);
            }
    })
        .catch(error => {
            reject(false);
         });
 
    });
 }

 module.exports.removeUserDBService = (id) => { 
    return new Promise(function myFn(resolve, reject) {
        userModel.findOneAndDelete({ _id: id })
            .then(result => {
                if (!result) {
                reject(false);
            } else{
            resolve(result);
            }
        })
            .catch(error => {
             reject(false);
        });

    });
 
 }