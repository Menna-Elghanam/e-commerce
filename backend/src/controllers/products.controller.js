import prisma from "../config/prismaConfig.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany( {
      include: {
        category: true
      }
    }   );
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price) },
    });
    res.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description, price: parseFloat(price) },
    });
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Bad request" });
    }
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchProducts = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.categoryId);

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const products = await prisma.product.findMany({
      where: { categoryId },
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
