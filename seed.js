const UserModel = require("./models/User")
const CampModel = require("./models/Camp")

async function seedDB(){
    await UserModel.deleteMany({})
    await CampModel.deleteMany({})
}

module.exports = {seedDB}