/**
 * Send a success response
 * @param {Object} res - Express response
 * @param {Object} data - Response data
 * @param {string} message - Optional message
 * @param {number} statusCode - HTTP status code (default 200)
 */
const success = (res, data = null, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {Object} errors - Optional detailed error info (e.g., validation)
 */
const error = (res, message = "Internal Server Error", statusCode = 500, errors = null) => {
  const payload = {
    status: "error",
    message,
  };
  console.log({errors})
  if (errors) payload.errors = errors;
  res.status(statusCode).json(payload);
};

module.exports = { success, error };
