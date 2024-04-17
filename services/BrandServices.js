class BrandService {
    constructor(db) {
        this.client = db.sequelize;
        this.Brand = db.Brand;
    }

    async findOrCreate(Brand){
        return this.Brand.findOrCreate({ where : { Brand : Brand}})
    }

    async createBrand(Brand){
        return this.Brand.create({ Brand : Brand })
        .catch(err => {console.log(err); return err })
    }

    //no delete if in use, restrict.
    async deleteBrand(Brandid){
        return this.Brand.destroy({
            where : { id : Brandid }
        }).catch(err => {console.log(err); return err })
    }

    async getBrands(){
        return  this.Brand.findAll()
        .catch(err => {console.log(err); return err })
    }

    //only alter brand names of id.
    async alterBrand(Brandid,newBrand){
        return this.Brand.update({
            Brand : newBrand
        }, { where : { id : Brandid }
        }).catch(err => {console.log(err); return err })
    }

}

module.exports = BrandService;