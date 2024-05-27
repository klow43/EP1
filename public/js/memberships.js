const modal = document.getElementById('membershipModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="id" class="form-control" name="id" readonly>'
        document.getElementById('id').value = obj.id;
        document.getElementById('name').value = obj.Membership;
        document.getElementById('minItems').value = obj.minItems;
        document.getElementById('maxItems').value = obj.maxItems;
        document.getElementById('discount').value = obj.discount;
    }
    else{     
        document.getElementById('id').value = "";
        document.getElementById('name').value = "";
        document.getElementById('minItems').value = "";
        document.getElementById('maxItems').value = "";
        document.getElementById('discount').value = "";
        document.getElementById('modalPut').innerHTML = ''; 
    }   
})


async function deleteMembership(id){
    await fetch('http://localhost:3000/admin/memberships', {
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