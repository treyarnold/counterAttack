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
        opponentsKilled: 0,
    },
    engineer: {
        name: "Engineer",
        baseHP: 100,
        hp: 200,
        baseAttack: 8,
        attack: 8,
        counter: 15,
        img: "./assets/images/engineer.png",
        oldID: "",
        opponentsKilled: 0,
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
        opponentsKilled: 0,
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
        opponentsKilled: 0,
    },
}

const game = {
    setStats: function (id, character) {
        $(id).text(character.name);
        $(id + "HP").text(character.hp);
        $(id + "ATK").text(character.attack);
        $(id + "CounterATK").text(character.counter);
    },           

    loser: function(){
        $("#endGame").css("color", "red");
        $("#endGame").text("Death Becomes You");
        losses++;  
        game.endGame();      
    },
    
    defeated: function(){
        $(".currentOpponent").css("display", "none");
        $("#currentOpponentIMG").attr("src", "");
        currentPlayer.opponentsKilled++;
        if (currentPlayer.opponentsKilled === 3) {
            game.winner();
        }
    },
    
    winner: function () {
        $("#endGame").css("color", "green");
        $("#endGame").text("Victory is Yours!");
        wins++;
        game.endGame();
    },

    endGame: function () {
        $("#wins").text(wins);
        $("#losses").text(losses);
        game.reset();
    },

    reset: function () {
        $("body").on("click", () => {
            combatDiv.fadeOut("slow", () => {
                $("body").off("click");
                gameDiv.fadeIn("slow");
            })
        })
    },
}    

$(".playerChoice").on("click", (event) => {
    let choice = event.target.id;
    let opponentCount = 1;
    $.each(characters, function (key) {
        if (key === choice) {
            currentPlayer = this;
            $("#playerIMG").attr("src", this.img);
            game.setStats("#player", this);
            $("#playerIMG").attr("id", key);
            this.oldID = "#player";
        } else {
            this.oldID = "#opponent" + opponentCount;
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
        let choice = event.target.id;
        $.each(characters, function (key) {
            if ((key === choice) && (this.hp != 0)) {
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
        if (currentOpponent.hp < 0) {
            currentOpponent.hp = 0;
        }
        if (currentPlayer.hp < 0) {
            currentPlayer.hp = 0;
        }
        if (currentPlayer.hp === 0) {
            game.loser();
        } else if (currentOpponent.hp === 0) {
            game.defeated();
        }
        game.setStats ("#player", currentPlayer);
        game.setStats ("#currentOpponent", currentOpponent);
        game.setStats (currentOpponent.oldID, currentOpponent);
    }
})