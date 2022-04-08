elements = document.querySelectorAll(".infomation-row i")
elements.forEach((i) => {
    i.addEventListener('click', () => {
        let information_row = i.parentElement
        information_row.setAttribute("style", "display: none")
        let value = information_row.childNodes[1].innerText
        let field = information_row.childNodes[1].id

        console.log(field)

        let edit_form = document.createElement("form")
        edit_form.setAttribute("method", "post")
        edit_form.setAttribute("action", "/user/profile/edit")

        let container_edit_form = document.createElement("div")
        container_edit_form.setAttribute("class", "container edit-form")

        let field_input = document.createElement("input")
        field_input.setAttribute("type", "hidden")
        field_input.setAttribute("class", "edit-input")
        field_input.setAttribute("name", "field")
        field_input.setAttribute("value", field)


        let edit_input = document.createElement("input")
        edit_input.setAttribute("class", "edit-input")
        edit_input.setAttribute("type", "text")
        edit_input.setAttribute("name", "value")
        edit_input.setAttribute("value", value)

        let submit_input = document.createElement("input")
        submit_input.setAttribute("class", "sub-btn")
        submit_input.setAttribute("type", "submit")
        submit_input.setAttribute("value", "Apply")

        let parent_of_information_row = information_row.parentElement;

        container_edit_form.appendChild(field_input)
        container_edit_form.appendChild(edit_input)
        container_edit_form.appendChild(submit_input)
        edit_form.appendChild(container_edit_form)
        parent_of_information_row.appendChild(edit_form)
    });
});

/*
<form method="post">
    <div class="container edit-form">
        <input class="edit-input" type="text"; name="firstname">
        <input type="submit" value="Apply" class="sub-btn">
    </div>
</form>*/
