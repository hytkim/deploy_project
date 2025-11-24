require("dotenv").config({ path: "./database/dbConfig.env" });
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

// 운영모드에서 추가적인 경로 설정
let apiPath = "";
if (process.argv[2] == "prod") {
  apiPath = "/api";
}

app.get(`${apiPath}/board`, (req, res) => {
  res.send({ title: "노드 api 서버 update!!!!" });
});

// 정적인 파일 등록
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath)); // 스태딕파일 경로 할때 지정할수있는데, 이때 지정안해주면 루트'/'로 지정됨

// vye.js build 파일 제공
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// vue.js 새로고침 예외 처리 => 코드가 가장마지막에들어가야됨. 위에 선언된 서버라우팅을 모두 체크하고 난 뒤에 동작해야하기 때문
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});
