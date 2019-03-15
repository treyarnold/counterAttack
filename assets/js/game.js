$("img").on("click", function () {
    console.log("img clicked");
    $("#gameDiv").fadeOut("slow", function() {
        $("#gameDiv").empty();
    });
});