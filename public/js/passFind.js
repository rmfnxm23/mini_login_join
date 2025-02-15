document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault(); // 기본 폼 제출 방지

  const input_Id = document.querySelector("#input_Id").value;

  if (!input_Id) {
    alert("이메일을 입력해주세요.");
    return;
  }

  // localStorage에서 저장된 데이터 가져오기
  let base_data = JSON.parse(localStorage.getItem("data")) || [];

  // 입력한 id와 일치하는 사용자 찾기
  const user = base_data.find((x) => x.id === input_Id);

  if (user) {
    // 사용자 비밀번호 찾았다면 출력
    document.getElementById(
      "show_password"
    ).innerText = `비밀번호: ${user.pass}`;
  } else {
    // 일치하는 비밀번호가 없으면 경고 메시지 출력
    document.getElementById("show_password").innerText =
      "등록된 아이디가 없습니다.";
  }
});
