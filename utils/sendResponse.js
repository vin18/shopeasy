import { StatusCodes } from 'http-status-codes';

export const sendResponse = (user, res) => {
  const token = user.createJWT();

  const oneDay = 1000 * 60 * 60 * 24;
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * oneDay),
    httpOnly: true,
  };

  user.password = undefined;
  res.cookie('token', token, cookieOptions);

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};
