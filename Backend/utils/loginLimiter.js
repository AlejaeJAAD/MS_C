import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many login attempts from this IP, please try again later.'
});

export default loginLimiter