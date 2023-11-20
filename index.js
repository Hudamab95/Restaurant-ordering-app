import {menuArray} from '/data.js'
const total = document.getElementById('total')
const menu = document.getElementById("content")
const modal = document.getElementById('modal')
const modalForm = document.getElementById('modal-form')
const confirmation =  document.getElementById('confirmation')
let orderArr = []
let totalPrice = 0

document.addEventListener('click', function(e){
        if (e.target.dataset.add){
       addItems(e.target.dataset.add)
        total.classList.remove('hidden')
        }
        
       else if (e.target.dataset.remove){
      removeItems(e.target.dataset.remove)
        }
        else if (e.target.id === "order-btn"){
      openOrderModal()
        } 
        else if (e.target.id === "close-btn"){
      closeOrderModal()
        } 
})


modalForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const modalFormData = new FormData(modalForm)
    const usernameInput = modalFormData.get('username')
    
    confirmation.innerHTML = `
    <div class="order-thanks">
      <h2>Thanks, ${usernameInput}! Your order is on its way!</h2>
    </div>
  `
    closeOrderModal()
  
}) 

function openOrderModal(){
    modal.classList.remove('hidden')
    document.getElementById('overlay').style.display = 'block'
}

function closeOrderModal(){
    modal.classList.add('hidden')
    document.getElementById('overlay').style.display = 'none'
    clearTotal()
}

function clearTotal(){
    total.innerHTML = ""
    totalPrice = 0
}


// add & remove btn

function addItems (itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    
    if (!orderArr.includes(targetItemObj)) {
        orderArr.push(targetItemObj)
        totalPrice += targetItemObj.price
    }
    renderTotal()
    renderOrder()
}



function removeItems (itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    
    if (orderArr.includes(targetItemObj)) {
        orderArr.pop(targetItemObj)
        totalPrice -= targetItemObj.price

        if (orderArr.length == 0){
             clearTotal()
        }
    }
    renderTotal()
    renderOrder()
}


// get the html content

function getMenuHtml(){
    let menuHtml = ''
     menuArray.forEach(function(item){
        const {
            emoji,
            name,
            ingredients,
            price,
            id
        } = item
        
       menuHtml += `
        <div class="section">
       <img src="${emoji}" class="items-img">
            <div class="items-details">
            <p class="items-name">${name}</p>
            <p class="items-ingredients">${ingredients}</p>
            <p class="items-price">$${price}</p>
            </div>
            <button id="items-btn" data-add="${id}">+</button>
        </div>
        ` 
    })
    return menuHtml
}


function getTotalHtml() {
    let totalHtml =  `
        <div class="total-section">
                <p>Your Order</p>
                </div>
                <div class="total-details" id="details">
                    </div>
                    <div class="total-container">
                    <div class="total-price">
                        <p>Total price:</p>
                    </div>
                    <div class="total-price-value">
                        <p>$${totalPrice}</p>
                    </div>
                    </div>
                    <div class="btn-container">
                    <button class="complete-order-btn" id="order-btn">Complete Order</button>
                </div>  
        `
        return totalHtml
}


function getOrderHtml(){
     let orderHtml = ''
    orderArr.map(function(item){
    
    orderHtml +=
    `
     <div class="details-section">
        <div class="order-item">
           <p>${item.name}</p>
           <button class="remove-item-btn" data-remove="${item.id}">Remove</button>
            <p class="order-price">$${item.price}</p>
             </div>
            </div>
    `
    
    })
    return orderHtml
    }
   

// render the html content

function renderOrder(){
    document.getElementById("details").innerHTML = getOrderHtml()
}

function renderTotal() {
    total.innerHTML = getTotalHtml()
}

function renderMenu(){
    menu.innerHTML = getMenuHtml()
}

renderMenu()
