import { Request, Response } from "express";

class IndexController {
  public index(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "OK!!!" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default IndexController;
