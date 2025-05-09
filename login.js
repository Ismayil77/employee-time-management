        $(document).ready(function() {
            // Form switching
            $('#show-signup').click(function(e) {
                e.preventDefault();
                $('#login-form').removeClass('visible').addClass('hidden');
                $('#signup-form').removeClass('hidden').addClass('visible');
            });
            
            $('#show-login').click(function(e) {
                e.preventDefault();
                $('#signup-form').removeClass('visible').addClass('hidden');
                $('#login-form').removeClass('hidden').addClass('visible');
            });
            
            // Form validation and submission
            $('#loginForm').submit(function(e) {
                e.preventDefault();
                const email = $('#login-email').val();
                const password = $('#login-password').val();
                
                // Here you would typically validate and send to server
                console.log('Login attempt:', { email, password });
                    // Hardcoded validation check
    const hardcodedEmail = 'testmail@123';
    const hardcodedPassword = '1234';
    
    if (email === hardcodedEmail && password === hardcodedPassword) {
        alert('Account created successfully! Redirecting to homepage...');
        // Redirect to index.html
		                alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'home.html';
    } else {
        alert('Signup failed: Invalid email or password');
    }

            });


const signupUrl = 'https://script.google.com/macros/s/AKfycbwfzr7qNDdM6moGaVS9CJqhmuOGUGRMwdExPdLYg452jWqzz44gEH0-KQClVTDXQUVeIw/exec';

  $('#signupForm').submit(function(e) {
    e.preventDefault();
    
    // Disable submit button to prevent multiple submissions
    $('#submit-button').prop('disabled', true).text('Processing...');
    
    // Get form values
    const formData = {
        firstName: $('#signup-fname').val().trim(),
        lastName: $('#signup-lname').val().trim(),
        email: $('#signup-email').val().trim(),
        password: $('#signup-password').val(),
        confirmPassword: $('#signup-confirm-password').val()
    };
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        $('#submit-button').prop('disabled', false).text('Sign Up');
        return;
    }
    
    if (!$('#terms').is(':checked')) {
        alert('You must agree to the terms and conditions');
        $('#submit-button').prop('disabled', false).text('Sign Up');
        return;
    }
    
    
    $('#submit-button').prop('disabled', false).text('Sign Up');
});


            
            // Password strength indicator (could be enhanced)
            $('#signup-password').on('input', function() {
                const password = $(this).val();
                // Add password strength logic here
            });
        });
