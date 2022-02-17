const getUsers = (req, res) => {
  res.json({ msg: "get /users - controller" });
};

const getUser = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "get /users/:id - controller",
    id,
  });
};

const postUsers = (req, res) => {
  const { body } = req;
  res.json({
    msg: "post /users - controller",
    ...body,
  });
};

const putUsers = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: "put /users - controller",
    id,
    ...body,
  });
};

const deleteUsers = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "delete /users - controller",
    id,
  });
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
};
