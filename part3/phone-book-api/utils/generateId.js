module.exports = (model) => {
  const maxId = model.length > 0 ? Math.max(...model.map((n) => n.id)) : 0;
  return maxId + 1;
};
