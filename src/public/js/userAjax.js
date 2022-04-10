window.onload = getProfile();

function getProfile() {
    const url = '/api/user/profile';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.json()).then(data => {
        $("#profile-avatar").attr("src", data.avatar_url);
        $("#profile-username").html(data.username);
        $("#username").val(data.username);
        $("#fullname").html(data.fullname);
        $("#intro").html(data.intro);
        $("#employed").html(data.employed);
        $("#role").html(data.role);
        $("#email").html(data.email);
        $("#phone").html(data.phone);
        $("#address").html(data.address);
    });
}
function changePasswordForm() {
    const url = '/api/auth/change-password';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $("#username").val(),
        })
    }).then(r => r.json()).then(data => {});
}

