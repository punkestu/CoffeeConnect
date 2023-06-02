const kasir_items = $("#kasir-items");
const kasir_data = [];
var pTotal = 0;

function formatCurr(num){
    return new Intl.NumberFormat("id-ID", {currency: 'IDR', style: "currency"}).format(num);
}

function updatetotal(id, harga) {
    $(`#total_${id}`).text(formatCurr($(`#qty_${id}`).val()*harga));
    const total = kasir_data.reduce((t, k)=>{
        return t+(k.qty*k.harga);
    }, 0);
    pTotal = total;
    $("#total").text(formatCurr(total));
    $("#payment-total").text(formatCurr(total));
}

function updatechange(){
    const paid = $("#payment-paid").val();
    $("#payment-change").text(formatCurr(paid-pTotal));
}

function updateqty(id){
    const datakasir = kasir_data.find((k) => {
        return k.id = id;
    });
    datakasir.qty = parseInt($(`#qty_${id}`).val());
    $(`#qty_${datakasir.id}`).val(datakasir.qty);
    updatetotal(datakasir.id, datakasir.harga);
}

function deleteproduk(id){
    kasir_data.splice(kasir_data.findIndex(k=>k.id===id),1);
    $(`#row_${id}`).remove();
}

function tambahproduk(id) {
    const produk = produk_list.find((p) => {
        return p.id === id;
    });
    if (produk) {
        const datakasir = kasir_data.find((k) => {
            return k.id = id;
        });
        if (datakasir) {
            datakasir.qty++;
            $(`#qty_${datakasir.id}`).val(datakasir.qty);
            updatetotal(datakasir.id, datakasir.harga);
        } else {
            kasir_data.push({...produk, qty:1});
            kasir_items.append(`
                <tr id="row_${produk.id}">
                    <td>${produk.name} <input type="hidden" value="${produk.id}" name="dTransaksi[][produkId]"></td>
                    <td><input type="number" class="w-full" name="dTransaksi[][qty]" id="qty_${produk.id}" min="1" value="1" onchange="updateqty(${produk.id})"></td>
                    <td>${formatCurr(produk.harga)}</td>
                    <td id="total_${produk.id}"></td>
                    <td><button type="button" onclick="deleteproduk(${produk.id})">delete</button></td>
                </tr>`);
            updatetotal(produk.id, produk.harga);
        }
    }
}