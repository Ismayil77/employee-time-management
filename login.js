const CLIENT_ID = '937327760089-j626mgf4s5141ojdlaekuhalp9mf9bqd.apps.googleusercontent.com';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
let gapiAuthInstance;

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

    // Form validation and login handling
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Hardcoded validation check
        const hardcodedEmail = 'testmail@123';
        const hardcodedPassword = '1234';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'home.html';
        } else {
            alert('Login failed: Invalid email or password');
        }
    });

    // OAuth client initialization
    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(() => {
            gapiAuthInstance = gapi.auth2.getAuthInstance();
            gapiAuthInstance.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapiAuthInstance.isSignedIn.get());
        });
    }

    // Handle sign-in and load the API client
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            console.log("User signed in!");
        } else {
            gapiAuthInstance.signIn();
        }
    }

    // Sign-in button click handler
    $('#sign-in-button').click(function() {
        gapiAuthInstance.signIn();
    });

    // Form submission and saving data to Google Drive
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

        // Save form data to Google Drive
        saveDataToDrive(formData);

        $('#submit-button').prop('disabled', false).text('Sign Up');
    });

    // Save data to Google Drive
    function saveDataToDrive(formData) {
        // Ensure user is authenticated
        if (!gapiAuthInstance.isSignedIn.get()) {
            alert("You must be signed in to save data.");
            return;
        }

        // Check if file exists on Google Drive
        gapi.client.drive.files.list({
            q: "name = 'data.json'",
            fields: "files(id, name)"
        }).then((response) => {
            let files = response.result.files;
            if (files.length === 0) {
                // File doesn't exist, create a new one
                createFile(formData);
            } else {
                // File exists, append new data
                appendToFile(files[0].id, formData);
            }
        });
    }

    // Create a new file on Google Drive
    function createFile(formData) {
        const fileMetadata = {
            name: 'data.json',
            mimeType: 'application/json'
        };

        const media = {
            mimeType: 'application/json',
            body: JSON.stringify([formData])
        };

        gapi.client.drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }).then((response) => {
            console.log('File created with ID:', response.result.id);
        });
    }

    // Append data to an existing file on Google Drive
    function appendToFile(fileId, formData) {
        gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }).then((file) => {
            let currentData = JSON.parse(file.body);
            currentData.push(formData);

            const media = {
                mimeType: 'application/json',
                body: JSON.stringify(currentData)
            };

            gapi.client.drive.files.update({
                fileId: fileId,
                media: media
            }).then((response) => {
                console.log('Data appended to file', response.result);
            });
        });
    }

    // Password strength indicator (could be enhanced)
    $('#signup-password').on('input', function() {
        const password = $(this).val();
        // Add password strength logic here
    });

    // Initialize Google API client on page load
    handleClientLoad();
});
