const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepository = {
  findProducts(title: string | null | undefined) {
    if (title) {
      let foundProducts = products.filter((p) => p.title.indexOf(title) > -1);
      return foundProducts;
    } else {
      return products;
    }
  },

  createProduct(title: string) {
    const newProduct = {
      id: +new Date(),
      title: title,
    };
    products.push(newProduct);
    return newProduct;
  },

  getProductById(id: number) {
    const product = products.find((p) => p.id === id);
    return product;
  },

  updateProduct(id: number, title: string) {
    let product = products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
};
