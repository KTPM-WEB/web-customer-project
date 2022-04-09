function checkUsername(e) {
    $('#username-check').html('');
    fetch('/api/auth/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.value
        })
    }).then(r => r.json()).then(r =>{
        if(r.check) {
            $('#username-check').html('<i class="fas fa-check"></i>');
        } else {
            $('#username-check').html('<i class="fas fa-times"></i>');
        }
    });
}