const item = {name: '', price: '', amount: ''};
const items = new Array();
console.log(typeof(items));

showProducts(item, items);

function showProducts(item, items){
  for (i=0; i<Data.products.length; i++){
    $('.container').append($('<div></div>',{
      id: 'product-'+i,
      class: 'products'
    }));
    $('#product-'+i).append(
        $('<img></img>',{
        src: Data.products[i].images[0].original,
        class: 'images',
      }),
        $('<pre></pre>',{
        class: 'paragraph',
        id:'p-' +i,
        text:Data.products[i].name +'\n' + 'Price:' + Data.products[i].price + '€' + '\n' + 'Rate: ' + Data.products[i].average_score +'/5'
    }));
    $('#p-'+i).append(
      $('<span></span>',{
      class: 'fa fa-star checked'
    }));
    $('#product-'+i).append(
        $('<button></button>',{
        class: 'add',
        id: 'add-'+i,
        text: 'Add to cart'
      }),
    $('<span></span>',{
        class:'amount',
        id: 'amount-'+i,
        text: '0'
      }),
    $('<button></button>',{
        class:'productAmount',
        id: i,
        text: '+'
    }));
  }
  $('<div></div>',{
    class:'cart'
  }).hide().appendTo('.container');
  $('<pre></pre>',{
    class:'cartText',
    text:'Cart' + '\n' + 'Total Amount:'
  }).appendTo('.cart');

  $('.add').click(function(){
    $('.cart').show().animate({left: '800px'}, 'fast');
    const id = this.id;
    console.log(id);
  })

  $('.productAmount').click(function(item, items){
    const currentAmount = $('#amount-'+ this.id).text();
    const amount = parseInt(currentAmount)+1;
    $('#amount-'+ this.id).text(amount);
    const totalAmount = amount*Data.products[this.id].price;

    item.name = Data.products[this.id].name;
    console.log(item.name);
    item.price = Data.products[this.id].price;
    console.log(item.price);
    item.amount = amount;
    console.log(item.amount);
    items.push(item);

    console.log(totalAmount);
    console.log(item);
    console.log(typeof(item));
    console.log(items);
    $('.cartText').append(totalAmount);
  })

}

