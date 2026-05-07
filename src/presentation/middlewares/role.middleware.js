export const roleMiddleware = (rolesPermited) => {
    return (req, res, next) => {

        // Usuario no autenticado
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Usuario sin permisos suficientes
        if (!rolesPermited.includes(req.user.role)) { 
            return res.status(403).json({ 
                success: false,
                message: "You do not have permission to access this resource"
            });
        }
        next();
    };

}