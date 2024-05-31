class DatabaseService {
    constructor(db){
        this.client = db.sequelize;
        this.Brand = db.Brand;
        this.Category = db.Category;
        this.Role = db.Role;
        this.Membership = db.Membership;
        this.OrderStatus = db.OrderStatus;
        this.UserRole = db.UserRole;
        this.Product = db.Product;
        this.ProductBrands = db.ProductBrands;
        this.ProductCategories = db.ProductCategories;
    }

    async checkDatabase(){
            return await this.Product.findOne({
                where : {}
        }).catch( err => { console.log(err); return err })
    }

    async RoleData(Role,t){
        return await this.Role.bulkCreate(
            Role,t,
            { fields : ['id', 'Role']}
        )
    }

    async OrderStatusData(OrderStatus,t){
        return await this.OrderStatus.bulkCreate(
            OrderStatus,t,
            { fields : ['id', 'Status']}
        ).catch( err => { console.log(err); return err })  
    }

    async MembershipData(Memberships,t){
        return await this.Membership.bulkCreate(
            Memberships,t,
            { fields : ['id', 'Membership', 'minItems', 'maxItems', 'discount']}
        ).catch( err => { console.log(err); return err })  
    }

    //insert brand names from api
    async BrandData(Brand,t){
       return await this.Brand.bulkCreate(
        Brand,t,
       ).catch( err => { console.log(err); return err })     
    } 

    //insert category names from api
    async CategoryData(Category, t){
       return await this.Category.bulkCreate(
        Category,t,
        ).catch( err => { console.log(err); return err })  
    }

    async ProductData(Products, t){
        return await this.Product.bulkCreate(
            Products,t,
        ).catch( err => { console.log(err); return err }) 
    }

    //set admin to RoleId = 1
    async setAdmin(){
        return await this.UserRole.update(
            { RoleId : 1},
            { where : { UserId : 1} }
        ).catch( err => { console.log(err); return err })  
    }

    async ProductBrand(Relations, t){
        return await this.ProductBrands.bulkCreate(
            Relations,t,
        ).catch( err => { console.log(err); return err }) 
    } 

    async ProductCategory(Relations, t){
        return await this.ProductCategories.bulkCreate(
            Relations,t,
        ).catch( err => { console.log(err); return err })       
    }
} 

  
module.exports = DatabaseService;