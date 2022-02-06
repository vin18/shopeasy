export const sendResponse = (user, res, statusCode) => {
  const token = user.createJWT();

  const oneDay = 1000 * 60 * 60 * 24;
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * oneDay),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  user.password = undefined;
  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    user,
  });
};
