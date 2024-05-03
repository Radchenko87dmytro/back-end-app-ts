import { Request, Response, Router } from "express";
import { productsService } from "../domain/products-service";
import { ProductType } from "../repositories/products-in-memory-repository";
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
    const newProduct: ProductType = await productsService.createProduct(
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

    const isUpdated = await productsService.updateProduct(
      +req.params.id,
      req.body.title
    );
    if (isUpdated) {
      const product = await productsService.findProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProducts: ProductType[] = await productsService.findProducts(
    req.query.title?.toString()
  );

  res.send(foundProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const product = await productsService.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsService.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
