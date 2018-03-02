(function($) {
    "use strict";
    //var preloader = $(".preloader");
    var navbar = $("nav.navbar.nav-home");
    var contactForm = $("#contact-form");
    var formSubmitButton = $("button.btn-submit");

    //removeSpinner();

    $(".footerYear").html(new Date().getFullYear());

    collapseNavbar();

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

    var $contactForm = $("#contact-form");
    var $formSubmitButton = $("button.btn-submit");
    $contactForm.submit(function(e) {
        e.preventDefault();

        var $form = $(this);
        if ($form[0].checkValidity()) {
            var $cardContent = $contactForm.parent();
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

                    $cardContent.append(successAlert);

                    $contactForm.trigger("reset");
                },
                function error() {
                    var errorAlert = [
                        '<div class="mt-3 alert alert-danger alert-dismissible fade show" role="alert">',
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                        '<span aria-hidden="true">&times;</span>',
                        "</button>",
                        '<strong>Oops!</strong> An error occurred while sending your message. Please try again or email me directly at <a class="alert-link" href="mailto:a.jeffredo2@gmail.com">a.jeffredo2@gmail.com</a>.',
                        "</div>"
                    ]
                        .join("")
                        .replace(/\s\s+/g, "");

                    $cardContent.append(errorAlert);

                    $contactForm.trigger("reset");

                    $formSubmitButton.attr("disabled", true);
                }
            );
        }
    });

    var inputs = document.querySelectorAll("input, select, textarea, select");
    inputs.forEach(function(input) {
        var $input = $(input);
        var $formGroup = $input.parents(".form-group");
        var $feedback = $formGroup.find(".form-control-feedback");

        input.addEventListener("input", function() {
            if (input.validity.valid) {
                $formGroup.removeClass("has-danger");
            } else {
                $formGroup.addClass("has-danger");
                if (input.validity.typeMismatch && $input.attr("name") == "email") {
                    $feedback.html("Please provide a valid email");
                }
                if (input.validity.valueMissing && $input.attr("name") == "email") {
                    $feedback.html("Email is required");
                }
            }

            if ($contactForm[0].checkValidity()) {
                $formSubmitButton.removeAttr("disabled");
            } else {
                $formSubmitButton.attr("disabled", true);
            }
        });
    });

    // function removeSpinner() {
    //   setTimeout(function() {
    //     preloader.remove();
    //   }, 1000);
    // }
})(jQuery);
