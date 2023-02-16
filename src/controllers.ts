import {Request, Response} from "express";
import {Create} from "./app/create";

export class Controllers {

  private readonly _create: Create

  constructor(create: Create) {
    this._create = create
  }

  health = (req: Request, res: Response) => {
    res.status(200)
    res.json({status: "healthy"})
    return
  }

  create = async (req: Request, res: Response) => {
    console.debug(req.body)
    const ok = await this._create.do(req.body)

    if (ok) {
      res.status(204)
      res.send()
      return
    }

    res.status(500)
    res.json({error: "error inserting"})
    return
  }
}