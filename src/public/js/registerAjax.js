function checkUsername(e) {
    $('#username-error').html('');
    fetch('/api/auth/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.value
        })
    }).then(r => r.json()).then(r =>{
        if(r.check) $('#username-error').html('<span class="text-danger">Username already taken</span>');
    });
}

function checkGmail(e) {
    $('#gmail-error').html('');
    fetch('/api/auth/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.value
        })
    }).then(r => r.json()).then(r =>{
        if(r.check) $('#gmail-error').html('<span class="text-danger">Gmail already taken</span>');
    });
}

function signUp() {
    fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $('#username').val(),
            password: $('#passwd').val(),
            email: $('#gmail').val()
        })
    }).then(r => r.json()).then(function(data) {
        if(data.state)
            $('#mess-error').html(`<div class="alert alert-success" style="background:green;" role="alert"> ${data.message} </div>`)
        else
            $('#mess-error').html(`<div class="alert alert-danger" role="alert"> ${data.message} </div>`)
    })

}