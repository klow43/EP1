class BrandService {
    constructor(db) {
        this.client = db.sequelize;
        this.Brand = db.Brand;
    }

    async createBrand(Brand){
        return await this.Brand.create({Brand : Brand })
        .catch(err => {console.log(err); return err })
    }

    //no delete if in use, restrict.
    async deleteBrand(Brandid){
        return await this.Brand.destroy({
            where : { id : Brandid }
        }).catch(err => {console.log(err); return err })
    }

    async getBrands(){
        return await this.Brand.findAll()
        .catch(err => {console.log(err); return err })
    }

    //only alter brand names of id.
    async alterBrand(Brandid,newBrand){
        return await this.Brand.update({
            Brand : newBrand
        }, { where : { id : Brandid }
        }).catch(err => {console.log(err); return err })
    }

}

module.exports = BrandService;