let i = 0,
  line = document.querySelector(".line"),
  text = document.querySelector(".text"),
  width = 1,
  interVal,
  gearItem1Position = document.querySelector("#gearItem1"),
  gearItem2Position = document.querySelector("#gearItem2"),
  gearItem3Position = document.querySelector("#gearItem3"),
  dxtext = document.querySelector(".dx-text"),
  barPosition = document.querySelector(".lineBar"),
  state = document.querySelector(".state"),
  g3 = document.getElementById("gearItem3"),
  container = document.querySelector(".container"),
  xxl = window.matchMedia(
    "screen and (min-width: 425px) and (max-width: 595px)"
  ),
  xl = window.matchMedia(
    "screen and (min-width: 375px) and (max-width: 425px)"
  ),
  xm = window.matchMedia(
    "screen and (min-width: 320px) and (max-width: 375px)"
  ),
  xs = window.matchMedia("screen and (min-width: 320px)");
const animateBar = (setInterVal) => {
  if (i == 0) {
    i = 1;

    const frame = () => {
      if (width >= 100) {
        container.remove();
        clearInterval(interVal);

        i = 0;
      } else {
        width++;
        state.innerHTML = width + "%";
        line.style.width = width + "%";
      }
    };
    interVal = setInterval(frame, setInterVal);
  }
};

animateBar(10);

function antiClock(ele, time) {
  var ro = 360;
  setInterval(() => {
    ro--;
    if (ro < 0) {
      ro = 360;
    } else {
      ele.style.transform = "rotate(" + ro + "deg)";
    }
  }, time);
}

function clock(ele, time) {
  var ro = 0;
  setInterval(() => {
    ro++;
    if (ro < 360) {
      ele.style.transform = "rotate(" + ro + "deg)";
    } else {
      ro = 0;
    }
  }, time);
}

antiClock(gearItem1Position, 20);
clock(gearItem2Position, 10);
antiClock(gearItem3Position, 2);

function gearAlignMent() {
  gearItem1Position.style.left = barPosition.offsetLeft - 43 + "px";
  gearItem1Position.style.top = barPosition.offsetTop - 40 + "px";
  gearItem2Position.style.left = gearItem1Position.offsetLeft + 50 + "px";
  gearItem2Position.style.top = gearItem1Position.offsetTop - 100 + "px";
  gearItem3Position.style.left = gearItem2Position.offsetLeft + 0 + "px";
  gearItem3Position.style.top = gearItem2Position.offsetTop - 80 + "px";
}

const media = () => {
  if (xxl.matches) {
    barPosition.style.width = "350px";
  } else if (xl.matches) {
    barPosition.style.width = "300px";
  } else if (xm.matches) {
    barPosition.style.width = "200px";
  } else {
    barPosition.style.width = "500px";
  }
};

media();
gearAlignMent();

window.addEventListener(
  "resize",
  () => {
    media();
    gearAlignMent();
  },
  true
);
