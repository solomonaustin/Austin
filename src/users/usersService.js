const usersModel = require('./usersModel');

// Read operation
module.exports.getDataFromDBService = async (id) => {
    try {
        if (!id) {
            const result = await usersModel.find({});
            return result;
        } else {
            const result = await usersModel.findOne({ _id: id });
            if (result) {
                return result;
            } else {
                throw 'User not found';
            }
        }
    } catch (error) {
        throw error;
    }
};

// Create operation
module.exports.createUserDBService = async (usersDetails) => {
    try {
        const usersModelData = new usersModel();
        usersModelData.title = usersDetails.title;
        usersModelData.description = usersDetails.description;
        usersModelData.duedate = usersDetails.duedate;

        await usersModelData.save();
        return true;
    } catch (error) {
        return false;
    }
};

// Update operation
module.exports.updateUserDBService = async (id, usersDetails) => {
    try {
        console.log(usersDetails);
        const result = await usersModel.findOneAndUpdate({ _id: id }, usersDetails, { new: true });
        if (!result) {
            throw new Error ('User not found');
        } else {
            return result;
        }
    } catch (error) {
        throw error;
    }
};

// Delete operation
module.exports.removeUserDBService = async (id) => {
    try {
        const result = await usersModel.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error( 'User not found');
        } else {
            return result;
        }
    } catch (error) {
        throw error;
    }
};
