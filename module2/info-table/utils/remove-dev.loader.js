module.exports = function (source) {
  let replace = source.replace(/import[\s\S]+\.scss'/gm, '');

  // console.log(replace);
  return this.getOptions().isDevelopment ? source :
    replace;
};