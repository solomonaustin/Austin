const todosModel = require('./todosModel');

// Read operation
module.exports.getDataFromDBService = async (id) => {
    try {
        if (!id) {
            const result = await todosModel.find({});
            return result;
        } else {
            const result = await todosModel.findOne({ _id: id });
            if (result) {
                return result;
            } else {
                throw new Error('User not found');
            }
        }
    } catch (error) {
        throw error;
    }
};

// Create operation
module.exports.createtodosDBService = async (todosDetails) => {
    try {
        const todosModelData = new todosModel();
        todosModelData.title = todosDetails.title;
        todosModelData.description = todosDetails.description;
        todosModelData.duedate = todosDetails.duedate;

        await todosModelData.save();
        return true;
    } catch (error) {
        throw error;
    }
};

// Update operation
module.exports.updatetodosDBService = async (id, todosDetails) => {
    try {
        console.log(todosDetails);
        const result = await todosModel.findOneAndUpdate({ _id: id }, todosDetails, { new: true });
        if (!result) {
            throw new Error('User not found');
        } else {
            return result;
        }
    } catch (error) {
        throw error;
    }
};

// Delete operation
module.exports.removetodosDBService = async (id) => {
    try {
        const result = await todosModel.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error('User not found');
        } else {
            return result;
        }
    } catch (error) {
        throw error;
    }
};
