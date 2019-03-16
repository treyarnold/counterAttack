const gameDiv = $("#gameDiv");
const combatDiv = $("#combatDiv");
let wins = 0;
let losses = 0;
let currentPlayer;
let currentOpponent;
const characters = {
    outlaw: {
        name: "Outlaw",
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/outlaw.png",
        currentPlayer: false,
        dead: false, 
    },
    engineer: {
        name: "Engineer",
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/engineer.png",
        currentPlayer: false,
        dead: false,
    },
    scout: {
        name: "Scout",
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/scout.png",
        currentPlayer: false,
        dead: false,
    },
    thief: {
        name: "Thief",
        baseHP: 100,
        hp: 100,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/thief.png",
        currentPlayer: false,
        dead: false,
    },
}

const game = {
    setStats: function (id, character) {
        console.log(id);
        console.log(character.name);
        $(id).text(character.name);
        $(id + "HP").text(character.hp);
        $(id + "ATK").text(character.attack);
        $(id + "CounterATK").text(character.counter);
    }
}

$("img").on("click", function (event) {
    let choice = event.target.id;
    console.log(choice);
    let opponentCount = 1;
    $.each(characters, function(key, value){
        if (key === choice) {
            currentPlayer = this;
            $("#playerIMG").attr("src", this.img);
            game.setStats("#player", this);
        } else {
            $("#opponent" + opponentCount + "IMG").attr("src", this.img);
            game.setStats("#opponent" + opponentCount, this);
            opponentCount++;
        }
    })
    gameDiv.fadeOut("slow", function() {
        combatDiv.fadeIn("slow");
    });
});