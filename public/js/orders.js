const modal = document.getElementById('ordersModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="orderid" class="form-control" name="orderid" readonly>'
        document.getElementById('orderid').value = obj.orderId;
    }
    else{     
        document.getElementById('id').value = "",
        document.getElementById('modalPut').innerHTML = ''; 
    }   
}) 

async function deleteOrder(order){
    await fetch('http://localhost:3000/admin/orders', {
        method : 'DELETE',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify({ orderid :  order.orderId })
    }).then((res) => {
        if( res.ok ) {
            location.reload();
            return Promise.resolve(res);
        }
    }).catch((err) => { return Promise.reject( err )})
} 