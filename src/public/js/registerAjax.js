function checkUsername(e) {
    fetch('/api/auth/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.value
        })
    }).then(r => r.json()).then(r => {
        if (r.check) $('#error').html('<span class="text-danger">Username already taken</span>');
        else $('#error').html('');
    });
}

function checkGmail(e) {
    $('#error').html('');
    fetch('/api/auth/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.value
        })
    }).then(r => r.json()).then(r => {
        if (r.check) $('#error').html('<span class="text-danger">Gmail already taken</span>');
        else $('#error').html('');
    });
}

function signUp() {
    if ($('#username').val() === '' || $('#passwd').val() === '' || $('#gmail').val() === '') {
        $('#error').html('<p class="text-danger">Please fill all fields</p>');
        return;
    }
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $('#username').val(),
            password: $('#passwd').val(),
            email: $('#gmail').val()
        })
    }).then(r => r.json()).then(function (data) {
        if (data.state)
            $('#error').html(`<p style="color:green;" > ${data.message} </p>`)
        else {
            $('#error').html(`<p  style="color:red;"> ${data.message} </p>`)
        }
    })
}