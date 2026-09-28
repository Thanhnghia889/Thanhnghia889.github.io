$(document).ready(function() {
    

    if ($("#price-slider").length) {
        $("#price-slider").slider({
            range: true,
            min: 0,
            max: 10000000,
            step: 100000,
            values: [0, 1000000],
            slide: function(event, ui) {
                $("#price-min").text(ui.values[0].toLocaleString("vi-VN") + "\u20ab");
                $("#price-max").text(ui.values[1].toLocaleString("vi-VN") + "\u20ab");
            }
        });
        $("#price-min").text($("#price-slider").slider("values", 0).toLocaleString("vi-VN") + "\u20ab");
        $("#price-max").text($("#price-slider").slider("values", 1).toLocaleString("vi-VN") + "\u20ab");
    }
    $("#product-new").owlCarousel({
        loop: true,
        margin: 12,
        responsiveClass: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            420: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $("#review").owlCarousel({
        loop: true,
        margin: 16,
        responsiveClass: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    $("#review1").owlCarousel({
        loop: true,
        margin: 16,
        responsiveClass: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    $("#brand-logo").owlCarousel({
        loop: true,
        margin: 12,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            420: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('#btn-plus').click(function(){
        var qty = parseInt($('#qty-value').val(), 10) || 1;
        $('#qty-value').val(qty + 1);
    });

    $('#btn-minus').click(function(){
        var qty = parseInt($('#qty-value').val(), 10) || 1;
        if(qty > 1){
            qty = qty - 1;
        }
        $('#qty-value').val(qty);
    });
    $('#createacc').on('change', function(){
        $('#accform').toggle('fade');
    });
    $('#bank').on('change', function(){
        $('#bank-content').toggle('fade');
        $('#cod-content').toggle('fade');
    });
    $('#cod').on('change', function(){
        $('#bank-content').toggle('fade');
        $('#cod-content').toggle('fade');
    });
    $('#btn-order-success').on('click', function(e){
        e.preventDefault();
        alert('Bạn đã đặt hàng thành công');
    });
    
});
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        var target = document.getElementById(this.dataset.tab);
        if (!target) return;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        target.classList.add('active');
    });
});   
$('#btn-filter').click(function(){
    $('#sidebar').toggle('slide')
})
$('.sidebar-close').click(function(){
    $('#sidebar').toggle('slide')
})
$(window).resize(function(){
    if($(window).width() >= 992){
        $('#sidebar').css('display', 'block');
    }
    else{
        $('#sidebar').css('display', 'none');
    }
})
document.querySelectorAll('.cart-item').forEach(item => {
    const input = item.querySelector('.qty-control input');
    const btnMinus = item.querySelectorAll('.qty-btn')[0];
    const btnPlus = item.querySelectorAll('.qty-btn')[1];
    const priceText = item.querySelector('.cart-price').innerText;
    const price = parseInt(priceText.replace(/\./g, '').replace('đ', ''));

    function updateSubtotal() {
        const qty = parseInt(input.value);
        const subtotal = qty * price;
        item.querySelector('.cart-subtotal').innerText = subtotal.toLocaleString('vi-VN') + 'đ';
        updateTotal();
    }

    btnMinus.addEventListener('click', () => {
        if (parseInt(input.value) > 1) {
            input.value--;
            updateSubtotal();
        }
    });

    btnPlus.addEventListener('click', () => {
        input.value++;
        updateSubtotal();
    });

    input.addEventListener('change', () => {
        if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
            input.value = 1;
        }
        updateSubtotal();
    });
});

document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('.cart-item').remove();
        updateTotal();
    });
});

document.getElementById('check-all').addEventListener('change', function () {
    document.querySelectorAll('.cart-item input[type="checkbox"]').forEach(cb => {
        cb.checked = this.checked;
    });
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const subtotalText = item.querySelector('.cart-subtotal').innerText;
        total += parseInt(subtotalText.replace(/\./g, '').replace('đ', ''));
    });

    const discount = currentDiscount || 0;
    const finalTotal = total - discount;

    document.querySelector('.discount-row span:last-child').innerText = '−' + discount.toLocaleString('vi-VN') + 'đ';
    document.querySelectorAll('.cart-summary-row span:last-child')[0].innerText = total.toLocaleString('vi-VN') + 'đ';
    document.querySelector('.cart-total span:last-child').innerText = finalTotal.toLocaleString('vi-VN') + 'đ';
}

const vouchers = {
    'SALE10': 500000,
    'FREESHIP': 30000,
    'GIAM20': 1000000,
    'SHOEVIBE': (total) => {
        if (total >= 5000000) {
            return Math.min(total * 0.2, 1000000);
        } else if (total >= 1000000) {
            return Math.min(total * 0.15, 500000);
        } else {
            return Math.min(total * 0.1, 200000);
        }
    }
};

let currentDiscount = 0;

document.querySelector('.voucher-input button').addEventListener('click', () => {
    const code = document.querySelector('.voucher-input input').value.trim().toUpperCase();
    
    let total = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const subtotalText = item.querySelector('.cart-subtotal').innerText;
        total += parseInt(subtotalText.replace(/\./g, '').replace('đ', ''));
    });

    if (vouchers[code] !== undefined) {
        const val = vouchers[code];
        currentDiscount = Math.round(typeof val === 'function' ? val(total) : val);
        alert('Áp dụng mã thành công! Giảm ' + currentDiscount.toLocaleString('vi-VN') + 'đ');
    } else {
        currentDiscount = 0;
        alert('Mã giảm giá không hợp lệ!');
    }
    updateTotal();
});

let checkoutAlert = null;

document.querySelector('.btn-checkout').addEventListener('click', () => {
    const checked = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
    if (checked.length === 0) {
        alert('Vui lòng chọn ít nhất 1 sản phẩm!');
        return;
    }
    window.location.href = 'checkout.html';
});
