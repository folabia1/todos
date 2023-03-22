export const hasQueryParams = (req: { query: {} }): Boolean => {
  if (!req.query) return false;
  return Object.entries(req.query).some((entry) => entry !== undefined);
};

export const hasBodyParams = (req: { body: {} }): Boolean => {
  if (!req.body) return false;
  return Object.entries(req.body).some((entry) => entry !== undefined);
};
