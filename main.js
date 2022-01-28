usd = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  usd12 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 12, maximumFractionDigits: 12 });
  $("input").click(function(){
      $(".dropdown").hide();
    $(this).siblings("div").show();
  });

  $("input").change(function(){
    $(this).siblings("div").hide();
  });

  $(".selectOption").click(function(){
    var value = $(this).data("qty");
    var optionID = $(this).data("id");
    $("#"+ optionID).val(value);
    $(this).parent("div").hide();
  });

  $("button#calc").click(function () {
  $(".dropdown").hide();                      

    //Add API code to get EGC Price and Rematic Price to use in calculations
 var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=evergrowcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true';
  fetch(apiUrl).then(response => {
  return response.json();
  }).then(data => {
  // Work with JSON data here            
  document.getElementById('egcprice').innerHTML = data.evergrowcoin.usd;
  let egcpc = data.evergrowcoin.usd;
  let realvol = data.evergrowcoin.usd_24h_vol;
  $('#egcprice').html(usd12.format(egcpc));

var apiUrl_rmtx = 'https://api.coingecko.com/api/v3/simple/price?ids=rematicegc&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true';
  fetch(apiUrl_rmtx).then(response => {
  return response.json();
  }).then(data => {
    let rematicpc = data.rematicegc.usd;        	       	 

  //Capture values and process them
var RematicQty = $('#RematicQty').val();
 RematicQty = parseFloat(RematicQty.replace(/\,/g, ''));
var dailyVolume = $('#dailyVolume').val();
 dailyVolume = parseFloat(dailyVolume.replace(/\,/g, ''));
 var circulatingSupply = $( '#circulatingSupply' ).val();
circulatingSupply = parseFloat( circulatingSupply.replace( /\,/g, '' ) );   
var marketCap = $('#marketCap').val();
 marketCap = parseFloat(marketCap.replace(/\,/g, ''));
                    
//Calculations of reflections
var pricerematic = marketCap / circulatingSupply;

var totalPortfolioValue = RematicQty * rematicpc;
var Estimatedtotal = RematicQty * pricerematic;

var myShare = RematicQty / circulatingSupply;

var myDailyReflections = dailyVolume * .09 * myShare;  // @ 9% reward rate for RMTX
            
var myDailyReflections = (myDailyReflections*0.86) / egcpc;  //Cost of EGC with 14% Buy Tax 
var dailyvalue = myDailyReflections * egcpc;

var myMonthlyReflections = myDailyReflections * 365 / 12;
var monthlyvalue = myMonthlyReflections * egcpc;
var myYearlyReflections = myMonthlyReflections * 12;
    

      
//Update the Rewards calculator page with the calculated totals   estrematicprice
 $('#estrematicprice').html(usd12.format(pricerematic));  
 $('#Estimatedtotal').html(usd.format(Estimatedtotal)); 
 $('#pricerematic').html(usd12.format(rematicpc));       
 $('#totalValue').html(usd.format(totalPortfolioValue));
 $('#dailyReflections').html(usd.format(myDailyReflections));
$('#dailyvalue').html(usd.format(dailyvalue));
$('#monthlyReflections').html(usd.format(myMonthlyReflections));
 $( '#monthlyvalue' ).html( usd.format( monthlyvalue ) );
    monthlyvalue
 //  $('#yearlyReflections').html(usd.format(myYearlyReflections)); //Not yet added Yearly reflections to dashboard
    
  
    
    
  }).catch(err =>{         	
  document.getElementById('error').innerHTML = 'Error fetching data from CoinGecko. Please try again later.';
  });
  } ).catch( err =>
  {  // Display error message for an error here
  document.getElementById('error').innerHTML = 'Error fetching data from CoinGecko. Please try again later.';
  });    //Catch error  

  } );
  
  
//Click button
 $(".closeButton").click(function(){
    $(".dropdown").hide();
  } );



    // WIP - Code to integrate and default real time volume on the screen when it first loads
    // var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=rematicegc&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true';
    // fetch(apiUrl).then(response => {
    //   return response.json();
    //      }).then(data => {
    //    Work with JSON data here
    //   console.log(data);
    //   document.getElementById('dailyVolume').innerHTML = data.rematicegc.usd_24h_vol;
    //   let realvol = data.rematicegc.usd_24h_vol;
            
    //   }).catch(err => {
    //    Do something for an error here
      
    // });