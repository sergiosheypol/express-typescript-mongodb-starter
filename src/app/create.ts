import {Db} from "mongodb";

export class Create {
  private static readonly COLLECTION_NAME = "demo-collection"

  private db: Db;

  constructor(db: Db) {
    this.db = db
  }

  async do(obj: any): Promise<boolean> {
    const res = await this.db.collection(Create.COLLECTION_NAME).insertOne(obj)
    return res.acknowledged
  }
}