export const advancedResults = (model) => async (req, res, next) => {
  const { page = 1, page_size = 10 } = req.query;
  const reqQuery = { ...req.query };
  const sortBy = reqQuery.sort || "-date_added";
  const { search = "" } = req.query;
  const results = await model
    .find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    })
    .limit(Number(page_size))
    .skip(Number(page_size) * (Number(page) - 1))
    .sort(sortBy);
  const count = await model.countDocuments();

  res.locals.advancedResults = { results, count };
  next();
};
