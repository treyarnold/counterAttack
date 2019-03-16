const gameDiv = $("#gameDiv");
const combatDiv = $("#combatDiv");
let wins = 0;
let losses = 0;
let currentPlayer;
let currentOpponent;
const characters = {
    outlaw: {
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/outlaw.png",
        currentPlayer: false,
        dead: false, 
        stats: `<div class="d-flex flex-column align-items-start">
                    <span>Outlaw</span>
                    <br>
                    <span>Hit Points</span>
                    <span>100</span>
                    <span>Attack</span>
                    <span>8</span>
                    <span>Counter-Attack</span>
                    <span>15</span>
                </div>`
    },
    engineer: {
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/engineer.png",
        currentPlayer: false,
        dead: false,
        stats: `<div class="d-flex flex-column align-items-start">
                    <span>Engineer</span>
                    <br>
                    <span>Hit Points</span>
                    <span>100</span>
                    <span>Attack</span>
                    <span>8</span>
                    <span>Counter-Attack</span>
                    <span>15</span>
                </div>`
    },
    scout: {
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/scout.png",
        currentPlayer: false,
        dead: false,
        stats: `<div class="d-flex flex-column align-items-start">
                    <span>Scout</span>
                    <br>
                    <span>Hit Points</span>
                    <span>100</span>
                    <span>Attack</span>
                    <span>8</span>
                    <span>Counter-Attack</span>
                    <span>15</span>
                </div>`
    },
    thief: {
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/thief.png",
        currentPlayer: false,
        dead: false,
        stats: `<div class="d-flex flex-column align-items-start">
                    <span>Thief</span>
                    <br>
                    <span>Hit Points</span>
                    <span>100</span>
                    <span>Attack</span>
                    <span>8</span>
                    <span>Counter-Attack</span>
                    <span>15</span>
                </div>`
    },
}

$("img").on("click", function (event) {
    let choice = event.target.id;
    console.log(choice);
    let opponentCount = 1;
    $.each(characters, function(key, value){
        if (key === choice) {
            currentPlayer = this;
            $("#player").attr("src", this.img);
            $("#playerStats").html(this.stats);
        } else {
            $("#opponent" + opponentCount).attr("src", this.img);
            $("#opponent" + opponentCount + "Stats").html(this.stats);
            opponentCount++;
        }
    })
    gameDiv.fadeOut("slow", function() {
        combatDiv.fadeIn("slow");
    });
});