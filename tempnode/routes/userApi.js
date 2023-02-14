const express = require("express");
const { response } = require("../app");
const maria = require("../maria");
var router = express.Router();

router.use(express.json());

const testList = [
  { id: 1, name: "Jin" },
  { id: 2, name: "Kim" },
  { id: 3, name: "Lee" },
];

router.get("/listTest", (req, res) => {
  res.status(200).json({ testList });
});

router.post("/postTest", (req, res) => {
  responseaa = {
    id: req.body.id,
    pw: req.body.pw,
  };
  // myObj.someProperty = req.body.id;
  console.log(responseaa);
  res.end(JSON.stringify(responseaa));
});

router.post("/postTestinput", (req, res) => {
  maria.run(
    "INSERT INTO image(img_search,img_binary_data,img_path,img_file_name, img_uuid) values ('" +
      req.body.img_search +
      "', '" +
      req.body.img_binary +
      "', '" +
      req.body.img_path +
      "', '" +
      req.body.img_file_name +
      "', '" +
      req.body.img_uuid +
      "');"
  );

  res.end();
});

router.get("/downloadList/:rand", async (req, res) => {
  let rand = req.params.rand;
  const data = await maria.run(
    "SELECT * FROM image WHERE img_uuid='" + rand + "';"
  );

  //return data[0].img_file_name;
  // console.log(data[1].img_file_name);
  res.status(200).json({ data });
  return data;
});

router.get("/searchImg/:search", async (req, res) => {
  let search = req.params.search;
  const data = await maria.run(
    "SELECT * FROM image WHERE img_search LIKE CONCAT('%','" + search + "','%')"
  );

  res.status(200).json({ data });
  return data;
});

/*
let someValue;
const myObj = {
  someProperty: someValue,
};

Object.defineProperty(myObj, "someProperty", {
  get() {
    return this.someProperty;
  },
  set(newValue) {
    this.someProperty = newValue;
    alert("change!");
  },
});*/

module.exports = router;
