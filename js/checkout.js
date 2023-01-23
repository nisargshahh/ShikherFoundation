// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdTLLg3U72vWU3V6PnaYW8WN9y2rw70Ns",
  authDomain: "shikher-foundations.firebaseapp.com",
  databaseURL: "https://shikher-foundations-default-rtdb.firebaseio.com",
  projectId: "shikher-foundations",
  storageBucket: "shikher-foundations.appspot.com",
  messagingSenderId: "48520475587",
  appId: "1:48520475587:web:5941f4e0dc88e000378376",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
var fullname = document.getElementById("fullname");
var phoneno = document.getElementById("phno");
var address = document.getElementById("addr");
var street = document.getElementById("street");
var city = document.getElementById("city");
var sndbtn = document.getElementById("senddata");

var shopcart = [];
var sndcart = [];
$(document).ready(function() {
  outputCart();
  for (var i = 0; i < shopcart.length ; i++) {
    shopcart[i].price = (shopcart[i].price / 100).toFixed(2);
  }
  snddata(shopcart);
  $("#output").on("change keyup", ".dynqua", function() {
    var iteminfo = $(this.dataset)[0];
    var itemincart = false;
    var qty = $(this).val();
    if (qty < 0) {
      qty = 0;
      $(this).val(0);
    }
    $.each(shopcart, function(index, value) {
      if (value.id == iteminfo.id) {
        shopcart[index].qty = qty;
        itemincart = true;
      }
    });
    sessionStorage["sca"] = JSON.stringify(shopcart);

    outputCart();
  });

  function outputCart() {
    if (sessionStorage["sca"] != null) {
      shopcart = JSON.parse(sessionStorage["sca"].toString());
    }
    var holderHTML = "";
    var total = 0;
    var itemCnt = 0;
    $.each(shopcart, function(index, value) {
      var stotal = value.qty * value.price;
      var a = index + 1;
      total += stotal;
      itemCnt += parseInt(value.qty);
      holderHTML +=
        '<tr><td><input size="5"  type="number" class="dynqua" name="quantity_' +
        a +
        '" value="' +
        value.qty +
        '" data-id="' +
        value.id +
        '"></td><td><input type="hidden" name="item_name_' +
        a +
        '" value="' +
        value.name +
        " " +
        value.s +
        '">' +
        value.name +
        "(" +
        value.s +
        ')</td><td><input type="hidden" name="amount_' +
        a +
        '" value="' +
        formatMoney(value.price) +
        '"> ₹' +
        formatMoney(value.price) +
        ' </td><td class="text-xs-right"> ' +
        formatMoney(stotal) +
        "</td></tr>";
    });
    holderHTML +=
      '<tr><td colspan="3" class="text-xs-right">Total</td><td class="text-xs-right">₹' +
      formatMoney(total) +
      "</td></tr>";
    $("#output").html(holderHTML);
  }

  function formatMoney(n) {
    return (n / 100).toFixed(2);
  }
});

function snddata(shopcart) {
  window.sndcart = shopcart;
  console.log(sndcart);
}
function senddata() {
  set(ref(db, "Orders/" + fullname.value), {
    cart: window.sndcart,
    Name: fullname.value,
    phone_number: phoneno.value,
    Address: address.value,
    Street: street.value,
    City: city.value,
  })
    .then(() => {
      alert("data added succesfully");
      window.location.href = "orderplaced.html";
    })
    .catch((error) => {
      alert("unsuccesful , error" + error);
    });
}

sndbtn.addEventListener("click", senddata);
