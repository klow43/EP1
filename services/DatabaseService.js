const { sequelize } = require('../models');

class DatabaseService {
    constructor(db){
        this.client = db.sequelize;
    }

    //raw query to insert json to db, responds to POST /init
    async InitialData(record){
        sequelize.query(record.query, {raw : true})   
        .catch(err => {console.log(err); return err })     
    }
}

module.exports = DatabaseService;