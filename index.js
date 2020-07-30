const item = {name: '', price: ''};
var items = [];
var cartAmount = 0;

console.log(items);
console.log(item);
pageRender();

function pageRender(){
  $('.cartBtn').append(
    $('<button></button>').addClass('openCart').append(
      $('<i></i>').addClass('fa fa-shopping-cart fa-2x')
    )
  )
  for (i=0; i<Data.products.length; i++){
    $('.container').append(
      $('<div></div>').addClass('products').attr('id','product-'+i));
    $('#product-'+i).append(
        $('<img></img>').addClass('images').attr('src', Data.products[i].images[0].original),
        $('<div></div>').addClass('headers-container').append(
          $('<h4></h4>').addClass('headers').text(Data.products[i].name),
          $('<h5></h5>').addClass('headers').text('Price:' + Data.products[i].price + '€'),
          $('<h5></h5>').addClass('headers rate-display').attr('id','rate-'+i).text('Rate: ' + Data.products[i].average_score +'/5').append(
            $('<i></i>').addClass('fa fa-star checked'))),
        $('<div></div>').addClass('buttons').append(
          $('<button></button>').addClass('add').attr('id','add-'+i).text('Add to cart'),
          $('<button></button>').addClass('minus').attr('id','minus-'+i).text('-'),
          $('<div></div>').addClass('amount').attr('id','amount-'+i).text('0'),
          $('<button></button>').addClass('plus').attr('id','plus-'+i).text('+'),
        )
    )  
  }
  $('<div></div>').addClass('cart').appendTo('.container');
  $('.cart').append(
    $('<pre></pre>').addClass('cartText').text('Cart' + '\n' + 'Total Amount: 0'),
    $('<div></div>').addClass('cartProducts'))
  
  
  $('.openCart').click((e)=>showCart(e));
  $('.add').click((e) => onProductAmountAdd(e));
  $('.plus').click((e)=> updateAmount(e, 'amount-'));
  $('.minus').click((e)=> onProductAmountsubstrac(e, 'amount-'));
}

function showCart(e){
  $('.cart').css("display","block");
}


function updateAmount(e, x){
  const id = e.target.id.split('-')[1];
  console.log(id);
  const currentAmount = $('#'+x +id).text();
  console.log(currentAmount);
  const amount = parseInt(currentAmount) +1;
  console.log(amount);
  $('#'+x+id).text(amount);
}

function onProductAmountAdd(e){
  const id = e.target.id.split('-')[1];
  const amount = parseInt($('#amount-'+id).text());
  
  item.name = Data.products[id].name;
  item.price = Data.products[id].price;

  var itemAmount = {amount:amount};
  var itemId = {id:id};
  var elem = {...itemId, ...item, ...itemAmount};
  
  if(amount != 0){
    if(items.length == 0){ 
      items.push(elem); //if the array is empty add the first item
    } 
    else { //if the item is already in the cart then update the amount and if not, push it
      for(i=0 ; i < items.length ; i++){
        if (items[i].name.localeCompare(elem.name) == 0){
          items[i].amount += 1;
          break;
        }
      }
      if (i == items.length){
        items.push(elem);
      }
    }
  }
  cartAmount = 0;
  items.forEach(element => {
    cartAmount += element.amount*element.price;
  });
  console.log(cartAmount);

  $('.cartText').text('Cart' + '\n' + 'Total Amount:'+ cartAmount);
  console.log(items);
  showProductCart();
}


function onProductAmountsubstrac(e, y){
  const id = e.target.id.split('-')[1];
  var amount = parseInt($('#'+y+id).text());
  
  if(amount > 0){
    amount -= 1;
    $('#'+y +id).text(amount);
  }
 
  item.name = Data.products[id].name;
  item.price = Data.products[id].price;
  
  var itemAmount = {amount:amount};
  var itemId = {id:id};
  var elem = {...itemId, ...item, ...itemAmount};

  for(i=0 ; i < items.length ; i++){
    if (items[i].name.localeCompare(elem.name) == 0){
      items[i].amount -= 1;
      break;
    }
  }

  items = items.filter(function(obj){
    return obj.amount !== 0;
  })
 
  cartAmount -= elem.price;

  console.log(cartAmount);
  console.log(items);

  $('.cartText').text('Cart' + '\n' + 'Total Amount:'+ cartAmount);
  showProductCart();
}

function showProductCart(){

$('.cartProducts').empty();

items.forEach(element => {
  $('.cartProducts').append(
    $('<div></div>').addClass('cp').attr('id', 'cartProduct-'+ element.id).append(
      $('<img>').addClass('cartImg').attr('src', Data.products[element.id].images[0].square),
      $('<div></div>').addClass('productControl').append(
        $('<button></button>').addClass('cartPlus').attr('id', 'cartPlus-'+ element.id).text('+'),
        $('<div></div>').addClass('cartProductAmount').attr('id', 'cartProductAmount-'+ element.id).text(element.amount),
        $('<button></button>').addClass('cartMinus').attr('id', 'cartMinus-'+ element.id).text('-'),
      ),
    )
  )
  $('.cartPlus').click((e)=>updateAmount(e, 'cartProductAmount-'));
  $('.cartMinus').click((e)=>onProductAmountsubstrac(e, 'cartProductAmount-'));
});
 
  // $('.cartPlus').click((e)=>onProductAmountAdd(e));
// $('.remove').click((e)=>removeItemFromCart(e));
}

function removeItemFromCart(e){
  var id = e.target.id.split('-')[1];
  console.log(id);
  $('#cartProduct-'+id).remove();

  // cartAmount -= items[index].price*items[index].amount;
  // console.log(cartAmount);
  // $('.cartText').text('Cart' + '\n' + 'Total Amount:'+ cartAmount);
}

$(document).click(function(e){
  console.log(e.target.classList);
  if (e.target.classList != 'openCart' && e.target.classList != 'add' && e.target.classList !='minus' && e.target.classList != 'plus' && e.target.classList != 'remove' && e.target.classList != 'fa fa-shopping-cart fa-2x' && e.target.classList != 'cartBtn' && e.target.classList != 'cartPlus'){
    $('.cart').hide();
  }
})
