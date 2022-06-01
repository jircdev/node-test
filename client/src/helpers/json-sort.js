export const jsonSort = (json, template) => {
  const result = {};

  template.forEach((key) => {
    if (key in json) {
      result[key] = json[key] ? json[key] : '...';
    }
  });
  return result;
};
