const express = require("express");
const app = express();
const port = 3000;

// body-parser
// x-www-form-urlencoded 방식, 객체 형태로 결과가 나옴
app.use(express.urlencoded({ extended: true }));
// json
app.use(express.json());

// JS CSS 연결하기 위해
// static 이라는 정적인 폴더를 생성하여 사용 (괄호안에 파일명)
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

let user_data = "";

// 회원가입
app.get("/", (req, res) => {
  res.render("join");
});

// 로그인 페이지로 이동
app.get("/movelogin", (req, res) => {
  res.render("login");
});

// userinfo 경로로 GET 요청이 오면 user_data를 JSON 형식으로 반환합니다. 이를 통해 user_data라는 데이터를 클라이언트에게 전달할 수 있습니다.
app.get("/userinfo", (req, res) => {
  res.json(user_data);
});

// 로그인 성공 페이지 이동
app.get("/loginsuccess", (req, res) => {
  const { name } = req.query;

  // 로그인 성공 시 name 전달
  res.render("loginsuccess", { name });
});

// 아이디 찾기 이동 (a태그 사용)
app.get("/idFind", (req, res) => {
  res.render("idFind");
});

// 비밀번호 찾기 이동 (a태그 사용)
app.get("/passFind", (req, res) => {
  res.render("passFind");
});
// 회원가입 이동 (a태그 사용)
app.get("/join", (req, res) => {
  res.render("join");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
