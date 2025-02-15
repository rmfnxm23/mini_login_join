// 폼 제출 시, 로그인 ID 값을 읽어와서 처리하기
document.getElementById("login_btn").addEventListener("click", function (e) {
  e.preventDefault(); // 기본 폼 제출 방지
  let login_id = document.querySelector("#input_Id").value;
  let login_pass = document.querySelector("#input_Pass").value;

  fetch("/userinfo")
    .then((response) => response.json())
    .then((data) => {
      let base_data = JSON.parse(localStorage.getItem("data")) || [];

      const login_user = base_data.find((x) => x.id === login_id);

      if (!login_id || !login_pass) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      if (login_id === login_user.id && login_pass === login_user.pass) {
        alert("로그인되었습니다.");

        // 로그인 후 환영 페이지로 이동 // query에 이름을 넘겨주고 loginsuccess 페이지 렌더링 시 쿼리의 name을 받아 사용할 수 있게 하기 위해서
        window.location.href = `/loginsuccess?name=${login_user.name}`;
      } else {
        alert("아이디와 비밀번호가 일치하지 않습니다.");
      }
    });
});
