const fs = require('fs');

exports.deleteFile = function (filename) {
  fs.unlinkSync(filename);
  console.log('파일삭제 성공');
};
