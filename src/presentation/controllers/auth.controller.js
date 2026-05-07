import { successResponse, errorResponse} from "../../shared/helpers/response.helper.js";

export default class AuthController {
    constructor({ authService }) {
        this.authService = authService;
    }

    register = async (req, res) => {
        try {
                const result = await this.authService.register(req.body);

                    return successResponse(
                        res,
                        result,
                        "User registered successfully",
                        201
                    );

                } catch (error) {
                    return errorResponse(
                        res,
                        error.message,
                        400
                    );
                }
    };

    login = async (req, res) => {
        try {
                const {email, password} = req.body;
                if (!email || !password) {
                            return errorResponse(
                                res,
                                "Email and password are required",
                                400
                            );
                }
                const result = await this.authService.login(req.body);
                
                return successResponse(
                    res,
                    result,
                    "Login successful"
            );
        } catch (error) {

        return errorResponse(
                res,
                error.message,
                401
            );
        }
    };
}