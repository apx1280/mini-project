
let i = 0,
container = document.querySelector(".container");
preLoad = document.querySelector(".pre_loader");
line = document.querySelector(".line"), 
text = document.querySelector(".text"),
width = 1, 
interVal = 0;

const animateBar = (setInterVal)  => {
  if (i == 0) {
    i = 1;

    const frame = () => {
      if (width >= 100) {
        clearInterval(interVal);
        container.remove();
        i = 0;
      } else {
        width++;
        line.style.width = width + "%";
      }
    };
    interVal = setInterval(frame, setInterVal);
  }
};

animateBar(10);

const media = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        text.style.fontSize = "10px"
      } else {
        text.style.fontSize = "26px"
      }
}

media();

window.addEventListener('resize', media, true);



