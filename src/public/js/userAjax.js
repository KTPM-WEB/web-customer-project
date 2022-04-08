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
        $("#firstName").html(data.firstName);
        $("#lastName").html(data.lastName);
        $("#email").html(data.email);
        $("#phone").html(data.phone);
        $("#address").html(data.address);
    });
}

