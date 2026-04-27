$(document).ready(function () {

    // Lock hover preview once a star is selected
    $(".star-rating input[type='radio']").on("change", function () {
        $(this).closest(".star-rating").addClass("is-selected");
    });

    // Shared EmailJS form handler
    function handleFormSubmit(formId, btnId, statusId, successMsg, btnLabel) {
        $(formId).on("submit", function (e) {
            e.preventDefault();

            var $btn    = $(btnId);
            var $status = $(statusId);

            $btn.prop("disabled", true).text("Sending…");
            $status.text("").css("color", "");

            emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, this)
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
    }

    handleFormSubmit("#inquiry-form", "#inq-btn", "#inquiry-status",
        "Message sent! We'll be in touch.", "Send Message");
    handleFormSubmit("#review-form",  "#rev-btn", "#review-status",
        "Review submitted — thank you!", "Submit Review");
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
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
})