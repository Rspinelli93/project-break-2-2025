const admin = require('firebase-admin');
const auth = admin.auth();

const checkAuth = (req, res, next) => {
    const idTokenCookie = req.cookies?.token;
    const authHeader = req.headers.authorization;
    
    const idToken = idTokenCookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
    
    if (!idToken) {
        return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
    }
    
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error(`Error al verificar el token: ${error}`);
            return res.status(401).json({ message: 'No autorizado. Token inválido.' });
        });
};

module.exports = {checkAuth};