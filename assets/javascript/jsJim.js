var pageNum = $(".content").length;

showPage = function(pagination) {
  if (pagination < 0 || pagination >= pageNum) return;

  $(".content").hide()
  $(".content").eq(pagination).show();
  $("#pagin li").removeClass("active").eq(pagination).addClass("active");
}

$("#pagin ul a").click(function(e) {
  e.preventDefault();
  showPage($(this).parent().index());
});

showPage(0)
