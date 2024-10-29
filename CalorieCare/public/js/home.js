// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
// Private methods and properties
// =============================
let cart = [];

// Constructor
function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
}

// Save cart
function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
}

if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
}

// =============================
// Public methods and properties
// =============================
var obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }

  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  // Remove item from cart
  obj.removeItemFromCart = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count --;
        if(cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
  }
  saveCart();
}

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

 // List cart
 obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

// *****************************************
// Triggers / Events
// *****************************************

// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-green' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-green input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }



  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

// -1
$('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

// เรียก displayCart() ครั้งแรกเมื่อโหลดหน้า
displayCart();

async function saveMenu() {
    const menuItems = shoppingCart.listCart(); // ดึงรายการอาหารจาก shoppingCart
    console.log("Menu Items to send:", menuItems); // แสดงรายการอาหารที่จะส่ง

    const response = await fetch('/user/addmenu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menuItems }), // ส่งข้อมูลในรูปแบบ JSON
    });

    if (response.ok) {
        shoppingCart.clearCart();
        displayCart(); // อัปเดตการแสดงผลหลังจากเคลียร์ตะกร้า
    } else {
        const errorData = await response.json(); // แสดงข้อมูลข้อผิดพลาดจากเซิร์ฟเวอร์
        console.error("Error response:", errorData);
        alert("เกิดข้อผิดพลาดในการบันทึกอาหาร: " + errorData.message);
    }
}





// เชื่อมโยงฟังก์ชันเคลียร์ตะกร้ากับปุ่มใน HTML
document.querySelector('.clear-cart').addEventListener('click', function() {
    clearCart(); // เรียกใช้ clearCart เมื่อปุ่มถูกคลิก
});

// ฟังก์ชันสำหรับเคลียร์ตะกร้า
function clearCart() {
    shoppingCart.clearCart(); // เคลียร์รายการอาหารใน shoppingCart
    displayCart(); // อัปเดตการแสดงผลหลังจากเคลียร์ตะกร้า
}
