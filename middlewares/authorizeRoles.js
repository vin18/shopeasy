import { StatusCodes } from 'http-status-codes';

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: `You do not have permission to perform this action`,
      });
    }
    next();
  };
};

export { authorizeRoles };
