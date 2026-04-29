(function () {
    var s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?render=' + EMAILJS_CONFIG.recaptchaSiteKey;
    document.head.appendChild(s);
}());

$(document).ready(function () {

    // Lock hover preview once a star is selected
    $(".star-rating input[type='radio']").on("change", function () {
        $(this).closest(".star-rating").addClass("is-selected");
    });

    // Shared EmailJS form handler with reCAPTCHA v3
    function handleFormSubmit(formId, btnId, statusId, successMsg, btnLabel, action) {
        $(formId).on("submit", function (e) {
            e.preventDefault();

            var $btn    = $(btnId);
            var $status = $(statusId);
            var form    = this;

            $btn.prop("disabled", true).text("Sending…");
            $status.text("").css("color", "");

            grecaptcha.ready(function () {
                grecaptcha.execute(EMAILJS_CONFIG.recaptchaSiteKey, { action: action })
                    .then(function (token) {
                        $(formId).find('input[name="recaptcha_token"]').val(token);
                        return emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form);
                    })
                    .then(function () {
                        $status.text(successMsg).css("color", "#2D6E4F");
                        $(formId)[0].reset();
                        $(formId).find(".star-rating").removeClass("is-selected");
                    })
                    .catch(function (err) {
                        $status.text("Something went wrong. Please try again.").css("color", "#C8340C");
                        console.error("EmailJS error:", err);
                    })
                    .finally(function () {
                        $btn.prop("disabled", false).text(btnLabel);
                    });
            });
        });
    }

    handleFormSubmit("#inquiry-form", "#inq-btn", "#inquiry-status",
        "Message sent! We'll be in touch.", "Send Message", "inquiry");
    handleFormSubmit("#review-form",  "#rev-btn", "#review-status",
        "Review submitted — thank you!", "Submit Review", "review");
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;
            });
        } // End if

        // Collapse the mobile navbar after any link click
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        $(".slideanim").each(function () {
            if ($(this).offset().top < scrollTop + 600) {
                $(this).addClass("slide");
            }
        });

        // Parallax on mobile only — background moves at 40% of scroll speed
        if ($(window).width() <= 768) {
            $("#services, .locations-section").each(function () {
                var offset = (scrollTop - $(this).offset().top) * 0.4;
                $(this).css("background-position-y", "calc(50% + " + offset + "px)");
            });
        }
    });
})