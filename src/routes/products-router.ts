import { Request, Response, Router } from "express";
import { app } from "../app";
import { HTTP_STATUSES } from "../utils";

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  let foundProducts = products;
  if (req.query.title) {
    res.send(
      products.filter((p) => p.title.indexOf(req.query.title as string) > -1)
    );
  } else {
    res.send(foundProducts);
  }
  res.status(HTTP_STATUSES.OK_200).json(foundProducts);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);
  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(product);
});

productsRouter.post("/", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newProduct = {
    id: +new Date(),
    title: req.body.title,
  };
  products.push(newProduct);

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json({ message: "New product created", data: newProduct });
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

productsRouter.put("/:id", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  let product = products.find((c) => c.id === +req.params.id);
  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  product.title = req.body.title;

  res.status(HTTP_STATUSES.OK_200).json(product);
});
