window.onload = getProfile();

function getProfile() {
    const url = '/api/user/profile';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.json()).then(data => {
        console.log("data: ", data);

        $("#profile-avatar").attr("src", data.avatar_url);
        $("#profile-username").html(data.username);
        $("#fullname").html(data.fullname);
        $("#intro").html(data.intro);
        $("#employed").html(data.employed);
        $("#role").html(data.role);
        $("#email").html(data.email);
        $("#phone").html(data.phone);
        $("#address").html(data.address);
    });
}

