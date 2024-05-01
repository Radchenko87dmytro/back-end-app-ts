import { Request, Response, Router } from "express";
import {
  ProductType,
  productsRepository,
} from "../repositories/products-in-memory-repository";
//-db-repository
//
import { body, validationResult } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";

export const productsRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Title length should be from 3 to 10 symbols");

productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct: ProductType = await productsRepository.createProduct(
      req.body.title
    );
    res.status(201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const isUpdated = await productsRepository.updateProduct(
      +req.params.id,
      req.body.title
    );
    if (isUpdated) {
      const product = await productsRepository.findProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProducts: ProductType[] = await productsRepository.findProducts(
    req.query.title?.toString()
  );

  res.send(foundProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const product = await productsRepository.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
