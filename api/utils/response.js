exports.getStandardResponse = (status, message, data, req) => {
  let url = req.protocol + "://" + req.headers.host + req.originalUrl;

  return {
    status: status,
    message: message,
    data,
    links: {
      self: url,
    },
  };
};

exports.getStandardError = (message, status, req) => {
  var fullUrl = req.protocol + "://" + req.headers.host + req.originalUrl;

  return {
    status: status,
    error: message,
    links: {
      self: fullUrl,
    },
  };
};
