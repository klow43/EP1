const modal = document.getElementById('userModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="id" class="form-control" name="id" readonly>'
        document.getElementById('id').value = obj.id;
        document.getElementById('firstName').value = obj.firstName;
        document.getElementById('lastName').value = obj.lastName;
        document.getElementById('userName').value = obj.userName;
        document.getElementById('phone').value = obj.phone;
        document.getElementById('address').value = obj.address;
})


async function deleteUser(id){
    await fetch('http://localhost:3000/admin/users', {
        method : 'DELETE',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify({ id : id })
    }).then((res) => {
        if( res.ok ) {
            location.reload();
            return Promise.resolve(res);
        } 
    }).catch((err) => { return Promise.reject( err )})
}