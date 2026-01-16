const { ZodError } = require("zod");

// schemaType: 'body', 'query', or 'params'
const validate = (schema, schemaType = "body") => (req, res, next) => {
  console.log({schemaType})
  try {
    const data = schemaType === "body" ? req.body
               : schemaType === "query" ? req.query
               : req.params;

    schema.parse(data);
    next();
  } catch (err) {
    console.log({err})
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: JSON.parse(err.message),
      });
    }
    next(err);
  }
};

module.exports = validate;
