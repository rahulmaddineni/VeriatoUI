$(document).ready(function () {
    $(".right-navbar a").on("click", function () {
        $(".right-navbar").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
});