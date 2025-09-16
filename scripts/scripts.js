$("#mode-btn").click(function(){
    $("body").toggleClass("dark-mode");

    const $html = $("html"); 
      if ($html.attr("data-bs-theme") === "dark") {
        $html.removeAttr("data-bs-theme"); 
        $(this).text("Switch to Dark Mode");
      } else {
        $html.attr("data-bs-theme", "dark"); 
        $(this).text("Switch to Light Mode");
      }
});