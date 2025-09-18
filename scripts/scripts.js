// On page load, check saved preference
$(document).ready(function () {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
        $("html").attr("data-bs-theme", "dark");
        $("body").addClass("dark-mode");
        $("#mode-btn").text("Switch to Light Mode");
    } else {
        $("html").removeAttr("data-bs-theme");
        $("body").removeClass("dark-mode");
        $("#mode-btn").text("Switch to Dark Mode");
    }
});

// Toggle dark mode
$("#mode-btn").click(function () {
    const $html = $("html");

    $("body").toggleClass("dark-mode");

    if ($html.attr("data-bs-theme") === "dark") {
        $html.removeAttr("data-bs-theme");
        localStorage.setItem("darkMode", "false");
        $(this).text("Switch to Dark Mode");
    } else {
        $html.attr("data-bs-theme", "dark");
        localStorage.setItem("darkMode", "true");
        $(this).text("Switch to Light Mode");
    }
});


