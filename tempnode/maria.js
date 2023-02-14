const mariadb = require("mariadb");
const { resolve } = require("path");
const pool = mariadb.createPool({
  host: "121.147.185.138",
  port: 3306,
  user: "nodeuser",
  password: "@ai1234",
  connectionLimit: 5,
  database: "nodetemp",
  allowPublicKeyRetrieval: true,
});

module.exports = {
  /*
  run(query) {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(query)
          .then((rows) => {
            //console.log(rows[0].img_path);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log("DATABASE에 연결되지 않았습니다.");
      });
  }*/
  async run(query) {
    return new Promise((resolve) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .query(query)
            .then((rows) => {
              // resolve(rows);
              // console.log(rows[0].img);
              resolve(rows);
            })
            .catch((err) => {
              console.log(err);
              conn.end();
            });
        })
        .catch((err) => {
          console.log("DATABASE에 연결되지 않았습니다.");
        });
    });
  },
};
