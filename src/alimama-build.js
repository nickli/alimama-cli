/**
 * 所有读取文件时的错误处理
 * */
function excludeError(err, files) {
  if (err) {
    console.log(err);
  } else {
    if (typeof files === 'object' && files.length > 0) {
      collection(files);
    } else {
      console.log('未找到要构建的文件！');
    }
  }
}
module.exports = function () {
  fs.readdir(path, excludeError);
};