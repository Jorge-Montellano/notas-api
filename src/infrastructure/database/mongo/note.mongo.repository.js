import NoteModel from  "./note.model.mongo.js";

export default class NoteMongoRepository { 
    async save(noteEntity) {
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId) {
       return await NoteModel.find({ userId });
    }

    async update(id, data) {
        //Encuentra y actualiza
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true } 
        );

        if (!updatedNote) {
            throw new Error("Nota no encontrada");
        }

        return updatedNote.toObject();
    }

    async delete(id) {
         //Encuentra y elimina
        const deletedNote = await NoteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            throw new Error("Nota no encontrada");
        }

        return deletedNote.toObject();
    }
}