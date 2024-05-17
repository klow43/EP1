async function deleteCategory(id){
    await fetch('http://localhost:3000/admin/categories', {
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