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
        baseAttack: 13,
        attack: 13,
        counter: 10,
        img: "./assets/images/outlaw.png",
        oldID: "",
        opponentsKilled: 0,
    },
    engineer: {
        name: "Engineer",
        baseHP: 110,
        hp: 110,
        baseAttack: 8,
        attack: 8,
        counter: 12,
        img: "./assets/images/engineer.png",
        oldID: "",
        opponentsKilled: 0,
    },
    scout: {
        name: "Scout",
        baseHP: 95,
        hp: 95,
        baseAttack: 14,
        attack: 14,
        counter: 10,
        img: "./assets/images/scout.png",
        oldID: "",
        opponentsKilled: 0,
    },
    thief: {
        name: "Thief",
        baseHP: 100,
        hp: 100,
        baseAttack: 9,
        attack: 9,
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
        let id = "#" + currentPlayer.name.toLowerCase();
        $(id).addClass("dead");
        game.endGame();      
    },
    
    defeated: function(){
        $(".currentOpponent").css("display", "none");
        $("#currentOpponentIMG").attr("src", "");
        $("#" + currentOpponent.name.toLowerCase()).addClass("dead");
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
        $("#playAgain").removeClass("hidden");
        $.each(characters, function (key) {
            this.hp = this.baseHP;
            this.attack = this.baseAttack;
            this.opponentsKilled = 0;
            let id = "#" + this.name.toLowerCase(); 
            $(id).attr("id", this.oldID + "IMG");
        });
        currentOpponent = null;
        currentPlayer = null;
        game.idSwitchBack();
        $("#playAgain").on("click", () => {
            combatDiv.fadeOut("slow", () => {
                gameDiv.fadeIn("slow");
                let id = "#opponent";
                for (let i = 1; i <= 3; i++) {
                    $(id + i + "IMG").removeClass("dead");
                }
                $("#playerIMG").removeClass("dead");
                $("#playAgain").addClass("hidden");
                $(".currentOpponent").addClass("hidden");
                $("#currentOpponentIMG").attr("src", "");
                $("#endGame").text("");
            })
        });
    },

    idSwitch: function () {
        $("#engineer").attr("id", "character1");
        $("#thief").attr("id", "character2");
        $("#outlaw").attr("id", "character3");
        $("#scout").attr("id", "character4");
    }, 

    idSwitchBack: function () {
        $("#character1").attr("id", "engineer");
        $("#character2").attr("id", "thief");
        $("#character3").attr("id", "outlaw");
        $("#character4").attr("id", "scout");
    }, 
}    

game.setStats("#characterChoice1", characters.engineer);
game.setStats("#characterChoice2", characters.thief);
game.setStats("#characterChoice3", characters.outlaw);
game.setStats("#characterChoice4", characters.scout);

$(".playerChoice").on("click", function (event) {
    let choice = event.target.id;
    let opponentCount = 1;
    $.each(characters, function (key) {
        if (key === choice) {
            currentPlayer = this;
            $("#playerIMG").attr("src", this.img);
            game.setStats("#player", this);
            $("#playerIMG").attr("id", key);
            this.oldID = "player";
        } else {
            this.oldID = "opponent" + opponentCount;
            $("#" + this.oldID + "IMG").attr("src", this.img);
            game.setStats("#" + this.oldID, this);
            $("#" + this.oldID + "IMG").attr("id", key);
            opponentCount++;
        }
    })
    game.idSwitch();
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
                $(".currentOpponent").removeClass("hidden");
                $("#currentOpponentIMG").attr("src", this.img),
                game.setStats("#currentOpponent", this);
                $(".currentOpponent").fadeIn("slow");
            }
        })
    }
});

$("#attack").on("click", () => {
    if (!($("#currentOpponentIMG").attr("src") === "")  && (!(currentOpponent === null))) {
        currentOpponent.hp -= currentPlayer.attack;
        currentPlayer.hp -= currentOpponent.counter;
        currentPlayer.attack += currentPlayer.baseAttack;
        if (currentOpponent.hp < 0) {
            currentOpponent.hp = 0;
        }
        if (currentPlayer.hp < 0) {
            currentPlayer.hp = 0;
        }
        game.setStats ("#player", currentPlayer);
        game.setStats ("#currentOpponent", currentOpponent);
        game.setStats ("#" + currentOpponent.oldID, currentOpponent);
        if (currentPlayer.hp === 0) {
            game.loser();
        } else if (currentOpponent.hp === 0) {
            game.defeated();
        }
    }
})