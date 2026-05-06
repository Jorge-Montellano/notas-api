import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import  upload  from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

// Importamos el repositorio de MySQL y el servicio de Mail
import NoteMySQLRepository from "../../infrastructure/database/mysql/note.mysql.repository.js";
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
import MailService from "../../infrastructure/services/mail.service.js";

// inyeccion de dependencias
const mailService = new MailService();/* 
/*  const noteRepository = new NoteMySQLRepository(); */
const noteRepository = new NoteMongoRepository();
const noteService = new NoteService(noteRepository, mailService);
const noteController = new NoteController(noteService);

const router = Router();

// Definir las rutas para las notas  

// Creacion nota - con auth
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);
// Creacion nota - sin auth
/* router.post("/", upload.single('image'), noteController.createNote); */

//obtener nota
router.get("/", authMiddleware, noteController.getNotesByUserId);

//actualizacion nota con auth
router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);
//actualizacion nota sin auth
/* router.put("/:id", upload.single('image'), noteController.updateNote); */

//borrado nota con auth
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);
//borrado nota sin auth
/* router.delete("/:id", noteController.deleteNote); */

router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;