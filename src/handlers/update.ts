import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.json({ data: "not yours G" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const id = req.params.id;

  // Note: there is a way to optimize this query so you don't have to
  // reduce in js. Should figure out how to do this the prisma way
  // to avoid adding excessive js objects in memory
  // Ideally you don't want to get all products and updates belonging to user
  // you want to filter at the query level to only find the products who have an id of the update id
  // you can do it within the include below, but not sure what the syntax is right now
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = await updates.find((update) => update.id === id);

  if (!match) {
    //handle this
    return res.json({ message: "cmon now..." });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const id = req.params.id;

  // Note: there is a way to optimize this query so you don't have to
  // reduce in js. Should figure out how to do this the prisma way
  // to avoid adding excessive js objects in memory
  // Ideally you don't want to get all products and updates belonging to user
  // you want to filter at the query level to only find the products who have an id of the update id
  // you can do it within the include below, but not sure what the syntax is right now
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, product.updates];
  }, []);

  const match = await updates.find((update) => update.id === id);

  if (!match) {
    //handle this
    return res.json({ message: "Not valid." });
  }

  const deleted = await prisma.update.delete({
    where: {
      id,
    },
  });

  res.json({ data: deleted });
};
