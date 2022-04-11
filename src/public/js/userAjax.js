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

function showForm(field)
{
    const form = $(`.${field} .edit-form`)
    const current_info= $(`.${field} .current-info`)
    
    if(form.css("display")=="none")
    {
        form.css("display","block")
        current_info.attr("style","display: none")
    }
    else
    {
        form.css("display","none")
        current_info.attr("style","display: flex; flex-direction: row")
    }
    
}

function edit(field) {
    event.preventDefault()
    showForm(field)
    const url = '/api/user/profile/edit';
    const new_val = $(`.${field} form input[type=text]`).val()

    $.post( url,{field: field, new_val: new_val }, function(data) {
            const need_change_element= $(`#${field}`)
            need_change_element.text(new_val)
        
      }).fail(function (data){
            if(data.status == 401)
                window.location.href = '/auth/login?return=' + window.location.href
      })
}