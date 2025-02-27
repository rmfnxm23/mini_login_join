function id_check() {
  const input_Id = document.querySelector("#input_Id").value;
  const id_Message = document.getElementById("id_Message");

  // 로컬스토리지에서 데이터 가져오기 (없으면 빈 배열)
  let base_data = JSON.parse(localStorage.getItem("data")) || [];

  // 로컬스토리지에 저장된 데이터에서 아이디 값만 비교
  const same_data = base_data.filter((item) => item.id === input_Id);
  console.log(input_Id, "1111111");
  console.log(same_data, "222222");
  if (!input_Id) {
    // input_Id가 빈값일 경우 처리
    id_Message.innerText = "ID를 입력해주세요.";
    document.getElementById("submitBtn").disabled = true; // 로그인 버튼 비활성화
  } else if (same_data.length > 0) {
    // 중복된 ID가 있을 경우
    id_Message.innerText = "이미 존재하는 ID입니다.";
    document.getElementById("submitBtn").disabled = true; // 로그인 버튼 비활성화
  } else {
    // 중복되지 않으면
    id_Message.innerText = "사용 가능한 ID입니다.";
    document.getElementById("submitBtn").disabled = false; // 로그인 버튼 활성화
  }
}

fetch("/userinfo")
  .then((response) => response.json()) // response는 매개변수
  .then((data) => {
    // 로그인 버튼 클릭 시 데이터 추가
    document
      .getElementById("submitBtn")
      .addEventListener("click", function (event) {
        event.preventDefault(); // 폼 제출 방지

        const input_Id = document.querySelector("#input_Id").value;
        const input_Name = document.querySelector("[name='name']").value;
        const input_Pass = document.querySelector("[name='pass']").value;
        const input_Phone1 = document.querySelector("[name='phone1']").value;
        const input_Phone2 = document.querySelector("[name='phone2']").value;
        const input_Phone3 = document.querySelector("[name='phone3']").value;

        // 각 입력값이 빈 값인지 확인
        if (
          !input_Id ||
          !input_Name ||
          !input_Pass ||
          !input_Phone1 ||
          !input_Phone2 ||
          !input_Phone3
        ) {
          alert("모든 필드를 입력해주세요.");
          return; // 데이터가 비어있으면 저장하지 않음
        }

        // 비밀번호 재확인 체크
        const input_PassCheck =
          document.querySelector("[name='passCheck']").value;
        const pass_Message = document.querySelector("#pass_Message");
        if (input_Pass !== input_PassCheck) {
          // alert("비밀번호가 일치하지 않습니다.");
          pass_Message.innerText = "비밀번호가 일치하지 않습니다.";
          return;
        }

        // // 정규식 정의
        // const phone1Regex = /^010$/; // 첫 번째 입력은 "010"만 허용
        // const phone2Regex = /^[0-9]{4}$/; // 두 번째 입력은 4자리 숫자
        // const phone3Regex = /^[0-9]{4}$/; // 세 번째 입력은 4자리 숫자

        // let isValid = true;

        // // 첫 번째 필드 검사
        // if (!phone1Regex.test(phone1)) {
        //   alert("첫 번째 필드는 '010'만 입력 가능합니다.");
        //   isValid = false;
        // }

        // // 두 번째 필드 검사
        // if (!phone2Regex.test(phone2)) {
        //   alert("두 번째 필드는 4자리 숫자만 입력 가능합니다.");
        //   isValid = false;
        // }

        // // 세 번째 필드 검사
        // if (!phone3Regex.test(phone3)) {
        //   alert("세 번째 필드는 4자리 숫자만 입력 가능합니다.");
        //   isValid = false;
        // }

        // // 유효성 검사 실패 시 폼 제출 막기
        // if (!isValid) {
        //   event.preventDefault();
        // }

        // 로컬스토리지에서 기존 데이터 가져오기
        let base_data = JSON.parse(localStorage.getItem("data")) || [];

        // 중복되지 않으면 새로운 데이터 추가
        base_data.push({
          id: input_Id,
          name: input_Name,
          pass: input_Pass,
          phone: `${input_Phone1}-${input_Phone2}-${input_Phone3}`,
        });

        // 로컬스토리지에 데이터 저장
        localStorage.setItem("data", JSON.stringify(base_data));

        // 성공 메시지 출력
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/movelogin";
      });
  })
  .catch((error) => {
    console.log("error");
    console.error("에러 발생: ", error);
  });

// 생년월일 동적 생성
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 연도 생성 (현재 연도부터 과거 100년까지)
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= currentYear - 100; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// 월 생성
for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  monthSelect.appendChild(option);
}

// 일 생성 (기본적으로 31일로 설정)
const updateDays = () => {
  daySelect.innerHTML = ""; // 기존의 옵션을 삭제
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);

  // 2월은 윤년을 고려
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // "선택" 옵션 추가
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "선택";
  daySelect.appendChild(defaultOption);

  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  }
};

// 연도 또는 월이 변경될 때마다 일 수를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 초기 상태에서 날짜 업데이트
updateDays();
