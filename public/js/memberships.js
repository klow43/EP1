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