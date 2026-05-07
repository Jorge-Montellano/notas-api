import { successResponse, errorResponse} from "../../shared/helpers/response.helper.js";

export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
         try {
            const data = req.body;
            if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
            
            data.userId = req.user.id; 
            data.categoryId = req.body.categoryId || null;

            //creacion nota - logica de negocio
            const note = await this.noteService.createNote(data);
             
            return successResponse(
                res,
                note,
                "Note created successfully",
                201
            );

        } catch (error) {
             return errorResponse(
                res,
                error.message,
                400
            );
        }
    }

    getNotesByUserId = async (req, res) => {
        try {
                const userId = req.user.id;
                
                const notes = await this.noteService.getNotesByUserId(userId);
              
                return successResponse(
                    res,
                    notes,
                    "Notes retrieved successfully"
                );

        } catch (error) {
             return errorResponse(
                res,
                error.message,
                404
            );
        }
    }

    updateNote = async (req, res) => {
        try {

            const { id } = req.params;
            const data = req.body;
            if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

            const note = await this.noteService.updateNote(id, data);

            return successResponse(
                res,
                note,
                "Note updated successfully"
            );

        } catch (error) {
            return errorResponse(
                res,
                error.message,
                404
            );
        }
    }

    deleteNote = async (req, res) => {
         try {
            const { id } = req.params;

             await this.noteService.deleteNote(id);

            return successResponse(
                res,
                null,
                "Note deleted successfully"
            );
        } catch (error) {
            return errorResponse(
                res,
                error.message,
                404
            );
        }
    }

    shareNote = async (req, res) => {
        try {
            const { id } = req.params;
            const { email } = req.body;
            const currentUserId = req.user.id;

            if (!email) return res.status(400).json({ error: "Target email is required" });

        
            const result = await this.noteService.shareNoteByEmail(id, email, currentUserId);
            
            return successResponse(
                    res,
                    result,
                    "Note shared successfully"
                );
        } catch (error) {
                return errorResponse(
                res,
                error.message,
                400
            );
        }
    }


    //Ejercicio 3 - proyecto
    getPublicNote = async (req, res) => {

        const { id } = req.params;
        try {

            const note = await this.noteService.getNoteById(id);
            // validar privacidad
            if (note.isPrivate) {
                return res.status(403).json({
                    error: "This note is private"
                });
            }
            res.status(200).json(note);
        } catch (error) {

            res.status(404).json({
                error: error.message
            });
        }
    }
}