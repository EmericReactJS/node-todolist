export const authorize = (request, response, next) => {
  if (!request.session.user) {
    response.status(401).send('<p>Unauthorized</p><a href="/">Home</a>');
  }
  next();
};
