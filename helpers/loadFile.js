const path = require("path");
const { v4: uuid } = require("uuid");

const loadFile = (
  files,
  validExtensions = ["jpg", "jpeg", "png", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const ext = file.name.split(".").pop();

    if (!validExtensions.includes(ext)) {
      return reject(`extension ${ext} is not allowing - ${validExtensions}`);
    }

    const tempName = `${uuid()}.${ext}`;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject("there was an error at create resource");
      }

      resolve(tempName);
    });
  });
};

module.exports = {
  loadFile,
};
