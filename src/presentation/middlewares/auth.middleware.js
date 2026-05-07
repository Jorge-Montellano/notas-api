import JwtService from "../../infrastructure/security/jwt.service.js";

export const authMiddleware =(req, res, next) => {
    const authHeader = req.headers.authorization;

     // Header inexistente o mal formado
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
                success: false,
                message: "Authentication token is required"
            });
    }

    // Extraer token
    const token = authHeader.split(" ")[1];
    try {
          // Verificar token
        const payload = JwtService.verifyToken(token);
        req.user = payload; // contiene el id ,  email, role incrustado en la request para que los controllers puedan usarlo
        next();
    } catch (error) {

           // Token expirado
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

         // Token inválido
        return res.status(401).json(
            { 
                success: false,
                message: "Invalid authentication token"
            });
    }
}
