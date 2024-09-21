
// Active and close sidebar
let openBtn = document.getElementById('open'); // تأكد من وجود هذا الزر في HTML
let closeBtn = document.getElementById('close');
let sideBar = document.getElementById('side-bar');
let overLay = document.getElementById('overLay');

openBtn.addEventListener('click', () => {
    sideBar.classList.add('active');
    overLay.style.display = 'block';
    document.body.style.position = 'fixed';
});

closeBtn.addEventListener('click', () => {
    sideBar.classList.remove('active');
    overLay.style.display = 'none';
    document.body.style.position = 'relative';
});

// Create
let saveFood = JSON.parse(localStorage.getItem('product')) || [];
let elements = document.getElementById('elements');

// Update buttons
const updateButtons = () => {
    let buttons = document.querySelectorAll('.big-card button'); // تأكد من تحديد الأزرار بشكل صحيح
    buttons.forEach((button, i) => {
        button.onclick = function() {
            let elementPrice = parseFloat(button.previousElementSibling.innerHTML.replace('$', ''));
            let elementName = button.parentElement.parentElement.querySelector('h1').innerHTML;

            // تحقق مما إذا كان المنتج موجودًا بالفعل في السلة
            const existingProduct = saveFood.find(item => item.name === elementName);
            if (existingProduct) {
                // إذا كان موجودًا، قم بزيادة الكمية
                existingProduct.count += 1;
            } else {
                // إذا لم يكن موجودًا، أضفه إلى السلة
                let product = {
                    name: elementName,
                    count: 1,
                    price: elementPrice,
                };
                saveFood.push(product);
            }

            localStorage.setItem('product', JSON.stringify(saveFood));
            read();
        };
    });
};

// Read function
function read() {
    elements.innerHTML = '';
    let total = 0;

    saveFood.forEach((food, i) => {
        total += food.price * food.count;
        elements.innerHTML += `
            <div class="element">
                <h1><span>(${food.count}x)</span> ${food.name}</h1>
                <div class="price">
                    <p>$${food.price}</p>
                    <button onclick="deleteItem(${i})">X</button>
                </div>
            </div>
        `;
    });

    // Update total
    document.querySelector('.total span').innerText = `$${total.toFixed(2)}`;
}

// Delete item function
function deleteItem(index) {
    saveFood.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(saveFood));
    read();
}

// Checkout function
function checkout() {
    if (saveFood.length === 0) {
        alert('لا يوجد منتجات للشراء!');
        return;
    }

    let total = saveFood.reduce((sum, item) => sum + (item.price * item.count), 0);
    
    if (confirm(`المبلغ الإجمالي: $${total.toFixed(2)}\nهل تريد إتمام عملية الشراء؟`)) {
        alert('تم الشراء بنجاح!');
        saveFood = [];
        localStorage.removeItem('product');
        read(); // لتحديث العرض بعد الشراء
    }
}

// Call updateButtons عند تحميل الصفحة
window.onload = updateButtons;
