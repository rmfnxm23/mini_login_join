document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault(); // 기본 폼 제출 방지

  const input_Phone1 = document.querySelector("[name='phone1']").value;
  const input_Phone2 = document.querySelector("[name='phone2']").value;
  const input_Phone3 = document.querySelector("[name='phone3']").value;

  if (!input_Phone1 || !input_Phone2 || !input_Phone3) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const phone_number = `${input_Phone1}-${input_Phone2}-${input_Phone3}`;

  // localStorage에서 저장된 데이터 가져오기
  let base_data = JSON.parse(localStorage.getItem("data")) || [];

  // 입력한 전화번호와 일치하는 사용자 찾기
  const user = base_data.find((x) => x.phone === phone_number);

  if (user) {
    // 사용자 아이디를 찾았다면 출력
    document.getElementById("show_id").innerText = `아이디: ${user.id}`;
  } else {
    // 일치하는 아이디가 없으면 경고 메시지 출력
    document.getElementById("show_id").innerText = "등록된 아이디가 없습니다.";
  }
});
