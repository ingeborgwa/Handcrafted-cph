
let carts = document.querySelectorAll ('.add-cart');
// console.log (carts);


//----------PRODUKUTLISTE-----------//

// let productsList = document.querySelector('#productsList');


let products = [
    {
        name: "Sophie Sapphire Necklace",
        tag: "Sophie Sapphire Necklace",
        picture: './img/gold-diamond-necklace.jpg',
        desripction: "A beautiful, simple necklace in 9k solid gold set with a floating sapphire.",
        price: 2500,
        inCart: 0
    },
    {
        name: "Nina Sapphire Ear Studs",
        tag: "earstuds",
        picture: './img/gold-earstuds.jpg',
        desripction: "Nina Ear Studs in 9k solid gold with white sapphires set in a cluster.",
        price: 2500,
        inCart: 0
    },
    {
        name: "Anclar Bracelet",
        tag: "bracelet",
        picture: './img/gold-bracelet3.jpg',
        desripction: "A beautiful bracelet in 9k solid gold. ",
        price: 950,
        inCart: 0
    },
    {
        name: "Classic Sapphire Ear Studs",
        tag: "classicearstuds",
        picture: './img/gold-diamond-necklace.jpg',
        desripction: "Super minimalistic ear studs in solid 9k gold. ",
        price: 1250,
        inCart: 0
    },
];


//-------TEST

// let html = "";

// products.forEach ((product) => {
//     html+= `
//     <div class="image">
//         <img class="img-size" src="${product.picture}" alt="">
//         <h3>${product.name}</h3>
//         <p>${product.desripction}</p>
//         <h3>${product.price} NOK</h3>
//         <a class="add-cart cart1" href="#">Add to cart</a>
//         <input type="hidden" value="${product.price}">
//     </div>
//     `;
// });

// productsList.innerHTML = html;

// function addItem(event){
//     let chosen = products.find(item => event.target.id === products.tag);

//     cart.push(chosen);

//     cart.addEventListener("click", addItem);
// }



//-------TEST





//----------LEGG I HANDLEKURV-----------//

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });

}


function onLoadCartNumbers (){
    let productNumbers = localStorage.getItem ('cartNumbers');

    if (productNumbers){
        document.querySelector ('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product) {
    //console.log(product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector ('.cart span').textContent = productNumbers  + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector ('.cart span').textContent = 1;
    }

    setItems(product);
}


function setItems(product){
    let cartItems = localStorage.getItem ('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
          }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


//----------TOTAL SUM-----------//

function totalCost (product){
    let cartCost = localStorage.getItem('totalCost');

    // console.log ("my cartCost is", cartCost);
    // console.log (typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
}


//----------I HANDLEKURVEN-----------//


function displayCart (){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productsContainer){
        productsContainer.innerHTML = '';

        Object.values (cartItems).map(item => {
            productsContainer.innerHTML += `
            <div>${item.name}</div>
            <div class="price">NOK ${item.price}</div>
            <div class="quantity">${item.inCart}</div>
            <button class="rmvBtn" ${item.tag}>Fjern</button>
            <div class="total"> NOK ${item.inCart * item.price},00</div>
            `
        });

        productsContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                </h4>
                <h4 class="basketTotal">
                    NOK ${cartCost},00
                </h4>
            </div>
        `
    }

}

onLoadCartNumbers();
displayCart();


//----------FJERN FRA HANDLEKURV-----------//


function removeFromCart (event){
    let foundProduct = displayCart.find (product => product.tag === event.target.tag);
    if (foundProduct) {
        let productIndex = displayCart.indexOf (foundProduct);
        displayCart.splice(productIndex, i);
        localStorage.setItem("productsInCart", JSON.stringify (displayCart));
    }

    updateBasket();
};

function updateBasket(){
    productsContainer.innerHTML = "";
    JSON.parse(localStorage.getItem ("productsInCart")).forEach (item => 
        productsContainer.innerHTML+= `
        <div>${item.name}</div>
        <div class="price">NOK ${item.price}</div>
        <div class="quantity">${item.inCart}</div>
        <button class="rmvBtn" ${item.tag}>Fjern</button>
        <div class="total"> NOK ${item.inCart * item.price},00</div>
        `
    );
}

document.querySelector(".rmvBtn").addEventListener ("click", removeFromCart);


















