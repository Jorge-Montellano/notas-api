export default class CategoryController {
    
    constructor(categoryService){
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {

        const userId = req.user.id;

        try {

            const category = await this.categoryService.createCategory({
                name: req.body.name,
                userId
            });

            res.status(201).json(category);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };
}