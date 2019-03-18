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
        oldID: "",
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
        oldID: "",
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
        oldID: "",
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
        oldID: "",
        dead: false,
    },
}

const game = {
    setStats: function (id, character) {
        $(id).text(character.name);
        $(id + "HP").text(character.hp);
        $(id + "ATK").text(character.attack);
        $(id + "CounterATK").text(character.counter);
    }
}

$(".playerChoice").on("click", (event) => {
    let choice = event.target.id;
    console.log(choice);
    let opponentCount = 1;
    $.each(characters, function (key) {
        if (key === choice) {
            currentPlayer = this;
            console.log(this);
            $("#playerIMG").attr("src", this.img);
            game.setStats("#player", this);
            $("#playerIMG").attr("id", key);
            this.oldID = "#player";
        } else {
            this.oldID = "#opponent" + opponentCount;
            console.log(this);
            
            $(this.oldID + "IMG").attr("src", this.img);
            game.setStats(this.oldID, this);
            $(this.oldID + "IMG").attr("id", key);
            opponentCount++;
        }
    })
    gameDiv.fadeOut("slow", function() {
        combatDiv.fadeIn("slow");
    });
});

$(".opponents").on("click", (event) => {
    if ($("#currentOpponentIMG").attr("src") === "") {
        console.log(event);
        let choice = event.target.id;
        $.each(characters, function (key) {
            if (key === choice) {
                currentOpponent = this;
                $("#currentOpponentIMG").attr("src", this.img),
                game.setStats("#currentOpponent", this);
                $(".currentOpponent").css("display", "flex");
                $(".currentOpponent").fadeIn("slow");
            }
        })
    }
});

$("#attack").on("click", () => {
    if (!($("#currentOpponentIMG").attr("src") === "")) {
        currentOpponent.hp -= currentPlayer.attack;
        currentPlayer.hp -= currentOpponent.counter;
        currentPlayer.attack += currentPlayer.baseAttack;
        game.setStats ("#player", currentPlayer);
        game.setStats ("#currentOpponent", currentOpponent);
    }
})