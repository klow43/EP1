const modal = document.getElementById('ordersModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget
    const info = button.getAttribute('data-bs-whatever')
    if(info != null){
        obj = JSON.parse(info)
        document.getElementById('modalPut').innerHTML = '<input id="orderid" class="form-control" name="orderid" readonly>'
        document.getElementById('orderid').value = obj.OrderId;
    }
    else{     
        document.getElementById('id').value = "",
        document.getElementById('modalPut').innerHTML = ''; 
    }   
})