// TODO: add fade animation to spinner
// TODO: Skeleton pages
// TODO: Set active page by url
// TODO: Test onload functionality

$(document).ready(function() {
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

    seeMoreBtn.click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
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

    contactForm.submit(function(e) {
        e.preventDefault();

        var $form = $(this);
        if (isFormValid()) {
            var cardContent = contactForm.parent();
            $.post($form.attr("action"), $form.serialize()).then(
                function success() {
                    var successAlert = [
                        '<div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">',
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                        '<span aria-hidden="true">&times;</span>',
                        "</button>",
                        "<strong>Success!</strong> I have received your message and will reply to as soon as possible.",
                        "</div>"
                    ]
                        .join("")
                        .replace(/\s\s+/g, "");

                    cardContent.append(successAlert);
                },
                function error() {
                    var errorAlert = [
                        '<div class="mt-3 alert alert-danger alert-dismissible fade show" role="alert">',
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                        '<span aria-hidden="true">&times;</span>',
                        "</button>",
                        '<strong>Oops!</strong> An error occurred while sending your message. Please try again or email me directly at <a class="alert-link" href="mailto:email@example.com">email@example.com</a>.',
                        "</div>"
                    ]
                        .join("")
                        .replace(/\s\s+/g, "");

                    cardContent.append(errorAlert);
                }
            );
        }
    });

    function isFormValid() {
        formGroupHasError = $(".form-group.has-error");
        return formGroupHasError.length > 0 ? false : true;
    }

    requiredFormFields.change(function() {
        var $this = $(this);
        var $formGroup = $this.parents(".form-group");
        if (!$this.val() || $this.val() == "") {
            $formGroup.addClass("has-error");
        } else {
            $formGroup.removeClass("has-error");
        }

        var emptyRequiredFields = requiredFormFields.filter(function() {
            return $(this).val() == "";
        });

        if (isFormValid() && emptyRequiredFields.length == 0) {
            formSubmitButton.removeAttr("disabled");
        } else {
            formSubmitButton.attr("disabled", true);
        }
    });

    // function removeSpinner() {
    //   setTimeout(function() {
    //     preloader.remove();
    //   }, 1000);
    // }
});
