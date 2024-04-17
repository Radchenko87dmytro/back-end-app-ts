import { Request, Response, Router } from "express";
import { app } from "../app";
import { HTTP_STATUSES } from "../utils";

const addresses = [
  { id: 1, value: "Independence 21" },
  { id: 2, value: "Salers 11" },
];

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  let foundProducts = addresses;
  if (req.query.title) {
    res.send(
      addresses.filter((p) => p.value.indexOf(req.query.title as string) > -1)
    );
  } else {
    res.send(foundProducts);
  }
  res.status(HTTP_STATUSES.OK_200).json(foundProducts);
});

addressesRouter.get("/:id", (req: Request, res: Response) => {
  const product = addresses.find((p) => p.id === +req.params.id);
  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(product);
});
