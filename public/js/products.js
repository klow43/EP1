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


// async function alterProduct(product){
//     const modal = document.getElementById('productsModal');

//     return modal.modal('show');
// }

//function to trigger modal,
//pass product info into values.(edit)

