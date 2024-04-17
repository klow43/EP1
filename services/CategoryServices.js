class CategoryService {
    constructor(db) {
        this.client = db.sequelize;
        this.Category = db.Category;
    }

    async findOrCreate(Category){
        return this.Category.findOrCreate({ where : {Category : Category }})
    }

    async createCategory(Category){
        return await this.Category.create({
            Category : Category
        })
        .catch(err => {console.log(err); return err })
    }

    //no delete if in use, restrict.
    async deleteCategory(Categoryid){
        return await this.Category.destroy({
            where : { id : Categoryid}
        })
        .catch(err => {console.log(err); return err })
    }

    async getCategory(){
        return await this.Category.findAll()
        .catch(err => {console.log(err); return err })
    }

        //only alter Categoryname of id.
    async alterCategory(oldCategoryid, newCategory){
        return await this.Category.update({
            Category : newCategory
        }, { where : { id: oldCategoryid }})
        .catch(err => {console.log(err); return err })
    }

}

module.exports = CategoryService;