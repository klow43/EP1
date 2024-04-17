const { Op } = require("sequelize");

class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    //create User on register of user.
    async createUser(User){
        return await this.User.create({
            firstName : User.firstName,
            lastName : User.lastName,
            email : User.email,
            password : User.password,
            phone : User.phone,
            adress : User.adress
        }).catch( err => { console.log(err); return err })
    }

    //delete user(admin), no soft delete (GDPR)
    async deleteUser(UserId){
        return await this.User.destroy({
            where : { Id : UserId, userName : { [Op.not] : Admin }}
        }).catch(err => { console.log(err); return err })
    }

    //view users(admin)
    async getUser(){
        return await this.User.findAll({ 
            where : {}
        }).catch( err => { console.log(err); return err })
    }


    async updateUser(Userid, User){
        return await this.User.update({
             firstName : User.firstName,
             lastName : User.lastName,
             email : User.email,
             password : User.password,
             phone : User.phone,
             adress : User.adress
        },{
        where : { id : Userid }
            }).catch( err => { console.log(err); return err })
    }
}

module.exports = UserService;