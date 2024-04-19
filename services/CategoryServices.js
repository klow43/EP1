class CategoryService {
    constructor(db) {
        this.client = db.sequelize;
        this.Category = db.Category;
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

    async getCategories(){
        return await this.Category.findAll()
        .catch(err => {console.log(err); return err })
    }

    async getCategory(category){
        return this.Category.findOne({
            where : { Category : category }
        }).catch(err => {console.log(err); return err }) 
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