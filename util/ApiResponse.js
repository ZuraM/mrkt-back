module.exports.success = function (res, data) {
  res.json({
    success: true, 
    data: data
  });
};

module.exports.failure = function (res, err, message, statusCode) {
  res.status(statusCode || 500);
  res.json({
    success: false,
    message: message,
    err: err
  });
};
