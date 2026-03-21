import { Router } from "express";
import ProductSchema from "../models/product.schema.js";

const OperatorRouter = Router();

OperatorRouter.get("/", async (req, res) => {
  try {
    // const products = await ProductSchema.find({ price: { $eq: 119999 } });
    // const products = await ProductSchema.find({ price: { $ne: 119999 } });
    // const productsIN = await ProductSchema.find({ price: { $in: [119999, 79000] } });
    // const productsNIN = await ProductSchema.find({ price: { $nin: [119999, 79000] } });

    // const productsAND = await ProductSchema.find({
    //   $and: [{ price: 119999 }, { stock: 8 }],
    // });
    // const productsOR = await ProductSchema.find({
    //   $or: [{ price: 119999 }, { stock: 10 }],
    // });
    const productsNOT = await ProductSchema.find({
      price: { $not: { $gt: 38999 } },
    });

    const productsNOR = await ProductSchema.find({
      $nor: [{ price: 119999 }, { stock: 10 }],
    });
    res.json({ productsNOT, productsNOR });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

OperatorRouter.get("/matching-grouping", async (req, res) => {
  try {
    const products = await ProductSchema.aggregate([
      {
        $match: {
          category: "Electronics",
          stock: { $gt: 15 },
          price: { $gt: 2000 },
        },
      },
      {
        $group: {
          _id: "$category",
          totalStock: { $sum: "$stock" },
          totalPrice: { $sum: { $multiply: ["$stock", "$price"] } },
        },
      },
    ]);
    res.send(products);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

OperatorRouter.get("/matching-unwind", async (req, res) => {
  try {
    const products = await ProductSchema.aggregate([
      {
        $match: {
          tags: { $exists: true },
        },
      },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          totalStock: { $sum: "$stock" },
          totalPrice: { $sum: { $multiply: ["$stock", "$price"] } },
        },
      },
    ]);
    res.send(products);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

OperatorRouter.get("/matching-projecting", async (req, res) => {
  try {
    const products = await ProductSchema.aggregate([
      {
        $match: {
          tags: { $exists: true },
        },
      },
      { $project: { name: 1, price: 1, _id: 0 } },
    ]);
    res.send(products);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default OperatorRouter;
