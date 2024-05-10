const { Op } = require("sequelize");

class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    //include userRole/Roleid
    async getLogin(user) {
        return await this.User.findOne({
            include : 'UserRole' ,
            where : { [Op.or] :[ { userName : user.name },  { email : user.name } ]}
        }).catch( err => { console.log(err); return err })
    }

    async getUser(userid){
        return await this.User.findOne({
            where : { id : userid },
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone', 'userName', 'address', 'createdAt', 'updatedAt']
        }).catch( err => { console.log(err); return err })
    }

    async getUsers(){
        return await this.User.findAll({
            attributes : ['id', 'firstName', 'lastName', 'email', 'phone', 'userName', 'address', 'createdAt', 'updatedAt']},
        ).catch( err => { console.log(err); return err })
    }

    //create User, create cart/membership/role on create.
    async createUser(User){
        return await this.User.create({
            firstName : User.firstName,
            lastName : User.lastName,
            email : User.email,
            password : User.password,
            phone : User.phone,
            userName : User.userName,
            address : User.address
        }).catch( err => { console.log(err); return err })
    }

    async updateUser(User){
        return await this.User.update({
             firstName : User.firstName,
             lastName : User.lastName,
             phone : User.phone,
             adress : User.adress,
             userName : User.userName
        },{
        where : { id : User.id }
            }).catch( err => { console.log(err); return err })
    }


    //delete user(admin), no soft delete (GDPR), cannot delete admin
    async deleteUser(UserId){
        return await this.User.destroy({
            where : { Id : UserId, Id : { [Op.not] : 1 }}
        }).catch(err => { console.log(err); return err })
    }

}

module.exports = UserService;