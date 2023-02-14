var express = require("express");
const multer = require("multer");
const path = require("path");
const maria = require("../maria");
const fs = require("fs");

var router = express.Router();
var publicPath = "C:\\ai_exam\\tempnode\\tempnode\\public\\";

router.get("/main", function (req, res) {
  res.sendFile(publicPath + "main.html");
});

router.get("/download/:id", function (req, res) {
  let id = req.params.id;
  const fileName = id;
  const directoryPath = __basedir + "/database/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      console.log("파일존재안함");
    }
  });
});

// zip 다운로드 함수
const zipDownload = (path, fileName) =>
  new Promise((resolve, reject) => {
    const zip = new require("node-zip")();

    // 압축할 파일들을 입력해준다.
    // 매개변수로는 파일이미지, fs.readFileSync(경로 + 파일명.확장자)
    // for문으로 파일 개수를 파악해서 넣어야할듯 싶음
    zip.file("test_image1.jpg", fs.readFileSync(path + "test_image1.jpg"));
    zip.file("test_image2.jpg", fs.readFileSync(path + "test_image2.jpg"));

    // 서버에 zip파일을 저장할 경로와 이름을 지정한다.
    const zipPath = `${path}/${fileName}.zip`;
    const addZip = zip.generate({ base64: false, compression: "DEFLATE" });

    // 서버에 zip파일을 저장한다.
    fs.writeFileSync(zipPath, addZip, "binary");

    // zip파일 경로를 리턴
    return resolve(zipPath);
  });

router.get("/downloadZip/:id", function (req, res, next) {
  // 기본 경로를 설정한다.
  const zipDownloadRoot = __basedir + "/database/";

  // 파라미터로 다른 데이터를 받아올게 있다면 사용
  let id = req.params.id;

  // 파일다운로드 함수 이용
  // 매개변수로는 다운로드 경로와, zip파일이 저장됐을 때의 이름
  return zipDownload(zipDownloadRoot, "파일이름")
    .then((result) => {
      res.setHeader("Content-disposition", "attachment");

      // 리턴받은 zip파일 경로를 통해 다운로드한다.
      return res.download(result);
    })
    .catch((zipDownloadErr) => next(zipDownloadErr));
});

// 다시 리펙토링
router.get("/downloadImg/:img_uuid", async function (req, res, next) {
  let qu = req.params.img_uuid;
  const db_result = await maria.run(
    "SELECT * FROM image WHERE img_uuid='" + qu + "';"
  );
  console.log(db_result.length);

  // //const data = await maria.run(
  //   "SELECT * FROM image WHERE img_uuid='" + rand + "';"
  // );

  // 기본경로
  const directoryPath = __basedir + "/sdf_img_data/";

  console.log("******************************************");
  //console.log(db_result);
  console.log("******************************************");

  if (db_result.length == 1) {
    res.download(
      directoryPath + db_result[0].img_file_name,
      db_result[0].img_file_name,
      (err) => {
        if (err) {
          console.log("파일존재안함");
        }
      }
    );
  } else if (db_result.length > 1) {
    return zipImgDownload(directoryPath, db_result[0].img_search, db_result)
      .then((result) => {
        res.setHeader("Content-disposition", "attachment");

        // 리턴받은 zip파일 경로를 통해 다운로드한다.
        return res.download(result);
      })
      .catch((zipDownloadErr) => next(zipDownloadErr));
  }
});

// zip다운로드 함수 리펙토링
const zipImgDownload = (path, fileName, db_result) =>
  new Promise((resolve, reject) => {
    const zip = new require("node-zip")();

    // 압축할 파일들을 입력해준다.
    // 매개변수로는 파일이미지, fs.readFileSync(경로 + 파일명.확장자)
    // for문으로 파일 개수를 파악해서 넣어야할듯 싶음
    // zip.file("test_image1.jpg", fs.readFileSync(path + "test_image1.jpg"));
    for (let i = 0; i < db_result.length; i++) {
      zip.file(
        db_result[i].img_file_name,
        fs.readFileSync(path + db_result[i].img_file_name)
      );
    }

    // 서버에 zip파일을 저장할 경로와 이름을 지정한다.
    let zipFolderPath = __basedir + "/sdf_zip_data";
    const zipPath = `${zipFolderPath}/${db_result[0].img_uuid}_${fileName}.zip`;
    const addZip = zip.generate({ base64: false, compression: "DEFLATE" });

    // 서버에 zip파일을 저장한다.
    fs.writeFileSync(zipPath, addZip, "binary");

    // zip파일 경로를 리턴
    return resolve(zipPath);
  });

module.exports = router;
