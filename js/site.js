// TODO: add fade animation to spinner
// TODO: Skeleton pages
// TODO: Set active page by url
// TODO: Test onload functionality

$(document).ready(function () {
  //var preloader = $(".preloader");
  var navbar = $("nav.navbar.nav-home");
  var seeMoreBtn = $(".js-scroll-trigger.btn-see-more");
  var contactForm = $("#contact-form");
  var requiredFormFields = contactForm.find('[required="required"]');
  var formSubmitButton = $("button.btn-submit");
  var formGroupHasError;

  //removeSpinner();

  $(".footerYear").html(new Date().getFullYear());

  collapseNavbar();

  seeMoreBtn.click(function () {
    if (
      location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({
            scrollTop: target.offset().top
          },
          1000,
          "easeInOutSine"
        );
        return false;
      }
    }
  });

  $(window).scroll(function () {
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

  contactForm.submit(function (e) {
    e.preventDefault();

    var $form = $(this);
    if (isFormValid()) {
      $.post($form.attr("action"), $form.serialize()).then(function () {
        alert("Thank you!");
      });
    }

  });

  function isFormValid() {
    formGroupHasError = $('.form-group.has-error');
    return formGroupHasError.length > 0 ? false : true;
  }

  requiredFormFields.change(function () {
    var $this = $(this);
    var $formGroup = $this.parents('.form-group');
    if (!$this.val() || $this.val() == "") {
      $formGroup.addClass('has-error');
    } else {
      $formGroup.removeClass('has-error');
    }

    var emptyRequiredFields = requiredFormFields.filter(function () {
      return $(this).val() == "";
    });

    if (isFormValid() && emptyRequiredFields.length == 0) {
      formSubmitButton.removeAttr('disabled');
    } else {
      formSubmitButton.attr('disabled', true);
    }
  });


  // function removeSpinner() {
  //   setTimeout(function() {
  //     preloader.remove();
  //   }, 1000);
  // }
});