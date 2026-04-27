$(document).ready(function () {

    // Contact form submission via EmailJS
    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        var $btn = $("#send-btn");
        var $status = $("#form-status");

        $btn.prop("disabled", true).text("Sending…");
        $status.text("").css("color", "");

        emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, this)
            .then(function () {
                $status.text("Message sent! We'll be in touch if need be.").css("color", "green");
                $("#contact-form")[0].reset();
            })
            .catch(function (err) {
                $status.text("Something went wrong. Please try again.").css("color", "red");
                console.error("EmailJS error:", err);
            })
            .finally(function () {
                $btn.prop("disabled", false).text("Send");
            });
    });
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