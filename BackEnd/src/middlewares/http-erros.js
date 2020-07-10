module.exports = (error, req, res, next) => {
  console.log('Error status: ', error.status);
  console.log('Message: ', error.message);
  return res.status(error.status || 500).json({
    status: error.status,
    message: error.message,
  });
};
