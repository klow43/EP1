const modal = document.getElementById('multiModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="id" class="form-control" name="id" readonly>'
        document.getElementById('id').value = obj.id;
        document.getElementById('name').value = obj.Brand;
    }
    else{     
        document.getElementById('id').value = "",
        document.getElementById('name').value = ""
        document.getElementById('modalPut').innerHTML = ''; 
    }   
})

async function deleteBrand(id){
    await fetch('http://localhost:3000/admin/brands', {
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