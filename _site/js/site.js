// TODO: add fade animation to spinner
// TODO: Skeleton pages
// TODO: Set active page by url
// TODO: Test onload functionality

$(document).ready(function() {
  //var preloader = $(".preloader");
  var navbar = $("nav.navbar.nav-home");
  var seeMoreBtn = $(".js-scroll-trigger.btn-see-more");

  //removeSpinner();

  $(".footerYear").html(new Date().getFullYear());

  collapseNavbar();

  seeMoreBtn.click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          "easeInOutSine"
        );
        return false;
      }
    }
  });

  $(window).scroll(function() {
    collapseNavbar();
  });

  function collapseNavbar() {
    // Collapse the navbar if page position is greater than 100px from the top
    if (navbar.length > 0 && navbar.offset().top > 100) {
      navbar.addClass("navbar-shrink");
    } else {
      navbar.removeClass("navbar-shrink");
    }
  }

  // function removeSpinner() {
  //   setTimeout(function() {
  //     preloader.remove();
  //   }, 1000);
  // }
});
