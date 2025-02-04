document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("_1c_uABZMACZQXbgY"); // Your EmailJS Public Key

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission refresh

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        let templateParams = {
            user_name: name,
            user_email: email,
            message: message
        };

        emailjs.send("service_aohqtfg", "template_fyvkjth", templateParams)
            .then(function (response) {
                document.getElementById("status-message").textContent = "✅ Message sent successfully!";
                document.getElementById("contact-form").reset();
            }, function (error) {
                document.getElementById("status-message").textContent = "❌ Error sending message.";
            });
    });
});