const mongoose = require("mongoose");
const Category = require("./models/category");
const Item = require("./models/item");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.log(err));


async function seed() {
  await Category.deleteMany({});
  await Item.deleteMany({});


  const categories = await Category.insertMany([
    { name: "Fruits & Vegetables", description: "Fresh produce" },
    { name: "Dairy Products", description: "Milk and dairy items" },
    { name: "Bakery", description: "Fresh baked goods" },
    { name: "Beverages", description: "Cold and hot drinks" },
    { name: "Snacks", description: "Quick snacks" },
    { name: "Household Essentials", description: "Daily needs" },
    { name: "Personal Care", description: "Hygiene products" }
  ]);

  function find(name) {
  const category = categories.find(c => c.name === name);
  return category ? category._id : null;
  };

 await Item.insertMany([
  { 
    name: "Apple (1kg)", 
    description: "Fresh red apples, rich in vitamins and fiber.", 
    price: 180, 
    quantity: 50, 
    category: find("Fruits & Vegetables") 
  },
  { 
    name: "Banana (1 dozen)", 
    description: "Sweet and ripe bananas, perfect for daily nutrition.", 
    price: 60, 
    quantity: 40, 
    category: find("Fruits & Vegetables") 
  },

  { 
    name: "Milk (1L)", 
    description: "Fresh full-cream milk, rich in calcium.", 
    price: 55, 
    quantity: 100, 
    category: find("Dairy Products") 
  },
  { 
    name: "Curd (500g)", 
    description: "Thick and creamy curd made from fresh milk.", 
    price: 40, 
    quantity: 60, 
    category: find("Dairy Products") 
  },

  { 
    name: "Bread", 
    description: "Soft and freshly baked white bread loaf.", 
    price: 45, 
    quantity: 30, 
    category: find("Bakery") 
  },
  { 
    name: "Cake", 
    description: "Delicious chocolate cake, perfect for celebrations.", 
    price: 350, 
    quantity: 10, 
    category: find("Bakery") 
  },

  { 
    name: "Mineral Water (1L)", 
    description: "Pure and safe packaged drinking water.", 
    price: 20, 
    quantity: 200, 
    category: find("Beverages") 
  },
  { 
    name: "Soft Drink", 
    description: "Chilled carbonated soft drink.", 
    price: 60, 
    quantity: 50, 
    category: find("Beverages") 
  },

  { 
    name: "Potato Chips", 
    description: "Crispy and salted potato chips snack.", 
    price: 30, 
    quantity: 100, 
    category: find("Snacks") 
  },

  { 
    name: "Detergent Powder", 
    description: "High-quality detergent powder for tough stains.", 
    price: 180, 
    quantity: 25, 
    category: find("Household Essentials") 
  },

  { 
    name: "Shampoo", 
    description: "Mild and nourishing shampoo for daily hair care.", 
    price: 220, 
    quantity: 20, 
    category: find("Personal Care") 
  }
]);

  console.log("✅ Database seeded successfully");
  mongoose.connection.close();
}

seed();
