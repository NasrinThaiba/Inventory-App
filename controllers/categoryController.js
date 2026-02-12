const category = require("../models/category");
const Category = require("../models/category");
const Item = require("../models/item")

exports.list = async (req, res) => {
    const categories = await Category.find().sort({name:1})
    res.render("categories/list", {categories})
}

exports.detail = async (req, res) => {
    const category = await Category.findById(req.params.id);
    const items = await Item.find({category : category._id});
    res.render("categories/detail", {category, items})
}

exports.create_get = (req, res) => {
    res.render("categories/form", {category:null})
}

exports.create_post = async (req, res) => {
    await Category.create(req.body);
    res.redirect("/categories")
}

exports.update_get = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render("categories/form", { category });
};

exports.update_post = async (req, res) => {
     if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Wrong admin password");
    }
    const {adminPassword, ...categoryData} = req.body;
    await Category.findByIdAndUpdate( req.params.id, categoryData);
    res.redirect("/categories");
};


exports.delete_post = async (req, res) => {

     if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Wrong admin password");
    }
    await Item.deleteMany({category : req.params.id});
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories")
}