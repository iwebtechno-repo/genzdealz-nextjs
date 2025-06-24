var zindex = 10;
var isShowing = false;

$(document).ready(function () {
  if ($(window).width() < 992) {
    $("div.row").addClass("showing");
    $("div.element").addClass("show");
  } else {
    //$("div.element").hover(function (e) {
    //  moreInfo(this, e);
    //});
    $("div.row").addClass("showing");
    $("div.element").addClass("show");
  }
});

function moreInfo(tile, e) {
  e.preventDefault();

  if ($(tile).hasClass("show")) {
    isShowing = true;
  }

  if ($("div.row").hasClass("showing")) {
    // a card is already in view
    $("div.element.show").removeClass("show");

    if (isShowing) {
      // this card was showing - reset the grid
      $("div.row").removeClass("showing");
    } else {
      // this card isn't showing - get in with it
      $(tile).addClass("show");
    }

    zindex++;
  } else {
    // no cards in view
    $("div.row").addClass("showing");
    $(tile).addClass("show");

    zindex++;
  }
}
