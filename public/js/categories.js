const modal = document.getElementById('multiModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="id" class="form-control" name="id" readonly>'
        document.getElementById('id').value = obj.id;
        document.getElementById('name').value = obj.Category;
    }
    else{     
        document.getElementById('id').value = "",
        document.getElementById('name').value = ""
        document.getElementById('modalPut').innerHTML = ''; 
    }   
})

//indicator that this is put not post

async function deleteCategory(id){
    await fetch('http://localhost:3000/admin/categories', {
        method : 'DELETE',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify({ id : id })
    }).then((res) => {
        if( res.ok ) {
            return Promise.resolve(res);
        }
    }).catch((err) => { return Promise.reject( err )})
}