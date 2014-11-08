
var main = function(){
   var buttonSet = false;
   var categorySelected = false;
   var menu_shown = false;
   var budgetSelected = false;
   var nextWeekNo = 0;
   var currentWeekNo = 0;
   var budget = 1;
   var currentFund;
   var startFund;
   // var startDate;
   // var endDate;
   var daysLeft;

    $('#menu-page').hide();
    $('#add-category-page').hide();
    $('#new-weekly-budget-page').hide();
    $('#new-budget-page').hide();
    $("#datepicker" ).datepicker();

    var calculateFirstStartDate = function(){
      var currentDate = new Date();

      var currentDay = currentDate.getDay();

      var firstStartDate = new Date();
    if(currentDay == 0){
      firstStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    }else{
        firstStartDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    };

      console.log(firstStartDate);
      var dd = firstStartDate.getDate();
      var mm = firstStartDate.getMonth() + 1;
      var yyyy = firstStartDate.getFullYear();
      var dateString = yyyy + "-"+ mm + "-" + dd;
      console.log(dateString);
      return dateString;

    };

    // calculateEndDate(calculateFirstStartDate());


    var calculateEndDate = function(budgetStartDate){
      var startDate = new Date(budgetStartDate);
      var endDate = new Date();

      endDate.setDate(startDate.getDate() + 6);
      var dd = endDate.getDate();
      var mm = endDate.getMonth() + 1;
      var yyyy = endDate.getFullYear();
      var dateString = yyyy + "-"+ mm + "-" + dd;
      console.log(dateString);
      return dateString;

    };
     calculateEndDate(calculateFirstStartDate());

    var calculateTimeLeft = function(endDate){
      // console.log($scope.selectedTask.end_date)
      var finishDate = new Date(endDate);
             
              finishDate.setHours(23);
              finishDate.setMinutes(59);
                 var g = new Date();
                  var n = g.toString();
                  console.log(n);
                  console.log(g);
                  console.log(finishDate.getFullYear());


              var d = new Date();
              var timeNow = d.getTime()
              var timeDiff = finishDate.getTime() - timeNow
              var days = Math.floor(timeDiff / (1000 * 3600 * 24)); 
              timeDiff = timeDiff - days * (1000 * 3600 * 24)
              var hours = Math.floor(timeDiff / (1000 * 3600 ));
              timeDiff = timeDiff - hours * (1000 * 3600 );
              var minutes = Math.floor(timeDiff / (1000 * 60 ));
              timeDiff = timeDiff - minutes * (1000 * 60 )
              var seconds = timeDiff / (1000 ); 
              
              // $scope.daysLeft = days;
              // $scope.hoursLeft = hours;


              console.log(days)
             console.log(hours)
             console.log(finishDate)

             return days;

            }


  var selectBudget = function(){
    budgetSelected = false;
    $('#budgets').html("");
    $('#home-page').hide();
    $('#select-budget-page').fadeIn(500).animate({left: "10px"}, 500);
    $.getJSON("budgets", function(data){
      var budgetList = $('#budgets');
      console.log(data)

      $.each(data, function(i, budgetData){
        var newBudgetItem = ('<li class="article" value=' + budgetData.id + '>' + budgetData.name + '</li>')
        budgetList.append(newBudgetItem);
      });
    });
  };

  $('#budgets').on('click','li',function(){
    var budgetSelect;
    budgetSelected = true;
     $this = $(this);
      console.log($this);
      $this.toggleClass('selected');
      budgetSelect = $this.val();
      console.log($this);
      console.log("Budget selected")
      console.log(budgetSelect);
      budget = budgetSelect;
    
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
      $('.close').show();
      // $('#select-budget-page').hide();
      $("#datepicker" ).datepicker();

    

      // $getLatestWeekno();
      //     console.log(nextWeekNo);
      console.log("budget to be brought back");
     console.log(budget);

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
      console.log("this is the current week no")
     console.log(currentWeekNo);
      // if(currentWeekNo == 0){
      //     $('#menu-page').animate({left : "320px"},1000).fadeOut();
      //     $('#home-page').animate({left : "320px"}, 1000).fadeOut();

      //     $('#day-of-week').hide();
      //     $('#close').hide();
      //     $('#new-weekly-budget-page').animate({left : "10px"},1000).fadeIn(500);
      // }else{

        $.getJSON("budgets/" + budget + "/weekly_budgets/" + currentWeekNo, function(data){
          $('#weekly_balance').html("");
          console.log("in this code");

          currentFund = data.current_fund;
          startFund = data.start_fund;
          endDate = data.end_date;

          daysLeft = calculateTimeLeft(endDate);
          calculateEndDate(data.start_date);
          console.log(daysLeft);

          $('#time_left').text(daysLeft + " days left");

          $('#weekly_balance').append($('<p id="current">'+ data.current_fund + '</p>'));

          console.log(data.current_fund);
          if(data.current_fund < 0){
              console.log('checking balance');
              $('#weekly_balance').removeClass("positive");
              $('#header_title').removeClass("positive");
              $('#time_left').removeClass("positive");
              $('#view_weekly_chart').removeClass("positive");
              $('#weekly_balance').addClass('negative');
              $('#header_title').addClass('negative');
              $('#time_left').addClass("negative");
               $('#view_weekly_chart').addClass("negative");
          }else{
              $('#weekly_balance').removeClass("negative");
              $('#header_title').removeClass("negative");
              $('#time_left').removeClass("negative");
               $('#view_weekly_chart').removeClass("negative");
               $('#weekly_balance').addClass('positive');
              $('#header_title').addClass('positive');
              $('#time_left').addClass("positive");
              $('#view_weekly_chart').addClass("positive");
            };
          
        });
      // };
      });
    }

   selectBudget();
   // initialise();

   var transactionFields = ['amount', 'categeory', 'type'];

    console.log("this is being run");
    $('#categories').html("");


//toggle amount spent

  $('#header').on('click', function(){
    $this.toggleClass('spent');

    if ($this.hasClass('spent')){
      var spent;
      spent = parseFloat(startFund) - parseFloat(currentFund);
      $('#header_title').text("Spent this week");
       $('#weekly_balance').html("");
       $('#weekly_balance').append($('<p id="current">'+ spent + '</p>'));

    }else{
       $('#header_title').text("Remaining money this week");
         $('#weekly_balance').html("");
        $('#weekly_balance').append($('<p id="current">'+ currentFund + '</p>'));
    };
  });

//show menu-icon click function

    $('#menu-icon').on('click', function(){
      if(menu_shown){
        if(!budgetSelected){
        $('#select-budget-page').fadeIn().animate({left : "10px"},1000);
        }else{
        $('#home-page').animate({left : "10px"},1000);
        };
        $('#menu-page').fadeOut().animate({left : "320px"},1000);
          menu_shown = false;
      }else{
        $('#home-page').animate({left : "300px"},1000);
        $('#select-budget-page').fadeOut().animate({left: "350px"},1000);
        $('#add-category-page').fadeOut().animate({left: "350px"},1000);
        $('#new-weekly-budget-page').fadeOut().animate({left: "350px"},1000);
        $('#new-budget-page').fadeOut().animate({left: "350px"},1000);
        $('#chart').fadeOut().animate({left: "350px"},1000);
        if(budgetSelected){
          $('.no-budget').show();
        }else{
           $('.no-budget').hide();
        };

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
          var startDate = calculateFirstStartDate();
          var endDate = calculateEndDate(startDate);
        createWeeklyBudget(newBudgetAmount, nextWeekNo, startDate, endDate);
        $('#budget-input').val("");
        $('#new-weekly-budget-page').fadeOut().animate({left : "320px"},1000);
        $('#home-page').animate({left : "10px"}, 1000).fadeIn(500);
        initialise();
    });

      $('#new-budget-submit').on('click', function(){

        var newBudgetName = $('#new-budget-input').val();
        createNewBudget(newBudgetName);
          $.getJSON("/budgets", function(data){
        console.log(data);
        var latestBudget = data.length;
        budget = data[latestBudget-1].id;
        console.log(budget);
        });
        $('#new-budget-input').val("");
        $('#new-budget-page').fadeOut().animate({left : "320px"},1000);
        $('#home-page').animate({left : "10px"}, 1000).fadeIn(500);

        //Create the weekly budget

          $('#menu-page').animate({left : "320px"},1000).fadeOut();
          $('#home-page').animate({left : "320px"}, 1000).fadeOut();
          $('#day-of-week').hide();
          $('.close').hide();
          // startDate = calculateFirstStartDate();
          // endDate = calculateEndDate(startDate);
         
          $('#new-weekly-budget-page').animate({left : "10px"},1000).fadeIn(500);

      
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
        $('#menu-icon').hide();
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
        $('#menu-icon').fadeIn();
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


  var createWeeklyBudget = function(weeklyBudget, nextWeekNo, startDate, endDate){
    console.log(nextWeekNo);
    // startDate = calculateFirstStartDate();
    // endDate = calculateEndDate(startDate);
   
    path="budgets/" + budget + "/weekly_budgets"
    method="POST"

    var data = {};
    
    // data["end_date"] = endDate;
    data["budget_id"] = budget;
    data["start_fund"] = weeklyBudget;
    data["current_fund"] = weeklyBudget;
    data["weekno"] = nextWeekNo;
    data["start_date"] = startDate;
     data["end_date"] = endDate;
   
    console.log(endDate);

    console.log(data);

     $.ajax({
      url: path,
      method: method,
      data: {weekly_budget: data},
      dataType: "json"
    });

  };

  var runChart = function(){

        var data = [
              {
                  value: 300,
                  color:"#F7464A",
                  highlight: "#FF5A5E",
                  label: "Red"
              },
              {
                  value: 50,
                  color: "#46BFBD",
                  highlight: "#5AD3D1",
                  label: "Green"
              },
              {
                  value: 100,
                  color: "#FDB45C",
                  highlight: "#FFC870",
                  label: "Yellow"
              }
          ]

  // var runChart = function(){
    // Get context with jQuery - using jQuery's .get() method.
    console.log($("#myChart"));
      var ctx = $("#myChart").get(0).getContext("2d");
      console.log(data);

      // This will get the first returned node in the jQuery collection.
      // var myNewChart = new Chart(ctx);

      var myDoughnutChart = new Chart(ctx).Doughnut(data);

  };

  $('#view_weekly_chart').on('click', function(){
    if($('#canvas').length==0){
      console.log("deleting chart");
       $('#myChart').remove();
     };
      $('#home-page').animate({left : "320px"},1000).fadeOut();
      $('#chart').append('<canvas id="myChart" width="300" height="300"></canvas>');
      $('#chart').fadeIn().animate({left: "10px"}, 1000);
    runChart();
  
  });
  // $('#chart').on('click', function(){

  //   runChart();

  // });

};


$(document).ready(main)