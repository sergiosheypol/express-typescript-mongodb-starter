import {Express} from "express";
import {Controllers} from "./controllers";

export const setupRoutes = (app: Express, controllers: Controllers) => {
  app.post('/create', controllers.create)
  app.get('/health', controllers.health)
}