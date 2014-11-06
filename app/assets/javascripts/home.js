
var main = function(){
   var buttonSet = false;
   var categorySelected = false;
   var menu_shown = false;
   var nextWeekNo = 0;
   var currentWeekNo = 0;
   var budget = 1;

    $('#menu-page').hide();
    $('#add-category-page').hide();
    $('#new-weekly-budget-page').hide();
    $('#new-budget-page').hide();
    $("#datepicker" ).datepicker();

  var selectBudget = function(){
      $('#budgets').html("");
    $('#home-page').hide();
    $('#select-budget-page').fadeIn(500).animate({left: "10px"}, 500);
    $.getJSON("budgets", function(data){
      var budgetList = $('#budgets');
      console.log(data)

      $.each(data, function(i, budget){
        var newBudgetItem = ('<li class="article" value=' + budget.id + '>' + budget.name + '</li>')
        budgetList.append(newBudgetItem);
      });
    });
  };

  $('#budgets').on('click','li',function(){
    var budgetSelected;
   
     $this = $(this);
      console.log($this);
      $this.toggleClass('selected');
      budgetSelected = $this.val();
      console.log($this);
      console.log(budgetSelected);
      budget = budgetSelected;
    
      $('#select-budget-page').animate({left: "320px"}, 1000).fadeOut();
   
      initialise();
  });




     var initialise = function(){
      $('#home-page').animate({left : "10px"}, 1000).fadeIn(1000);
    // gets the weekly budget information
      $('#menu-page').hide();
      $('#add-category-page').hide();
      $('#new-weekly-budget-page').hide();
      $('#new-budget-page').hide();
      // $('#select-budget-page').hide();
      $("#datepicker" ).datepicker();

    

      // $getLatestWeekno();
      //     console.log(nextWeekNo);
     
     $.getJSON("budgets/" + budget + "/weekly_budgets", function(data){
      
        console.log(data);
        var dataLength = data.length;
        console.log(dataLength);
          
         nextWeekNo = parseInt(data[dataLength-1].weekno) + 1;
         currentWeekNo = parseInt(data[dataLength-1].id);
         console.log("This week no is working:")
         console.log(nextWeekNo);
         console.log(currentWeekNo);

          // Get category information and append to the main page.

      $.getJSON("/budgets/" + budget + "/categories", function(data){
        console.log(data)

         var categoryList = $('#categories');

         categoryList.html("");

          $.each(data, function(i, category){
          var $newListItem = $('<li class="article" value='+ category.id +'>' + category.name + '</li>');
              categoryList.append($newListItem);
          });

          $.getJSON("weekly_budgets/"+ currentWeekNo + "/transactions", function(data){
            console.log("account data");
            console.log(data);
            $('#categories li').each(function(i){
              $(this).append('<span class="amount">' +'    '+ data.amounts[i] + '</span>');
            });
          });
        });

        $.getJSON("budgets/" + budget + "/weekly_budgets/" + currentWeekNo, function(data){
          $('#weekly_balance').html("");
          console.log("in this code");

          $('#weekly_balance').append($('<p id="current">'+ data.current_fund + '</p>'));

          console.log(data.current_fund);
          if(data.current_fund < 0){
              console.log('checking balance');
              $('#weekly_balance').removeClass("positive");
              $('#header_title').removeClass("positive");
              $('#weekly_balance').addClass('negative');
              $('#header_title').addClass('negative');
          }else{
              $('#weekly_balance').removeClass("negative");
              $('#header_title').removeClass("negative");
               $('#weekly_balance').addClass('positive');
              $('#header_title').addClass('positive');
              };
          
        });
      });
    }

   selectBudget();
   // initialise();

   var transactionFields = ['amount', 'categeory', 'type'];

    console.log("this is being run");
    $('#categories').html("");

//show menu-icon click function

    $('#menu-icon').on('click', function(){
      if(menu_shown){
        $('#home-page').animate({left : "10px"},1000);
        $('#menu-page').fadeOut().animate({left : "320px"},1000);
          menu_shown = false;
      }else{
        $('#home-page').animate({left : "300px"},1000);
        $('#menu-page').fadeIn(500).animate({left : "10px"},1000);
        menu_shown = true;
      }
    });

//Menu items controllers

    $('#menu-items').on('click', 'li', function(){
      $this = $(this);
      var menuSelected = $this.text();
      console.log(menuSelected);
      $('#menu-page').animate({left : "320px"},1000).fadeOut();
      $('#home-page').animate({left : "320px"}, 1000).fadeOut();

      switch(menuSelected){
        //create a new category
        case "Add a new category":
             $('#add-category-page').animate({left : "10px"},1000).fadeIn(500);
            break;
        case "Add a new weekly budget":
             $('#day-of-week').hide();
             $('#new-weekly-budget-page').animate({left : "10px"},1000).fadeIn(500);
            break;

        case "Create a new budget":
            $('#new-budget-page').animate({left : "10px"},1000).fadeIn(500);
            break;
        case "Select from budget":
            selectBudget();
            break; 
      };
    });

      $('#weekly-budget-submit').on('click', function(){

        var newBudgetAmount = $('#budget-input').val();
        createWeeklyBudget(newBudgetAmount, nextWeekNo);
        $('#budget-input').val("");
        $('#new-weekly-budget-page').fadeOut().animate({left : "320px"},1000);
        $('#home-page').animate({left : "10px"}, 1000).fadeIn(500);
        initialise();
    });

         $('#new-budget-submit').on('click', function(){

        var newBudgetName = $('#new-budget-input').val();
        createNewBudget(newBudgetName);
        $('#new-budget-input').val("");
        $('#new-budget-page').fadeOut().animate({left : "320px"},1000);
        $('#home-page').animate({left : "10px"}, 1000).fadeIn(500);
        initialise();
    });



    $('#category-submit').on('click', function(){
      var newCategoryName = $('#category-input').val();
      createCategory(newCategoryName);
        $('#category-input').val("");
        $('#add-category-page').fadeOut().animate({left : "320px"},1000);
        $('#home-page').animate({left : "10px"}, 1000).fadeIn(500);
        initialise();
    });

//Listener for category li

  $('#categories').on('click', 'li', function(){
     console.log(currentWeekNo);
    if(categorySelected===false){
      $this = $(this);
      console.log($this);
      $this.toggleClass('selected');
      var categoryNameSelected = $this.attr('value');
      categorySelected = true;

   
      if($('#transaction-input').val()==""){
        $('#transactions').html("");
        $('#transactions-page').animate({left : "0px"}, 500);
        // $('#home-page').animate({left : "320px"},1000);
         $('#home-page').fadeOut();

        $('#transactions-page').fadeIn();

        $.getJSON("weekly_budgets/"+ currentWeekNo + "/transactions", function(data){
          var transactionList = $('#transactions');
          console.log("category selected")
          console.log(categoryNameSelected);

          $.each(data.transactions, function(i, transaction){

            if(categoryNameSelected == transaction.category_id){

            var $newListItem = $('<li class="article">' + transaction.amount + '<li>');
            transactionList.append($newListItem);
            };
          });
          transactionList.append($('<li class="article home"> Back</li>'));
        });

      }else

        {  
          if(!$this.hasClass('with-button') && buttonSet === false){
            var data = {};
              buttonSet = true;
              $this.addClass('with-button');
              console.log("this has been found");
              console.log(buttonSet)
              $this.append('<span class="setButton"><button>Allocate</button></span>').click(function(){
                console.log("transaction now logged");
                console.log($this);
                $this.fadeOut();
                  //add a function to process the transaction
                
                  data['category_id'] = parseInt($this.attr('value'));
                  data['amount'] = parseFloat($('#transaction-input').val());
                  data['weekly_budget_id'] = currentWeekNo;

                  console.log(data);

                  performTransaction(data);
                  $this.toggleClass('selected');
                  categorySelected = false;
                  $this.removeClass('with-button');
                  $('.setButton').remove();
                  $('#transaction-input').val('');
                  buttonSet = false;
              
                  initialise();
              });
        };
      };
    };
  });

  //allow user to select back.

  $('#transactions').on('click', 'li', function(){
     
    $('.article').removeClass('selected');
 
    $this = $(this);

    if($this.hasClass('home')){
      $('#transactions-page').fadeOut().animate({left : "320px"}, 500);
      // $('#home-page').animate({left : "0px"},1000);
        categorySelected=false;
        $('#transactons-page').html("");
        $('#home-page').fadeIn();
    };
  });


  //Cancel a transaction or new category

   $('.close').on('click', function(){
      $this = $(this);

      var pageOpen = $this.parent().parent().attr('id');
      console.log(pageOpen);

      switch(pageOpen){
        case "add-category-page":
          $('#add-category-page').fadeOut().animate({left : "320px"},1000);
          $('#home-page').fadeIn().animate({left : "10px"},1000);
          break;
        case "new-weekly-budget-page":
          $('#new-weekly-budget-page').fadeOut().animate({left : "320px"},1000);
          $('#home-page').fadeIn().animate({left : "10px"},1000);
          break;
        case "new-budget-page":
           $('#new-budget-page').fadeOut().animate({left : "320px"},1000);
          $('#home-page').fadeIn().animate({left : "10px"},1000);
          break;
      }

  });

  // add a transaction

  var performTransaction = function(data){
    console.log("In performTransaction")
    

    path="weekly_budgets/"+ data.weekly_budget_id  +"/transactions";
    method = "POST";


  console.log(data);

  $.ajax({
    url: path,
    method: method,
    data: {transaction: data},
    dataType: "json"
    });
  };

  var createCategory = function(categoryName){

    path="budgets/" + budget +"/categories";
    method="POST";

    var data = {};

    data["name"] = categoryName;
    data["budget_id"] = budget;

    console.log(data);

    $.ajax({
      url: path,
      method: method,
      data: {category: data},
      dataType: "json"
      });
  };


  var createNewBudget = function(budgetName){

    path="budgets";
    method="POST";

    var data = {};

    data["name"] = budgetName;

    $.ajax({
      url: path,
      method: method,
      data: {budget: data},
      dataType: "json"
    });


  }


  var createWeeklyBudget = function(weeklyBudget, nextWeekNo){
    console.log(nextWeekNo);
   
    path="budgets/" + budget + "/weekly_budgets"
    method="POST"

    var data = {};



    data["budget_id"] = budget;
    data["start_fund"] = weeklyBudget;
    data["current_fund"] = weeklyBudget;
    data["weekno"] = nextWeekNo;

    console.log(data);

     $.ajax({
      url: path,
      method: method,
      data: {weekly_budget: data},
      dataType: "json"
    });

  };
};


$(document).ready(main)