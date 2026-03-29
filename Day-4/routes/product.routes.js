import { Router } from "express";
import ProductSchema from "../models/product.schema.js";

const ProductRouter = Router();

ProductRouter.get("/add-product", async (req, res) => {
  try {
    const products = [
      {
        name: "iPhone 14",
        price: 79999,
        description: "Apple smartphone with A15 chip",
        category: "Electronics",
        stock: 15,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Samsung Galaxy S23",
        price: 74999,
        description: "Samsung flagship smartphone",
        category: "Electronics",
        stock: 12,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "MacBook Air M2",
        price: 119999,
        description: "Apple laptop with M2 chip",
        category: "Electronics",
        stock: 8,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Dell XPS 13",
        price: 99999,
        description: "Premium ultrabook from Dell",
        category: "Electronics",
        stock: 10,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Sony WH-1000XM5",
        price: 29999,
        description: "Noise cancelling headphones",
        category: "Electronics",
        stock: 20,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Apple Watch Series 9",
        price: 45999,
        description: "Smartwatch with health tracking",
        category: "Electronics",
        stock: 18,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Nike Running Shoes",
        price: 4999,
        description: "Comfortable running shoes",
        category: "Footwear",
        stock: 30,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Adidas Sneakers",
        price: 5999,
        description: "Stylish everyday sneakers",
        category: "Footwear",
        stock: 25,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Levi's Denim Jacket",
        price: 6999,
        description: "Classic denim jacket",
        category: "Clothing",
        stock: 14,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Puma T-Shirt",
        price: 1999,
        description: "Casual cotton t-shirt",
        category: "Clothing",
        stock: 40,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "HP Pavilion Laptop",
        price: 65999,
        description: "Mid-range laptop for everyday use",
        category: "Electronics",
        stock: 9,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Lenovo ThinkPad E14",
        price: 72999,
        description: "Business laptop with durability",
        category: "Electronics",
        stock: 7,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Canon EOS 1500D",
        price: 38999,
        description: "Entry level DSLR camera",
        category: "Electronics",
        stock: 11,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Boat Rockerz 550",
        price: 1999,
        description: "Wireless over-ear headphones",
        category: "Electronics",
        stock: 35,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Logitech Wireless Mouse",
        price: 999,
        description: "Ergonomic wireless mouse",
        category: "Accessories",
        stock: 50,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Mechanical Keyboard",
        price: 4499,
        description: "RGB mechanical gaming keyboard",
        category: "Accessories",
        stock: 22,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Samsung 27 inch Monitor",
        price: 18999,
        description: "Full HD LED monitor",
        category: "Electronics",
        stock: 13,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Mi Power Bank 20000mAh",
        price: 2499,
        description: "Fast charging power bank",
        category: "Accessories",
        stock: 28,
        seller: "69b51459bedb19aed18d9098",
      },
      {
        name: "Backpack for Laptop",
        price: 1599,
        description: "Water resistant laptop backpack",
        category: "Bags",
        stock: 33,
        seller: "69b5144abedb19aed18d9095",
      },
      {
        name: "Casio Analog Watch",
        price: 3499,
        description: "Classic analog wrist watch",
        category: "Accessories",
        stock: 19,
        seller: "69b51459bedb19aed18d9098",
      },
    ];

    await ProductSchema.insertMany(products);

    res.status(201).json({
      success: true,
      message: "20 Products inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

ProductRouter.get("/advance-quaries", async (req, res) => {
  try {
    const { searchedProduct } = req.body;

    // const products = await ProductSchema.find({}).sort({ price: 1 });
    // const products = await ProductSchema.find({}).sort({ price: -1 });

    // const products = await ProductSchema.find({}).limit(2);
    // const products = await ProductSchema.find({}).sort({ price: -1 }).limit(2);

    // const pageNumber = 5;
    // const products = await ProductSchema.find({})
    //   .skip((pageNumber - 1) * 5)
    //   .limit(5);

    // const products = await ProductSchema.find({
    //   price: { $gte: 999 },
    // });

    // const products = await ProductSchema.find({}, "name price stock -_id");
    // const products = await ProductSchema.find(
    //   {},
    //   { name: 1, _id: 0, price: 1 },
    // );

    const products = await ProductSchema.find({
      name: { $regex: searchedProduct, $options: "i" },
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

ProductRouter.get("/get-products", async (req, res) => {
  try {
    const products = await ProductSchema.find().populate(
      "seller",
      "name email",
    );
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

ProductRouter.get("/get-single-product/:id", async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id).populate(
      "seller",
      "name email -_id",
    );
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

export default ProductRouter;
