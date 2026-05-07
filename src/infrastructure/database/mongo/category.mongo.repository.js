import CategoryModel from "./category.model.mongo.js";

export default class CategoryMongoRepository {

    async save(categoryEntity) {

        const category = new CategoryModel({
            name: categoryEntity.name,
            userId: categoryEntity.userId
        });

        const savedCategory = await category.save();

        return savedCategory.toObject();
    }

    async findByUserId(userId) {

        return await CategoryModel.find({ userId });

    }

    async findById(id) {

        const category = await CategoryModel.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }

        return category.toObject();
    }

    async update(id, data) {

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!updatedCategory) {
            throw new Error("Category not found");
        }

        return updatedCategory.toObject();
    }

    async delete(id) {

        const deletedCategory = await CategoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            throw new Error("Category not found");
        }

        return deletedCategory.toObject();
    }
}