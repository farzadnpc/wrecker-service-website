(function(){
    emailjs.init({
        publicKey: "-NZcQAN4ItYp9mRtu",
    });
})();
function sendMail() {
    let car = document.getElementsByName("car")[0].value.trim();
    let pickup = document.getElementsByName("pickup")[0].value.trim();
    let name = document.getElementsByName("name")[0].value.trim();
    let email = document.getElementsByName("email")[0].value.trim();
    let mobile = document.getElementsByName("mobile")[0].value.trim();

    if (!car || !email || !mobile) {
        alert("Please fill in all required fields.");
        return;
    }

    let parms = {
        car: car,
        pickup: pickup,
        name: name,
        email: email,
        mobile: mobile
    };

    emailjs.send("service_elffr9m", "template_015hpab", parms)
    .then(function(response) {
        alert("Message sent successfully!");
        document.getElementById("quote-form").reset();
    })
    .catch(function(error) {
        alert("Something went wrong: " + JSON.stringify(error));
    });
}