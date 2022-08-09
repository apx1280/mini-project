xxl = window.matchMedia("screen and (max-width: 768px)");

var shoUsers = JSON.parse(localStorage.getItem("allusrs"));

const leaderBoard = () => {
  const dom = document.querySelector("body");
  dom.insertAdjacentHTML(
    "afterbegin",
    '<div class="leaderWrapper"> <div class="wrapper"> <span class="leaderclose">x</span> <div class="content"> <div class="scoreboard"> <table> <thead> <tr> <th>RANK</th> <th>NAME</th> <th>SCORE</th> <th>LEVEL</th> </tr></thead> <tbody class="leaderbody"></tbody></table> </div></div></div></div>'
  );

  let leaderbody = document.querySelector(".leaderbody");
  var rank = 1;
  shoUsers.map((item) => {
      return leaderbody.insertAdjacentHTML(
          "beforeend",
          "<tr> <td>" +
          rank++ +
          "</td><td>" +
          item.FirstName +
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
        window.addEventListener(
          "resize",
          () => {
            media();
          },
          true
        );
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



export const updateScore = (score, LEVEL) => {
  var currid = JSON.parse(localStorage.getItem("currentuser"))[0].id;
  var allUsers = JSON.parse(localStorage.getItem("allusrs"));
  
  allUsers.forEach((ele) => {
    if(ele.id == currid){ 
       ele.score = score;
       ele.level = LEVEL;
    }
});
console.log(JSON.stringify(allUsers));
localStorage.setItem("allusrs",JSON.stringify(allUsers));
}

export default leaderBoard;
