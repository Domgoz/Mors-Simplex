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
    let countDownDate = new Date(dateString).getTime();

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    function updateCountdown(countDownDate) {
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
                document.getElementById('insert').innerHTML = '<input type="button" class="btn" value="Reestimate" id="Reset">';

                const resetBtn = document.getElementById('Reset');
                if (resetBtn) {
                    resetBtn.addEventListener("click", function() {
                        localStorage.removeItem("dateOfDeath"); 
                        window.location.replace('setup.html');
                    });
                }
            }
        }
    }

    updateCountdown(countDownDate);

    window.countdownInterval = setInterval(function() {
        updateCountdown(countDownDate);
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

    const gearBtn = document.getElementById('gear-btn');
    const gearMenu = document.getElementById('gear-menu');
    const menuReset = document.getElementById('menu-reset');

    gearBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        gearMenu.style.display = gearMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(e) {
        if (!gearMenu.contains(e.target) && e.target !== gearBtn) {
            gearMenu.style.display = 'none';
        }
    });

    menuReset.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem("dateOfDeath"); 
        window.location.replace('setup.html');
    });
});