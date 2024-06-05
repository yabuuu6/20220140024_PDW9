document.addEventListener('DOMContentLoaded', function() {
    // Validasi login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const storedUser = localStorage.getItem(email);

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.password === password) {
                    window.location.href = 'home.html';
                } else {
                    alert('Invalid email or password.');
                }
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    // Validasi registrasi
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('emailFeedback');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = emailInput.value;
            const storedUser = localStorage.getItem(email);
            if (storedUser) {
                emailFeedback.style.display = 'block';
            } else {
                emailFeedback.style.display = 'none';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const storedUser = localStorage.getItem(email);
            if (storedUser) {
                alert('Email is already registered.');
                return;
            }

            const userData = { username: username, email: email, password: password };
            localStorage.setItem(email, JSON.stringify(userData));
            window.location.href = 'index.html';
        });
    }
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

