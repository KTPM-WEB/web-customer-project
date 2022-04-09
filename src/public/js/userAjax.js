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

function changePass() {
    console.log("button change pass clicked");

    const submit_btn = document.getElementById('submit-pass');
    const cancle_btn = document.getElementById('cancle-pass');
    submit_btn.disabled = true;

    if (checkSamePass() === true) {
        submit_btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i>&nbsp; Please wait...';
        document.getElementById("change-passwd-announce").style.visibility = "hidden";

        console.log("changing password...");
        console.log("new pas:", $("#new-passwd").val());
        const url = '/api/user/profile/change-pass';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_pass: $("#new-passwd").val(),
                old_pass: $("#old-passwd").val()
            })
        }).then(r => r.json()).then(data => {
            console.log("change password");
            console.log("data: ", data);

            if (data.stt == 'err400') {
                document.getElementById("change-passwd-announce").style.visibility = "visible";
                document.getElementById("change-passwd-announce").innerHTML = "Wrong password!";
                submit_btn.disabled = false;
                cancle_btn.disabled = false;
            } else {
                $("#change-password").modal("hide");
                clearForm();

                setTimeout(() => alert("Change password success!"), 0);
            }
        });


    } else {
        submit_btn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>&nbsp; Submit';

    }
}