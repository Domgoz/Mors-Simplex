function submitDate() {
    const dateValue = document.getElementById("dateDeath").value;
    if (dateValue) {
        localStorage.setItem("dateOfDeath", dateValue);
        window.location.replace("mori.html");
    } else {
        alert("Please select a date.");
    }
}

function setUpCountdown(dateString) {
    let countDownDate = dateString
        ? new Date(dateString).getTime()
        : new Date("Jan 5, 2030 15:37:25").getTime();

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    window.countdownInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var timesEl = document.getElementById("times");
        if (timesEl) {
            timesEl.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(window.countdownInterval);
                timesEl.innerHTML = "Still here?";
            }
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem("dateOfDeath") && !window.location.pathname.endsWith("setup.html"))  {
        window.location.replace('setup.html');
        return;
    }
    var submitBtn = document.getElementById("submitbtn");
    if (submitBtn) submitBtn.addEventListener("click", submitDate);
    const savedDate = localStorage.getItem("dateOfDeath");
    setUpCountdown(savedDate);
});