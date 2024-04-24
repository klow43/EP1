var express = require('express');
var router = express.Router();
const db = require('../models');
const CategoryService = require('../services/CategoryServices');
const categoryService = new CategoryService(db);
const { isAdmin } = require('../services/middleware');

router.get('/', async function(req, res, next) {
    let categories;
    try{
        categories = await categoryService.getCategories();
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve categories."}})}

    categories[0] == null ? 
      res.status(400).json({ status : "error", statusCode : 400, data : { result : "No categories found.", products : categories } }) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "Categories found.", products : categories }})
});

router.get('/:categoryid', async function(req, res, next){
    let categoryid = req.params.categoryid;
    let category;
    try{
        category = await categoryService.getCategory(categoryid);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve category."}})};

    category == null ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No category found.", products : category } }) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Category found.", products : category }})
})

router.post('/', isAdmin, async function(req, res, next) {
    let result;
    if(!req.body?.category || req.body?.category == "" || req.body?.category == null){res.status(400).json({ status : "error", statusCode : 400, data : { result : "category must be provided." }})}
    try{
       result = await categoryService.createCategory(req.body.category); 
    }catch(err){console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Unable to create category."}})}
    result.name == 'SequelizeUniqueConstraintError' ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "Category already exists."}}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Category created."}})       
});

router.put('/', isAdmin, async function(req, res, next) {
    let result;    
    if(!req.body?.id || req.body?.id == null || req.body?.id == "" || !req.body?.category){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id and category must be provided." }}); }     
    try{
        result = await categoryService.alterCategory(req.body.id, req.body.category);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot alter category."}})}
    result == 0 ? res.status(400).json({ status : "error", statusCode : 400, data : { result : "No category of provided id."}}) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "Category altered."}})
});

//table has restrict, cannot delete if related to a product.
router.delete('/', isAdmin, async function(req, res, next) {
    let result;
    if(!req.body?.id){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id must be provided." }}) }
    try{
        result = await categoryService.deleteCategory(req.body.id);        
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Unable to delete category" }})}
    result.name == 'SequelizeForeignKeyConstraintError' ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "Category belongs to a product and cannot be deleted."}}) :
            result == 0 ?  res.status(400).json({ status : "error", statusCode : 400, data : { result : "No category of provided id."}}) :
                res.status(200).json({ status : "success", statusCode : 200, data : { result : "Category deleted."}})
}); 

module.exports = router; 