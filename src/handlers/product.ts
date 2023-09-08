import prisma from "../db";

// get all products
// what is denormalization in this context? Why is it important?
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// get one product
// your queries make you go back and change your indexes, what does that mean?
// Schema does not have an index for product id? How do indexes work?
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({ data: req.body.name });
  res.json({ data: product });
};
