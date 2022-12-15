import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const productMenu = document.getElementById('product-menu')
const yourOrder = document.getElementById('your-order')
const totalPrice = document.getElementById('total-price')
const orderList = document.getElementById('order-list')
const completeOrderBtn = document.getElementById('complete-order-btn')
const modal = document.getElementById('modal')
const payBtn = document.getElementById('pay-btn')
const paymentForm = document.getElementById('payment-form')
const paymentSuccess = document.getElementById('payment-success')
const orderArray = []


document.addEventListener('click', function(e){
    if(e.target.dataset.product) {
        getOrderClick(e.target.dataset.product)
    } else if (e.target.dataset.remove){
        removeOrderClick(e.target.dataset.remove)
    } else if (e.target.id === 'complete-order-btn'){
        popUpModal()
    }
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullname')
    console.log(fullName)
    modal.style.display = 'none'
    yourOrder.style.display = 'none'
    paymentSuccess.innerHTML = `
    <p>Thanks, ${fullName}! Your order is on its way!</p>
    `
    paymentSuccess.style.display = 'flex'
})

function popUpModal() {
    modal.style.display = 'flex'
}

function removeOrderClick(orderId) {
    const removeOrderObj = orderArray.findIndex(function(order){
        return orderId === order.uuid
    })
    console.log(orderArray)
    if (removeOrderObj > -1) {
        orderArray.splice(removeOrderObj, 1)
    }
    render()
}

function getOrderClick(orderId) {
    yourOrder.style.display = 'flex'
    const targetOrderObj = menuArray.filter(function(menu){
        return menu.uuid === orderId
    })[0]
    if (targetOrderObj) {
        orderArray.push(targetOrderObj)
    }
    render()
    SumtotalPrice()
}

function SumtotalPrice() {
    let total = 0
    orderArray.forEach(function(order){
        total += order.price
    }) 
    return total
}


function render() {
    menuArray.forEach(function(menu){
        menu.uuid = uuidv4()
    })
    
    let productMenuHtml = ``
    menuArray.forEach(function(menu) {
        productMenuHtml += `
        <section class="menu">
            <div class="menu-container">
                <img src="${menu.productImage}" alt="pizza slice" width="70" height="90">
                <div class="product">
                    <div class="product-info">
                        <p class="bold product-name">${menu.name}</p>
                        <p>${menu.ingredients}</p>
                        <p class="bold amount">$${menu.price}</p>
                    </div>
                    <div class="add-product-btn">
                        <button data-product="${menu.uuid}" id="product-button" class="product-button">+</button>
                    </div>
                </div>
            </div>
            <hr>
        </section>
        `
    })
    productMenu.innerHTML = productMenuHtml



    let getOrder = ``
    orderArray.forEach(function(menu){
            getOrder += `
            <div>
                <p class="bold product-name">
                ${menu.name}<span class="remove" data-remove="${menu.uuid}">remove</span> <span class="bold amount right">$${menu.price}</span>
                </p>
            </div>
            `
    })
    orderList.innerHTML = getOrder

    totalPrice.innerHTML = `$${SumtotalPrice()}`
}
render ()
