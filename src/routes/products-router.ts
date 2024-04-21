import { Request, Response, Router } from "express";
import { app } from "../app";
import { HTTP_STATUSES } from "../utils";
import { productsRepository } from "../repositories/products-repository";
import { title } from "process";

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(
    req.query.title?.toString()
  );
  res.send(foundProducts);
});

productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title);
  res.status(201).send(newProduct);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.put("/:id", (req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct(
    +req.params.id,
    req.body.title
  );
  if (isUpdated) {
    const product = productsRepository.findProductById(+req.params.id);
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      return;
    }
  }
  res.send(404);
});
