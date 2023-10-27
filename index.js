const body = document.getElementsByTagName("body")[0];
const videoPlayer = document.getElementsByTagName("video")[0];
videoPlayer.style.position = "absolute";

const volumeDia = document.createElement("dialog");
volumeDia.id = "dialog";

const fadeoutStyle = document.createElement("style");

fadeoutStyle.innerHTML = `

  #dialog {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      padding: 15px;
      margin-top: 10%;
      color: white;
  }

  dialog::backdrop {
    background: none;
  }

  .body {
      text-align: center;
      margin: 0;
  }

  `;

document.head.appendChild(fadeoutStyle);

document.body.appendChild(volumeDia);

var timeout = setTimeout(() => volumeDia.close(), 800);

// 오른쪽 화살표를 눌렀을 때 5초 앞으로 이동하는 함수
function skipForward() {
  console.log(videoPlayer.currentTime);
  videoPlayer.currentTime += 5;
}

// 왼쪽 화살표를 눌렀을 때 5초 뒤로 이동하는 함수
function skipBackward() {
  videoPlayer.currentTime -= 5;
}

// 위쪽 화살표를 눌렀을 때 볼륨 키우기
function volumeUp() {
  if (videoPlayer.volume + 0.05 > 1) videoPlayer.volume = 1;
  else videoPlayer.volume += 0.05;
  sessionStorage.setItem("videoVolume", videoPlayer.volume);

  volumeDia.innerHTML = Math.round(videoPlayer.volume * 100) + "%";
  clearTimeout(timeout);
  timeout = setTimeout(() => volumeDia.close(), 500);
  volumeDia.showModal();
  timeout;
}

// 아래쪽 화살표를 눌렀을 때 볼륨 줄이기
function volumeDown() {
  if (videoPlayer.volume - 0.05 < 0) videoPlayer.volume = 0;
  else videoPlayer.volume -= 0.05;
  sessionStorage.setItem("videoVolume", videoPlayer.volume);

  volumeDia.innerHTML = Math.round(videoPlayer.volume * 100) + "%";
  clearTimeout(timeout);
  timeout = setTimeout(() => volumeDia.close(), 500);
  volumeDia.showModal();
  timeout;
}

// 키보드 이벤트를 처리하는 함수
function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowLeft": // 왼쪽 화살표
      skipBackward();
      break;
    case "ArrowRight": // 오른쪽 화살표
      skipForward();
      break;
    case "ArrowUp": // 위쪽 화살표
      volumeUp();
      break;
    case "ArrowDown": // 아래쪽 화살표
      volumeDown();
      break;
    default:
      break;
  }
}
document.addEventListener("keydown", function (event) {
  handleKeyPress(event);
});

document.onload = onloadWindow();
function onloadWindow() {
  console.log(sessionStorage.getItem("videoTime"));
  videoPlayer.currentTime = sessionStorage.getItem("videoTime");
  if (sessionStorage.getItem("videoVolume") == null) videoPlayer.volume = 0.5;
  else videoPlayer.volume = sessionStorage.getItem("videoVolume");

  videoPlayer.addEventListener("timeupdate", function () {
    sessionStorage.setItem("videoTime", videoPlayer.currentTime);
  });
}
