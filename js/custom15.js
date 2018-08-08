$(document).ready(function() {
    $('#contactForm').submit(function(e) {
        e.preventDefault();
$('#submit').prop('disabled', true);
        console.log('clicked submit'); // --> works

        var $errors = $('#errors'),
            $status = $('#status'),

            fname = $('#fname').val().replace(/<|>/g, ""), // prevent xss
            lname = $('#lname').val().replace(/<|>/g, ""),
            email = $('#email').val().replace(/<|>/g, ""),
            msg = $('#message').val().replace(/<|>/g, "");

        if (fname == '' || email == '' || msg == '') {
            valid = false;
            errors = "All fields are required.";
            swal(
                'Oops...',
                errors,
                'error'
            );
$('#submit').prop('disabled', false);
            return false;
        }

        // pretty sure the problem is here
        console.log('captcha response: ' + grecaptcha.getResponse()); // --> captcha response: 

        $.ajax({
            type: "POST",
            url: "/helpers/emailsender.php",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                email: email,
                fname: fname,
                lname: lname,
                msg: msg,
                captcha: grecaptcha.getResponse()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {

                grecaptcha.reset();

                if (!data.status) {
                    swal(
                        'Oops...',
                        data.message,
                        'error'
                    );
$('#submit').prop('disabled', false);
                    return false;
                } else {
                    $('#fname').val('');
                    $('#lname').val('');
                    $('#email').val('');
                    $('#message').val('');
                    swal(
                        'Thanks for contacting me!',
                        'I will get in touch with you shortly.',
                        'success'
                    );
$('#submit').prop('disabled', false);
                }
            },
            failure: function(errMsg) {
                swal(
                    'Oops...',
                    errMsg.message,
                    'error'
                );
$('#submit').prop('disabled', false);
return false;
            }
        });


    });
});