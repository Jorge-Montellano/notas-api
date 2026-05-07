import { Router } from "express";

import CategoryMongoRepository from "../../infrastructure/database/mongo/category.mongo.repository.js";
import CategoryService from "../../application/use-cases/category.service.js";
import CategoryController from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


// inyeccion de dependencias
const categoryRepository = new CategoryMongoRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);



const router = Router();


// Rutas categorías
router.post("/", authMiddleware, categoryController.createCategory);

export default router;