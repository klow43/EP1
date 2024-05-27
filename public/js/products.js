const modal = document.getElementById('productsModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="id" class="form-control" name="id" readonly>'
        document.getElementById('id').value = obj.id;
        document.getElementById('name').value = obj.name;
        document.getElementById('description').value = obj.description;
        document.getElementById('price').value = obj.price;
        document.getElementById('quantity').value = obj.quantity;
        document.getElementById('imgurl').value = obj.imgurl;
        if(obj.deletedAt == 1){
            document.getElementById('deletedAt').setAttribute('checked', null);
        }
        
    }
    else{     
        document.getElementById('name').value = "";
        document.getElementById('description').value = "";
        document.getElementById('price').value = "";
        document.getElementById('quantity').value = "";
        document.getElementById('imgurl').value = "";
        document.getElementById('deletedAt').removeAttribute('checked')
        document.getElementById('modalPut').innerHTML = ''; 
    }   
})




async function deleteProduct(id){
    await fetch('http://localhost:3000/admin/products', {
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
