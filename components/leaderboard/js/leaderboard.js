xxl = window.matchMedia("screen and (max-width: 768px)");

var obj = [
  { sr: 1, name: "Maria Anders", score: 15000, level: "10" },
  { sr: 2, name: "Francisco Chang", score: 8000, level: "8" },
  { sr: 3, name: "Roland Mendel", score: 5000, level: "4" },
  { sr: 4, name: "Maria Anders", score: 100, level: "1" }
];

console.log(localStorage.getItem("allusrs"))

const leaderBoard = () => {
  const dom = document.querySelector("body");
  dom.insertAdjacentHTML(
    "afterbegin",
    '<div class="leaderWrapper"> <div class="wrapper"> <span class="leaderclose">x</span> <div class="content"> <div class="scoreboard"> <table> <thead> <tr> <th>RANK</th> <th>NAME</th> <th>SCORE</th> <th>LEVEL</th> </tr></thead> <tbody class="leaderbody"></tbody></table> </div></div></div></div>'
  );

  let leaderbody = document.querySelector(".leaderbody");
  obj.reverse().map((item) => {
      return leaderbody.insertAdjacentHTML(
          "afterbegin",
          "<tr> <td>" +
          item.sr +
          "</td><td>" +
          item.name +
          "</td><td>" +
          item.score +
          "</td><td>" +
          item.level +
          "</td></tr>"
          );
        });
        
        let leaderclose = document.querySelector(".leaderclose");
        let leaderWrapper = document.querySelector(".leaderWrapper");
        leaderclose.addEventListener("click",() => {
            leaderWrapper.remove();
        });
        media();
    };

const media = () => {
  let leaderB = document.querySelector(".leaderWrapper .wrapper");
  if (xxl.matches) {
    leaderB.style.width = "90%";
    leaderB.style.height = "81%";
  } else {
    leaderB.style.height = "50%";
  }
};

window.addEventListener(
  "resize",
  () => {
    media();
  },
  true
);
export default leaderBoard;
