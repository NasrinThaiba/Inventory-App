const Item = require("../models/item");
const Category = require("../models/category");

exports.list = async (req, res) => {
    const items = await Item.find().populate("category");
    res.render("items/list", {items})
}

exports.detail = async (req, res) => {
    const item = await Item.findById(req.params.id).populate("category");
    res.render("items/detail", {item})
}

exports.create_get = async (req, res) => {
    const categories = await Category.find();
    res.render("items/form", {categories})
}

exports.update_get = async (req, res) => {
    const item = await Item.findById(req.params.id);
    const categories = await Category.find();
    res.render("items/form", {item, categories})
}

exports.update_post = async (req, res) => {
     if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Wrong admin password");
    }
    
    const {adminPassword, ...categoryData} = req.body

    await Item.findByIdAndUpdate(req.params.id, categoryData);
    res.redirect(`/items/${req.params.id}`)
}

exports.create_post = async(req, res) => {
    await Item.create(req.body);
    res.redirect("/items")
}

exports.delete_post = async(req, res) => {
    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Wrong admin password");
    }
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/items")
} 