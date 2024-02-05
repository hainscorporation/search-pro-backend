/**
 * @file Handle responses
 * @author Daniela Cordoba
 */

let success = function (res, status, data) {
  return res.status(status).json(data);
}

let error = function (res, status, message) {
  return res.status(status).json({
    error: message
  });
}

export {
  success,
  error
}