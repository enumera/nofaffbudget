
var main = function(){
   var buttonSet = false;
   var categorySelected = false;

   var transactionFields = ['amount', 'categeory', 'type'];

  console.log("this is being run");
  $('ul').html("");

  $.getJSON("/weekly_budgets/1", function(data){
    console.log(data.current_fund);
    $('#weekly_balance').append($('<p id="current">'+ data.start_fund + '</p>'));
  });


  $.getJSON("/categories", function(data){
    console.log(data)
     var categoryList = $('#categories');

      $.each(data, function(i, category){
      var $newListItem = $('<li class="article">' + category.name + '</li>');
      categoryList.append($newListItem);
      });
  });

  $('#categories').on('click', 'li', function(){
    
    if(categorySelected===false){
      $this = $(this);
      console.log($this);
      $this.toggleClass('selected');
      categorySelected = true;

   
      if($('#transaction-input').val()==""){
     
        $('#transactions-page').animate({left : "0px"}, 500);
        $('#home-page').animate({left : "320px"},1000);
        
        $.getJSON("/transactions", function(data){
          var transactionList = $('#transactions');

          $.each(data, function(i, transaction){
            var $newListItem = $('<li class="article">' + transaction.amount + '<li>');
            transactionList.append($newListItem);
          });
          transactionList.append($('<li class="article home"> Back</li>'));
        });

      }else
        {  
          if(!$this.hasClass('with-button') && buttonSet === false){
            buttonSet = true;
            $this.addClass('with-button');
            $this.append('<span class="setButton"><button>Set</button></span>').click(function(){
                console.log("transaction now logged");
              //add a function to process the transaction
              performTransaction();
          });
        };
      };
    };
  });

  $('#transactions').on('click', 'li', function(){
     
    $('.article').removeClass('selected');
    $this = $(this);

    if($this.hasClass('home')){
      $('#transactions-page').animate({left : "320px"}, 500);
      $('#home-page').animate({left : "0px"},1000);
      categorySelected=false;
    };
  });

  var performTransaction = function(){
    console.log("In performTransaction")
    //ajax call to transaction

    path="transactions";
    method = "POST";

    var data = {};

    data["amount"] = 25.0;
    data["category_id"] = "1";
    data["weekly_budget_id"] = 1;

    // $.each(transactionFields, function(i, field){

    //   data[field] = $('#' + field).val();

    // });

  $.ajax({
    url: path,
    method: method,
    data: {transaction: data},
    dataType: "json"
    });

  };

};





$(document).ready(main)