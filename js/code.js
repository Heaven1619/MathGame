$(document).ready(function(){
  /*popup('طالب جان ! !<br>اگه باگ یا مشکلی تو بازی دیدی بهم تو تلگرام پیام بده <hr>'+
  'یه عکس از بازی هم هر وقت فرصت کردی از گوشیت بگیر و برام بزار. میخوام ببینم رو گوشی 5 اینچی چطور نمایش داده میشه.'
  +'بای',
  'باشه تو جون بخواه','no',10);*/
  //Check if a record already is broken using Cookie
  var wl = window.location.href;
  var mob = (wl.indexOf("android")>0);
  record=0;
  pre_record = 0;
  to_score = 0;
  cur_end_txxt= '';
  main_sum = 0;

  var cur_record = window.localStorage.getItem('record_math');
  if(cur_record)
  {
    $('#cur_record').html(Text.cur_record + cur_record);
    $('#score').html(' '+cur_record);
    record = cur_record;
    pre_record = record;
  }
  else
  {
    $('#cur_record').html(Text.no_record_yet);
    $('#score').html(0);
  }
  //END Check if a record already is broken using Cookie

  var startbtn = $('#start_btn');//Start btn Animation
  var body = $('body');
  startbtn.show(100,function(){
    startbtn.animate({'left':'+=33%'},1000,function(){
      startbtn.animate({'width':'+=15%'},500,function(){
        startbtn.animate({'height':'+=12%'},500,function(){
          startbtn.animate({'fontSize':'+=80%'},1000,function(){
            body.one('click','#start_btn',ready);
            $('#hardness_btn_main').fadeIn();
            $('#best_records_btn_main').fadeIn();
          });
        });
      });
    });
  }); //Start btn Animation END

  $('.answ').on('click',result);
  body.on('click','.answ_bigger',which_is_bigger);
  body.on('click','#close_popup_btn',popupclose);
  body.on('click','#start_first_popup_btn',start_first);
  body.on('click','#next_level_popup_btn',next_level);
  $('#question').on('click',make_vertical_question);
  body.on('click','#credit',credits);
  body.on('click','#analyse',analyse);
  body.on('click','#show_wrong_btn',show_wrongs);
  //body.on('click','#hardness_btn_main',hardness);
  body.on('click','#pause',function(){pause(false);});
  body.on('click','#record_save_btn',record_btn);
  $('#user').on('click',record_btn);
  body.on('click','#signup_btn',function(){save_record('signup_and_send');});
  body.on('click','#send_record_btn',function(){save_record('update_record');});
  body.on('click','#best_records_btn,#best_records_btn_main',function(){show_best_records('total');$('#total_records_header,#today_records_header').removeClass('focused'); $('#total_records_header').addClass('focused'); $(this).parent().hide();
        $(this).parent().parent().find('.popup_back').hide();});
  body.on('click','#total_records_header',function(){show_best_records('total');$('#total_records_header,#today_records_header').removeClass('focused'); $('#total_records_header').addClass('focused');});
  body.on('click','#today_records_header',function(){show_best_records('today');$('#total_records_header,#today_records_header').removeClass('focused');  $('#today_records_header').addClass('focused');});
  body.on('click','#go_first_btn',go_first_screen);
  body.on('click','#hadrness_screen_close_btn,#close_loged_in_btn',just_closepopup); //also is being used for setting and credit popups
  body.on('click','#signed_up_question_btn',function(){login('login_screen');});
  body.on('click','#login_btn',function(){login('login_btn');});
  body.on('click','#continue_time',function(){
    if(live-2>0)
    {
      $('#continue_time').show();
      sec+=5; live-=2; to_score=0; $('#answ_sec li').css({'color':'black','textDecoration':'none'}); $('.popup_back,.popup_box').fadeOut(500); $('#live').text(live);  Timer(); sec_interval = setInterval(Timer,1000);
      ms_interval = setInterval(millisec,10); math();
    }
    else
    {
      $('#continue_time').html('قلب هات کافی نیست');
      /*cur_end_text = $('.popup_box').html();
        popup('<span class="glyphicon glyphicon-heart"></span><br> <span style="color:#fff;background-color:red; border-radius:30px;text-align:center;padding: 5px 5px;">قلب هات  کافی نیست </span><br> ' +
         'فیلم تبلیغاتی کوتاه ببین و 2 قلب هدیه بگیر'+'<br><br>'+
       '<input type="button" class="btn btn-primary btn-lg" value="مشاهده فیلم" id="ad_video_btn">  '+
       '<input type="button" class="btn btn-danger btn-lg" value="خرید بسته" id="buy_live_btn">'+
        '<br><button type="button" class="btn btn-warning" id="back_btn_analyse"><span class="glyphicon glyphicon-remove"></span></button>');*/
    }
  });
  body.on('click','#back_btn_analyse',function (){popup(cur_end_text);});//also is being used for signup screen
  body.on('click','#settings',hardness);
  body.on('click','#next_question_true_false_btn',function(){math(); $('.popup_box,.popup_back').hide(); sec_interval = setInterval(Timer,1000);
    ms_interval = setInterval(millisec,10);});
  body.on('click','#skip',skip);
  /*body.on('click','#buy_live_btn',buy);
  body.on('click','#five_live_btn',function(){buy_item('five_live');});
  body.on('click','#fifteen_live_btn',function(){buy_item('fifteen_live');});
  body.on('click','#thirty_live_btn',function(){buy_item('thirty_live_live');});
  body.on('click','#one_hundred_live_btn',function(){buy_item('hundred_live');});*/
  /*body.on('click','#purchase_main_btn',purchase_screen);*/

});
/*function purchase_screen() {
  popup('<span style="font-size:125%; font-weight:bold; color:purple">خرید نسخه حمایتی</span>' + '<br>' + 'برای رفاه حال شما و اینکه بهترین تجربه رو داشته باشین ما بازی رو ' +
  '<span style="color:red;"> بدون تبلیغات </span> منتشر کردیم. اگه دوست داشتی میتونی با خرید نسخه <span style="color:green;"> حمایتی </span> ازمون حمایت کنی. '+
  '<br>' + '<span style="color:brown;"> به علاوه </span> با خرید این نسخه امکان <span style="color:purple;"> ثبت و رقابت آنلاین </span> و <span style="color:purple;"> تغییر درجه سختی</span> هم برات فعال میشه.'+
  '<button type="button" class="btn btn-warning btn-lg">خرید نسخه حمایتی</button>','no','no',10);
}*/
/*function purchase_screen() {

  popup('<span style="font-size:115%;">فیلم کوتاه تبلیغاتی ببین و  2 قلب' + '<span class="glyphicon glyphicon-heart"></span> ' + 'رایگان هدیه بگیر </span>' + '<br>'+
  '<br><button type="button" class="btn btn-primary btn-lg">مشاهده فیلم </button>  ' +
  '<button type="button" class="btn btn-danger btn-lg" id="buy_live_btn"> خرید قلب <span style="font-size:90%;" class="glyphicon glyphicon-heart"></span></button>' +
  '<br><button type="button" style="margin-top:5px;" class="btn btn-info btn-lg"> بازکردن سطح سخت و ساده </button>'+
  '<br><button type="button" class="btn btn-warning" id="hadrness_screen_close_btn"><span class="glyphicon glyphicon-remove"></span></button>','no','no',14);
}
function buy() {
  if(level_check !== 0)//in Game
  {
    popup('خرید قلب <br><button style="width:90%; type="button" class="btn btn-default btn-lg" id="five_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">5 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 500 تومان ) ' +
    '</buttton><br>'+
  '<button type="button"  style="width:90%; margin-top:5px;" class="btn btn-default btn-lg" id="fifteen_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">15 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 1000 تومان ) ' +
  '<br><button  style="width:90%; margin-top:5px;" type="button" class="btn btn-default btn-lg" id="thirty_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">30 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 2000 تومان ) ' +
  '<br><button  style="width:90%; margin-top:5px;" type="button" class="btn btn-default btn-lg" id="one_hundred_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">100 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 5000 تومان ) ',
  'بازگشت','back_btn_analyse',14);
  }
  else if(level_check === 0)// in MAin screen
  {
    popup('خرید قلب <br><button style="width:90%; type="button" class="btn btn-default btn-lg" id="five_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">5 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 500 تومان ) ' +
    '</buttton><br>'+
  '<button type="button"  style="width:90%; margin-top:5px;" class="btn btn-default btn-lg" id="fifteen_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">15 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 1000 تومان ) ' +
  '<br><button  style="width:90%; margin-top:5px;" type="button" class="btn btn-default btn-lg" id="thirty_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">30 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 2000 تومان ) ' +
  '<br><button  style="width:90%; margin-top:5px;" type="button" class="btn btn-default btn-lg" id="one_hundred_live_btn">' + '<span style="font-weight:bolder; font-size:130%;">100 قلب  </span><span class="glyphicon glyphicon-heart" style="color:red; font-size:90%;"></span>  ( 5000 تومان ) '+
  '<br><button type="button" class="btn btn-warning" id="back_btn_live_to_purchase_main" onclick="purchase_screen()"><span class="glyphicon glyphicon-arrow-left"></span></button>',
  'no','no',14);
  }
}
function buy_item(item){
  if(item == 'five_live')
  {
    InAppBilling.consumePurchase(function(){
       live+=5;
       $('#live').text(live);
       popup('<span style="color:green">انجام شد </span><br> شما اکنون ' + live + ' قلب دارید ',
    'بازگشت', 'back_btn_analyse',10 );
    },
    error,
    'five_live');
  }
  if(item == 'fifteen_live')
  {
     InAppBilling.consumePurchase(function(){
        live+=15;
        $('#live').text(live);
        popup('<span style="color:green">انجام شد </span><br> شما اکنون ' + live + ' قلب دارید ',
     'بازگشت', 'back_btn_analyse',10 );
     },
     error,
     'fifteen_live');
  }
  if(item == 'thirty_live')
  {
    InAppBilling.consumePurchase(function(){
       live+=30;
       $('#live').text(live);
       popup('<span style="color:green">انجام شد </span><br> شما اکنون ' + live + ' قلب دارید ',
    'بازگشت', 'back_btn_analyse',10 );
    },
    error,
    'thirty_live');
  }
  if(item == 'one_hundred_live')
  {
    InAppBilling.consumePurchase(function(){
       live+=100;
       $('#live').text(live);
       popup('<span style="color:green">انجام شد </span><br> شما اکنون ' + live + ' قلب دارید ',
    'بازگشت', 'back_btn_analyse',10 );
    },
    error,
    'one_hundred_live');
  }
}
function error(){
popup('<span style="color:red;">خطا </span><br> خرید انجام نشد . لطفا دوباره سعی کنید ',
'بازگشت', 'back_btn_analyse' , 10);
}

/**/
function skip() {
  math();
  score-=1;
  add_score_reward_status_bar('minus',1);
  live--;
  $('#live').text(live);
  $('#score').text(score);
  live_run_out();
}
function credits() {
  popup(Text.credit,
  'اوکی','hadrness_screen_close_btn');
}
function hardness() {
  popup('درجه سختی'+'<br>'+
  '<form>'+
  '<label for="rad_hard">سخت ( امتیاز بیشتر )</label> <span class="glyphicon glyphicon-lock"> </span>'+
  '<input type="radio" id="rad_hard" name="hardness" value="سخت">'+'<br>'+
  '<label for="rad_hard">متوسط</label>'+
  '<input checked type="radio" id="rad_medium" name="hardness" value="متوسط">'+'<br>'+
  '<label for="rad_hard">ساده ( امتیاز کمتر )</label> <span class="glyphicon glyphicon-lock"> </span>'+
  '<input type="radio" id="rad_easy" name="hardness" value="آسان">'+
  '</form>',
'تایید','hadrness_screen_close_btn');
}
/*function setting() {
  popup('تنظیمات',
'تایید','hadrness_screen_close_btn');
}*/
function ready(){
  body = $('body');
  body.off('click','#start_btn');
  var startbtnspan = $('#start_btn_span');
    startbtnspan.text('آماده ؟').fadeIn(500,function(){
      startbtnspan.delay(1000).fadeOut(500,function(){
          startbtnspan.text('3').fadeIn(500,function(){
            startbtnspan.text('2').hide().fadeIn(1000,function(){
              startbtnspan.text('1').hide().fadeIn(1000,function(){
                show_main();
              });
            });
          });
      });
    });
}
//Initial variable define! پیش تعریف ورای ایبل ها
sec = 5;
score = 0;
adad1 = 0;
adad2 = 0;
wrongs = 0;
wrongs_array = [];
sum_of_wrong_array= [];
selected_wrong_array= [];
records_array = [];
corrects = 0;
count = 0;
reward_Time = 2; //default value (medium level that already selected)
reward_Score = 4;
level_check = 0;
cur=0;
live =5;
count_wrongs_selection = 0;
percent = 0;
format = 0;
sum_1 = 0;
sum_2 = 0;
var adad = {
  adad1 : 0,
  adad2 : 0
};
question1 = 0;
question2 = 0;
cur_state_question = {};
//Initial variable define! END!
function show_main() {
  var sound = document.getElementById('start_sound');
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  $('#question').css('fontSize','500%');
  $('#question2').hide();
  $('#answ_ul').show();
  $('#answ_bigger_ul').hide();
  $('#answ_sec li').css({'textDecoration':'none','color':'black','backgroundColor':'#fff','border':'3px solid #3a3535'}).off('click').on('click',result).show();
  cur=0;
  live =5;
  count_wrongs_selection = 0;
  sec = 5;
  score= 0;
  adad1 = 0;
  adad2 = 0;
  wrongs = 0;
  wrongs_array = [];
  sum_of_wrong_array= [];
  selected_wrong_array= [];
  records_array = [];
  corrects = 0;
  count = 0;
  reward_Time = 1.5; //default value (medium level that already selected)
  reward_Score = 4;
  level_check = 1;
  to_score = 0;
  $('.title,#cur_record,#user,#purchase_main_btn').hide();
  $('#math_screen').css('backgroundColor','#ae249c');
  $('#start_btn').toggle(500);
  $('#best_records_btn_main').hide();
  $('#license').hide();
  $('#hardness_btn_main').hide();
  $('#quest_sec,#answ_sec').fadeIn(1000);
  $('#score').text('0');
  math();
  Timer();
  sec_interval = setInterval(Timer,1000);
  ms_interval = setInterval(millisec,10);
}

function math() {
  cur_state_question = {};
  $('#question').css({'lineHeight':'100px'});
  count++;

    if(score<60 || score>=540 && score<600)//Level 1 // level 10
    {
      if(level_check == 2) {score = 60;} // prevent from going back to previos level
      if(level_check == 11) {score = 600;}
      if(level_check == 1) { var max = 12; var min = 2;}
      if(level_check == 10 || level_check == 9) { var max = 30; var min = 2;}
      if(level_check == 9) level_check = 'reached 10';
      var rand1 = Math.random(),
          adad1_s = rand1 * (max-min) + min;
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * (max-min) + min;
          adad2 = parseInt(adad2_s.toFixed('0'),10);
      adad.adad1 = adad1;
      adad.adad2 = adad2;
      sum = adad1 + adad2;
      main_sum = sum;
      var rand_trueorfalse = Math.random(),
          trueorfalse_s = rand_trueorfalse * 29 + 10,
          trueorfalse = parseInt(trueorfalse_s.toFixed('0'),10);
         var rand_sum_change_val = Math.random(),
             sum_change_val_s = rand_sum_change_val * 3 + 1,
             sum_change_val = parseInt(sum_change_val_s.toFixed('0'));
         var rand_more_or_less = Math.random(),
           more_or_less_s = rand_more_or_less * 19 + 1,
           more_or_less = parseInt(more_or_less_s.toFixed('0'));
      var val_other1 = 2;
      var val_other2 = 1;
      var val_other3 = 2;
      var val_other4 = 1;
    } // Level 1 END
    if(score>=60 && score<120 || score>=480 && score<540)//Level 2 //Level9
    {
        if(level_check == 3) {score = 120;}
        if(level_check == 10) {score = 540}
        if(level_check == 16) {score = 900;}

        if(level_check == 9 || level_check == 8) { var max = 12; var min = 2;}
        if(level_check == 2 || level_check == 1) { var max = 12; var min = 2;}
        if(level_check == 1) level_check = 'reached 2';
        if(level_check == 8) level_check = 'reached 9';
        var rand1 = Math.random(),
            adad1_s = rand1 * (max-min) + min,
            adad1 = parseInt(adad1_s.toFixed('0'),10);
        var rand2 = Math.random(),
            adad2_s = rand2 * (max-min) + min,
            adad2 = parseInt(adad2_s.toFixed('0'),10);
       sum = adad1 + adad2;
       main_sum = sum;
       var rand_trueorfalse = Math.random(),
           trueorfalse_s = rand_trueorfalse * 29 + 10,
           trueorfalse = parseInt(trueorfalse_s.toFixed('0'),10);
       if(trueorfalse<20)
       {
         sum=sum;
       }
       else if(trueorfalse>20)
       {
          var rand_sum_change_val = Math.random(),
              sum_change_val_s = rand_sum_change_val * 3 + 1,
              sum_change_val = parseInt(sum_change_val_s.toFixed('0'));
          var rand_more_or_less = Math.random(),
            more_or_less_s = rand_more_or_less * 19 + 1,
            more_or_less = parseInt(more_or_less_s.toFixed('0'));
          if(more_or_less <= 10) // +
          {
            sum+=sum_change_val;
          }
          if(more_or_less > 10) // -
          {
            sum-=sum_change_val;
          }
      }
      var val_other1 = 2;
      var val_other2 = 1;
      var val_other3 = 2;
      var val_other4 = 1;
    }// Level 2 END
    if(score>=120 && score<180)//Level 3 // level14
    {
      if(level_check == 4) {score = 180;}
      if(level_check == 15) {score = 840;}
      if(level_check == 2) level_check = 'reached 3';
      if(level_check == 13) level_check = 'reached 14';
      var rand1 = Math.random(),
          adad1_s = rand1 * 10 + 2,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 10 + 2,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad1 - adad2;
     var val_other1 = 2;
     var val_other2 = 1;
     var val_other3 = 2;
     var val_other4 = 1;
    } // Level 3 END
    if(score>=180 && score<240)//Level 4
    {
      if(level_check == 5) {score = 240;}
      if(level_check == 3) level_check = 'reached 4';
      var rand1 = Math.random(),
          adad1_s = rand1 * 10 + 2,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 10 + 2,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
      var rand3 = Math.random(),
          adad3_s = rand3 * 10 + 2,
          adad3 = parseInt(adad3_s.toFixed('0'),10);
     sum = adad1 + adad2 + adad3;
     var val_other1 = 2;
     var val_other2 = 1;
     var val_other3 = 2;
     var val_other4 = 1;
   } // Level 4 END

    if(score>=240 && score<300 || score>=960 && score<1020)//Level 5 // level17
    {
      if(level_check == 6) {score = 300;}
      if(level_check == 18) {score = 1020;}
      if(level_check == 4) level_check = 'reached 5';
      if(level_check == 16) level_check = 'reached 17';
      if(level_check == 5 || level_check == 4) {var max= 10; var min = 2;}
      if(level_check == 17 || level_check == 16) {var max= 22; var min = 0;}
      var rand1 = Math.random(),
          adad1_s = rand1 * 10 + 2;
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 10 + 2;
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad1 * adad2;
     var val_other1 = 2;
     var val_other2 = 1;
     var val_other3 = 2;
     var val_other4 = 1;
   } // Level 5 END
   if(score>=300 && score<360)//Level 6 // which one is bigger 1
   {
     if(level_check == 7) {score = 360;}
     if(level_check == 12) {score = 660;}
     if(level_check == 6 || level_check == 5) {var max= 8; var min = 0;}
     if(level_check == 5) level_check = 'reached 6';
     var rand1 = Math.random(),
         adad1_s = rand1 * (max-min) + min,
         adad1 = parseInt(adad1_s.toFixed('0'),10);
     var rand2 = Math.random(),
         adad2_s = rand2 * (max-min) + min,
         adad2 = parseInt(adad2_s.toFixed('0'),10);
     var rand3 = Math.random(),
         adad3_s = rand3 * (max-min) + min,
         adad3 = parseInt(adad3_s.toFixed('0'),10);
     var rand4 = Math.random(),
         adad4_s = rand4 * (max-min) + min,
         adad4 = parseInt(adad4_s.toFixed('0'),10);
    sum_1 = adad1 + adad2;
    sum_2 = adad3 + adad4;
  } // Level 6 END

   /*if(score>=300 && score<360 || score>=600 && score<660)//Level 6 // sum and multiplication // level 11
   {
     if(level_check == 7) {score = 360;}
     if(level_check == 12) {score = 660;}
     if(level_check == 6 || level_check == 5) {var max= 8; var min = 0;}
     if(level_check == 11 || level_check == 10) {var max= 20; var min = 0;}
     if(level_check == 5) level_check = 'reached 6';
     if(level_check == 10) level_check = 'reached 11';
     var rand1 = Math.random(),
         adad1_s = rand1 * (max-min) + min,
         adad1 = parseInt(adad1_s.toFixed('0'),10);
     var rand2 = Math.random(),
         adad2_s = rand2 * (max-min) + min,
         adad2 = parseInt(adad2_s.toFixed('0'),10);
     var rand3 = Math.random(),
         adad3_s = rand3 * (max-min) + min,
         adad3 = parseInt(adad3_s.toFixed('0'),10);
    sum = adad1 * adad2 + adad3;
    var val_other1 = 2;
    var val_other2 = 1;
    var val_other3 = 2;
    var val_other4 = 1;
  } // Level 6 END*/
  if(score>=360 && score<420 || score>=660 && score<720)//Level 7 // level 12
  {
    if(level_check == 8) {score = 420;}
    if(level_check == 13) {score = 720;}
    if(level_check == 7 || level_check == 6){var max = 10; var min = 0;}
    if(level_check == 12 || level_check == 11){var max = 20; var min = 0;}
    if(level_check == 6) level_check = 'reached 7';
    if(level_check == 11) level_check = 'reached 12';
    var rand1 = Math.random(),
        adad1_s = rand1 * (max-min) + min,
        adad1 = parseInt(adad1_s.toFixed('0'),10);
    var rand2 = Math.random(),
        adad2_s = rand2 * (max-min) + min,
        adad2 = parseInt(adad2_s.toFixed('0'),10);
    var rand3 = Math.random(),
        adad3_s = rand3 * (max-min) + min,
        adad3 = parseInt(adad3_s.toFixed('0'),10);
    var rand_format = Math.random(),
        format_s = rand_format * 3 + 1;
        format = parseInt(format_s.toFixed('0'),10);    // which format the number will have
    switch(format)
    {
      case 1 : sum = adad1 - adad2 + adad3; break;
      case 2 : sum = adad1 + adad2 - adad3; break;
      case 3 : sum = adad1 + adad2 + adad3; break;
      case 4 : sum = adad1 - adad2 - adad3; break;
    }
   var val_other1 = 2;
   var val_other2 = 1;
   var val_other3 = 2;
   var val_other4 = 1;
  } // Level 7 END
  if(score>=420 && score<480 || score>=900 && score<960)//Level 8 - Division //level 16
  {
    if(level_check == 8 || level_check == 7){var max = 10; var min = 1;}
    if(level_check == 16 || level_check == 15){var max = 20; var min = 1;}
    if(level_check == 9) {score = 480;}
    if(level_check == 17) {score = 960;}
    if(level_check == 7) level_check = 'reached 8';
    if(level_check == 15) level_check = 'reached 16';

      var rand1 = Math.random(),
          adad1_s = rand1 * (max-min) + min;
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * (max-min) + min;
          adad2 = parseInt(adad2_s.toFixed('0'),10);

   res = adad1*adad2; // it will multiplicate the two number and in next satement the result will divided to one of numbers
   sum = res / adad2;
   var val_other1 = 2;
   var val_other2 = 1;
   var val_other3 = 2;
   var val_other4 = 1;
  } // Level 8 END

  if(score>=720 && score<780)//Level 13 - minus and multiplication and sum
  {
    if(level_check == 14) {score = 780;}
    if(level_check == 12) level_check = 'reached 13';
      var rand1 = Math.random(),
          adad1_s = rand1 * 9 + 1;
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 9 + 1;
          adad2 = parseInt(adad2_s.toFixed('0'),10);
    var rand3 = Math.random(),
        adad3_s = rand3 * 9 + 1;
        adad3 = parseInt(adad3_s.toFixed('0'),10);
  var rand_format = Math.random(),
      format_s = rand_format * 1 + 1;
      format = parseInt(format_s.toFixed('0'),10);    // which format the number will have
  switch(format)
  {
    case 1 : sum = adad1 * adad2 * adad3; break;
    case 2 : sum = adad1 + adad2 + adad3; break;
  }
   var val_other1 = 2;
   var val_other2 = 1;
   var val_other3 = 2;
   var val_other4 = 1;
  } // Level 13 END*/

   if(score>=600 && score<660)//Level 11 // which one is bigger 2
   {
     if(level_check == 12) {score = 660;}
     if(level_check == 11 || level_check == 10) {var max= 9; var min = 1;}
     if(level_check == 10) level_check = 'reached 11';
     var rand1 = Math.random(),
         adad1_s = rand1 * (max-min) + min,
         adad1 = parseInt(adad1_s.toFixed('0'),10);
     var rand2 = Math.random(),
         adad2_s = rand2 * (max-min) + min,
         adad2 = parseInt(adad2_s.toFixed('0'),10);
     var rand3 = Math.random(),
         adad3_s = rand3 * (max-min) + min,
         adad3 = parseInt(adad3_s.toFixed('0'),10);
     var rand4 = Math.random(),
         adad4_s = rand4 * (max-min) + min,
         adad4 = parseInt(adad4_s.toFixed('0'),10);
    sum_1 = adad1 * adad2;
    sum_2 = adad3 * adad4;
  } // Level 11 END

  if(score>=780 && score<840)//Level 14 - correct incorrect
  {
      if(level_check == 15) {score = 840;}
      if(level_check == 13) level_check = 'reached 14';
      var max = 10;
      var min = 0;
      var rand1 = Math.random(),
          adad1_s = rand1 * (max-min) + min,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * (max-min) + min,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad2 - adad1;
     main_sum = sum;
     var rand_trueorfalse = Math.random(),
         trueorfalse_s = rand_trueorfalse * 29 + 10,
         trueorfalse = parseInt(trueorfalse_s.toFixed('0'),10);
     if(trueorfalse<20)
     {
       sum=sum;
     }
     else if(trueorfalse>20)
     {
        var rand_sum_change_val = Math.random(),
            sum_change_val_s = rand_sum_change_val * 3 + 1,
            sum_change_val = parseInt(sum_change_val_s.toFixed('0'));
        var rand_more_or_less = Math.random(),
          more_or_less_s = rand_more_or_less * 19 + 1,
          more_or_less = parseInt(more_or_less_s.toFixed('0'));
        if(more_or_less <= 10) // +
        {
          sum+=sum_change_val;
        }
        if(more_or_less > 10) // -
        {
          sum-=sum_change_val;
        }
    }
    var val_other1 = 2;
    var val_other2 = 1;
    var val_other3 = 2;
    var val_other4 = 1;
  }// Level 14 END
  if(score>=840 && score<900)//Level 15 - correct incorrect - multiplication
  {
      if(level_check == 15) {score = 840;}
      if(level_check == 14) level_check = 'reached 15';
      var max = 10;
      var min = 1;
      var rand1 = Math.random(),
          adad1_s = rand1 * (max-min) + min,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * (max-min) + min,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad1 * adad2;
     main_sum = sum;
     var rand_trueorfalse = Math.random(),
         trueorfalse_s = rand_trueorfalse * 29 + 10,
         trueorfalse = parseInt(trueorfalse_s.toFixed('0'),10);
     if(trueorfalse<20)
     {
       sum=sum;
     }
     else if(trueorfalse>20)
     {
        var rand_sum_change_val = Math.random(),
            sum_change_val_s = rand_sum_change_val * 3 + 1,
            sum_change_val = parseInt(sum_change_val_s.toFixed('0'));
        var rand_more_or_less = Math.random(),
          more_or_less_s = rand_more_or_less * 19 + 1,
          more_or_less = parseInt(more_or_less_s.toFixed('0'));
        if(more_or_less <= 10) // +
        {
          sum+=sum_change_val;
        }
        if(more_or_less > 10) // -
        {
          sum-=sum_change_val;
        }
    }
    var val_other1 = 2;
    var val_other2 = 1;
    var val_other3 = 2;
    var val_other4 = 1;
  }// Level 14 END
  level_reach_return();
  var which_answ_rand = Math.random(), // find a random answer block 1 or 2 or 3 or 4
      which_answ_s = which_answ_rand * 3 + 1 ,
      which_answ = parseInt(which_answ_s.toFixed('0'),10);
    if(level_check != 2 && level_check != 9 && level_check != 14 && level_check != 15) //cuz in level2,9 in answ li true or false is writen
    {
    var li = $('ul li');
    switch(which_answ)//Write sum to which_answ li
    {
      case 1 : $(li[0]).html(sum);  break;
      case 2 : $(li[1]).html(sum);  break;
      case 3 : $(li[2]).html(sum);  break;
      case 4 : $(li[3]).html(sum);  break;
    }
    }
    if(level_check != 2 && level_check != 9 && level_check != 14 && level_check != 15) //cuz in level2,9 in answ li true or false is writen
    {
  var other =[];
  for(i=0; i<=3 ; i++)//write other li
  {
    if(i+1 === which_answ)
    {
        continue;
    }

    other[0]= sum + val_other1;
    other[1]= sum - val_other2;
    other[2]= sum - val_other3;
    other[3]= sum + val_other4;
    $(li[i]).text(other[i]);
  }
  }
  switch(level_check)//check wether to show + or - .. actully check current level then decides!
  {
    case 10 :
    case 1: var question = adad2 + ' + ' + adad1; break;

    case 9:
    case 2: var question = sum + ' = ' + adad1 + ' + ' + adad2;
            break;

    case 3: var question = adad2 + ' - ' + adad1;
            break;

    case 4: var question = adad3 + '+' + adad2 + '+' + adad1;
            break;
    case 5: var question = adad2 + ' × ' + adad1;
            break;
    //case 11 :
    //case 6: var question = adad3 + ' + ' + adad2 + ' × ' + adad1;
            //break;
    case 12 :
    case 7 : switch(format)
              {
                case 1 : var question = adad1 + '-' + adad2 + '+' + adad3; break;
                case 2 : var question = adad1 + '+' + adad2 + '-' + adad3; break;
                case 3 : var question = adad1 + '+' + adad2 + '+' + adad3; break;
                case 4 : var question = adad1 + '-' + adad2 + '-' + adad3; break;
              }
              break;
    case 8: var question = adad2 + ' ÷ ' + res; break;
    case 13 : switch(format)
              {
                case 1 : var question = adad1 + '*' + adad2 + '*' + adad3; break;
                case 2 : var question = adad1 + '+'+  adad2 + '+' + adad3; break;
              }
              break;
    case 14 : var question = sum + ' = ' + adad1 + ' - ' + adad2;
            break;
    case 15 : var question = sum + ' = ' + adad1 + ' x ' + adad2;
                break;

  }
  $('#question').text(question);

  if(level_check === 6) //Right Left Equal
  {
    question1 = adad1 + ' + ' + adad2;
    question2 = adad3 + ' + ' + adad4;
    $('#question').text(question1);
    $('#question2').text(question2);
  }
  if(level_check === 11) //Right Left Equal 2
  {
    question1 = adad1 + ' ✘ ' + adad2;
    question2 = adad3 + ' ✘ ' + adad4;
    $('#question').text(question1);
    $('#question2').text(question2);
  }
  console.log('sum1 : ' + ' : ' + sum_1 +' sum2 : '+sum_2 + '  |  ' + which_answ + ' | Lev : ' + level_check +
  ' | Corrects : ' + corrects + ' | Wrongs :' + wrongs);
}

cur=0;
live =5;
count_wrongs_selection = 0
function result() //User Answer Check
{
  var li = $('ul li');

  for(i=0; i<li.length;i++)
  {
    if($(li[i]).css('color') === 'red')
    {
      continue;
    }
    $(li[i]).css({'color':'black','border':'3px solid #3a3535'});
  }

  var selected = $(this).text();
  if(selected == sum)
  {
    var sound = document.getElementById('success_sound');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    var thisss= $(this);
    thisss.css({'backgroundColor':'#1ce684'});
    setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
    count_wrongs_selection = 0;
    $('ul li').css({'textDecoration':'none'});
    math();

    if($('#rad_hard:checked').val()) // check hardness settings
    {
      reward_Time = 1;
      reward_Score = 6;
    }
    if($('#rad_medium:checked').val())
    {
      reward_Time = 2;
      reward_Score = 4;
    }
    if($('#rad_easy:checked').val())
    {
      reward_Time = 3;
      reward_Score = 1;
    }
    corrects++;
  /*switch(level_check)
    {
      case 1 :  reward_Time_final=reward_Time; reward_Score_final=reward_Score; break;
      case 3 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+); break;
      case 4 :  reward_Time_final=reward_Time; reward_Score_final=(reward_Score); break;
      case 5 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score); break;
      case 6 :  reward_Time_final=reward_Time; reward_Score_final=(reward_Score+4); break;
      case 7 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+5); break;
      case 8 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+6); break;
      case 9 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+6); break;
      case 10 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+6); break;
      case 11 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+6); break;
      case 12 :  reward_Time_final=(reward_Time); reward_Score_final=(reward_Score+6); break;
    }*/
    reward_Time_final=reward_Time; reward_Score_final=reward_Score;
    sec += reward_Time_final;
    score += reward_Score_final;
    add_score_reward_status_bar('plus',reward_Score_final);
  }
  else
  {
    var sound = document.getElementById('error_sound');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    $(this).css({'color':'red','textDecoration':'line-through','border':'3px dashed red'});+
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    cur = $('#question').text(); //get current qustion
    $('#question').text('اشتباه');
    popup(Text.wrong,
    'ادامه','no',27);
    wrongs_array.push(cur);
    sum_of_wrong_array.push(sum);
    selected_wrong_array.push(selected);
    wrongs++;
    score-=10;
    live--;
    add_score_reward_status_bar('minus',10);
  }

  live_run_out();
  $('#score').text(score);
  $('#live').text(live);
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger').html('');
  switch(level_check)
  {
    case 1 : percent = ((score-0)/60)*100; progress_bar.html('مرحله 1').append(' (' + score + ' <span class="glyphicon glyphicon-star">' + ')'); break;
    case 3 : percent = ((score-120)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 3').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 4 : percent = ((score-180)/60)*100; progress_bar.addClass('progress-bar-active').html('مرحله 4').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 5 : percent = ((score-240)/60)*100; progress_bar.addClass('progress-bar-danger').html('مرحله 5').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 6 : percent = ((score-300)/60)*100; progress_bar.addClass('progress-bar-success').html('مرحله 6').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 7 : percent = ((score-360)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 7').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 8 : percent = ((score-420)/60)*100; progress_bar.addClass('progress-bar-warning').html('مرحله 8').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 10 : percent = ((score-540)/60)*100; progress_bar.addClass('progress-bar-danger').html('مرحله 10').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 11 : percent = ((score-600)/60)*100; progress_bar.addClass('progress-bar-success').html('مرحله 11').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 12 : percent = ((score-660)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 12').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 13 : percent = ((score-720)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 13').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 14 : percent = ((score-780)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 14').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 15 : percent = ((score-840)/60)*100; progress_bar.addClass('progress-bar-info').html('مرحله 15').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
  }
  progress_bar.css('width',percent+'%');
  $('#score_progress').html(score);
}

function true_false() {

  console.log('sum : ' + sum + '  main_sum' + main_sum + '  level :' + level_check);
  var selected = $(this).index();
  cur = $('#question').text();
  if(selected == 0) //correct
  {
    if(sum == main_sum)
    {

      var sound = document.getElementById('success_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      var thisss= $(this);
      thisss.css({'backgroundColor':'#1ce684'});
      setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
      math();
      score+=4;
      add_score_reward_status_bar('plus',3);
      sec+=1.5;
    }
    else if(sum != main_sum)
    {
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('عبارت نادرست بود' + '<br>',
    'سوال بعدی','next_question_true_false_btn');
      score-=10;
      add_score_reward_status_bar('minus',10);
      live--;
      wrongs_array.push(cur);
      sum_of_wrong_array.push('<span style="font-size:90%;" class="glyphicon glyphicon-remove"></span>');
      selected_wrong_array.push('<span style="font-size:90%;" class="glyphicon glyphicon-ok"></span>');
    }
  }

  if(selected == 1) //wrong
  {
    if(sum == main_sum)
    {
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('عبارت درست بود' + '<br>',
    'سوال بعدی','next_question_true_false_btn');
      score-=10;
      add_score_reward_status_bar('minus',10);
      live--;
      wrongs_array.push(cur);
      sum_of_wrong_array.push('<span style="font-size:90%;" class="glyphicon glyphicon-ok"></span>');
      selected_wrong_array.push('<span style="font-size:90%;" class="glyphicon glyphicon-remove"></span>');
    }
    else if(sum != main_sum)
    {
      var sound = document.getElementById('success_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      var thisss= $(this);
      thisss.css({'backgroundColor':'#1ce684'});
      setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
      math();
      score+=4;
      add_score_reward_status_bar('plus',3);
      sec+=1.5;
    }
    live_run_out();
  }
  $('#score').html(score);
  $('#live').html(live);
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger').html('');
  percent = ((score-60)/60)*100; progress_bar.addClass('progress-bar-success').html('مرحله 2').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')');
  progress_bar.css('width',percent+'%');
  $('#score_progress').html(score);
}

function which_is_bigger () {
  var selected = $(this).index();
  if(selected === 0) //right
  {
    if(sum_1>sum_2)
    {
      //correct
      var thisss= $(this);
      thisss.css({'backgroundColor':'#1ce684'});
      setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
      score+=3;
      add_score_reward_status_bar('plus',3);
      sec+=1.5;
      math();
    }
    else if(sum_1<sum_2)
    {
      //wrong - its left
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'عبارت سمت چپ بزرگتر بود' + '<br>' + question1 + '<span style="color:green;"> < </span>' + question2,
    'ادامه','next_question_true_false_btn',20);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' > ');
    selected_wrong_array.push(' < ');

    }
    else if(sum_1===sum_2)
    {
      //wrong - its equal
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'دو عبارت مساوی بودند' + '<br>' + question1 + '<span style="color:green;"> = </span>' + question2,
    'ادامه','next_question_true_false_btn',20);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' = ');
    selected_wrong_array.push(' < ');

    }
  }
  if(selected === 1) //left
  {
    if(sum_1<sum_2)
    {
      //correct
      var sound = document.getElementById('success_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      var thisss= $(this);
      thisss.css({'backgroundColor':'#1ce684'});
      setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
      score+=3;
      add_score_reward_status_bar('plus',3);
      sec+=1.5;
      math();
    }
    else if(sum_1>sum_2)
    {
      //wrong -- its right
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'عبارت سمت راست بزرگتر بود' + '<br>' + question1 + '<span style="color:green;"> > </span>' + question2,
    'ادامه','next_question_true_false_btn',25);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' < ');
    selected_wrong_array.push(' > ');
    }
    else if(sum_1===sum_2)
    {
      //wrong- its equal
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'دو عبارت مساوی بودند' + '<br>' + question1 + '<span style="color:green;"> = </span>' + question2,
    'ادامه','next_question_true_false_btn',20);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' = ');
    selected_wrong_array.push(' > ');
    }
  }
  if(selected === 2) //equal selected
  {
    if(sum_1===sum_2)
    {
      //correct
      var sound = document.getElementById('success_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      var thisss= $(this);
      thisss.css({'backgroundColor':'#1ce684'});
      setTimeout(function(){thisss.css({'backgroundColor':'#fff'});},250);
      score+=3;
      add_score_reward_status_bar('plus',3);
      sec+=1.5;
      math();
    }
    else if(sum_1>sum_2)
    {
      //wrong -- its right
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'عبارت سمت راست بزرگتر بود' + '<br>' + question1 + '<span style="color:green;"> > </span>' + question2,
    'ادامه','next_question_true_false_btn',20);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' < ');
    selected_wrong_array.push(' = ');
    }
    else if(sum_1<sum_2)
    {
      //wrong --its left
      var sound = document.getElementById('error_sound');
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      popup('اشتباهه.'+'<br>'+'عبارت سمت چپ بزرگتر بود' + '<br>' + question1 + '<span style="color:green;"> < </span>' + question2,
    'ادامه','next_question_true_false_btn',20);
    wrongs_array.push(question1 + ' و ' +question2);
    sum_of_wrong_array.push(' > ');
    selected_wrong_array.push(' = ');
    }
  }
}
function Timer ()
{
  sec--;
  $('#sec').text(sec.toFixed('0'));
  if(sec<5)
  {
    var time_sec = $('#sec,#ms');
    time_sec.css({'color':'red'});
  }
  else
  {
    var time_sec = $('#sec,#ms');
    time_sec.css('color','green');
  }

  if(sec<=0)
  {
    sec = 0;
    ms = 0;
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    console.log(score + ' | ' + record);
    if(score>=record)
    {
      pre_record = record;

      record = score ;
      window.localStorage.setItem("record_math",record);
      records_array.push(record);
      var record_changed = 'yes';
    }
    if(record_changed == 'yes')
    {
      var record_success = '<br><span style="color:purple;">'+'رکورد قبلیت رو شکوندی !'+'</span>';
    }
    else
    {
      var record_success = '';
    }
    var sound = document.getElementById('fail_sound');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
     popup('<span style="font-size:125%"><span class="glyphicon glyphicon-time"></span><br>'+'زمان شما به پایان رسید' +'<br>'+'امتیاز : '+'<span id="score_end"></span>'+ '<br>' + 'بیشترین رکورد : ' + record +
     '' + record_success + '<br> <img id="start_first_popup_btn" src="img/restart.png" style="width:41px; height:41px; margin-top:20px; margin-bottom:30px;"></img>'+
     '<br><button type="button" class="btn btn-danger btn-lg" style="margin-bottom:5px;" id="continue_time">'+'ادامه میدی؟ (دو <span class="glyphicon glyphicon-heart" ></span> میگیرم)'+'</button>'+
     '<br><input type="button" value="آنالیز  شما" id="analyse" class="btn btn-info btn-lg">  '+
     '<input type="button" value="ثبت رکورد" id="record_save_btn" class="btn btn-success btn-lg"> </span>',
     'no','no',15);
    score_end_interval = setInterval(score_end,15);
    $('#ms').text('0');
  }
}
ms = 100;
function millisec() {
  ms--;
  $('#ms').text(ms);
  ms = (ms<0)? 100 : ms;
}

function popup(text,button_val,button_id,top) {
  if(top && typeof top == 'number')
  {
    if(top)
    {
    $('.popup_box').css({'top':top+'%'});
    }
  }
  else //if is undefined
  {
    $('.popup_box').css({'top':'20'});
  }
  var popupbox = $('.popup_box');
  if(text  && typeof text == 'string')
  {
  popupbox.html(text);
  $('.popup_back,.popup_box').fadeIn(100);
  }
  if(button_val && typeof button_val == 'string')
  {
    if(button_val != 'no')
    {
      popupbox.append('<br><button type="button" class="btn btn-warning" id="close_popup_btn"><span id="close_popup_btn_span"></span></button>');
      $('#close_popup_btn').html(button_val);
    }
  }

  if(button_id && typeof button_id == 'string')
  {
    if(button_id != 'no')
    {
      $('#close_popup_btn').attr('id',button_id);
    }
  }
}
function popupclose () {
  $('#question').text(cur);
  $('.popup_back,.popup_box').hide();
  clearInterval(sec_interval);
  clearInterval(ms_interval);
  sec_interval = setInterval(Timer,1000);
  ms_interval = setInterval(millisec,10);
}
function just_closepopup(){
  var this_btn = $(this);
  this_btn.parent().fadeOut(250);
  this_btn.parent().parent().find('.popup_back').hide();
}
function next_level () {
  $('.popup_back,.popup_box').hide();
  clearInterval(sec_interval);
  clearInterval(ms_interval);
  sec_interval = setInterval(Timer,1000);
  ms_interval = setInterval(millisec,10);
}
function start_first () { // start again when game overed
  percent=0;
  var sound = document.getElementById('start_sound');
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  $('#question').css('fontSize','500%');
  $('#question2').hide();
  $('#answ_ul').show();
  $('#answ_bigger_ul').hide();
  if(level_check == 2)
  {
    $('#answ3,#answ4').show();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',result);
  }
  $('#math_screen').css('backgroundColor','#ae249c');
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger');
  progress_bar.css('width','0%');
  clearInterval(score_end_interval);
  to_score = 0;
  $('#answ_sec ul li').css({'textDecoration':'none','color':'black','backgroundColor':'#fff','border':'3px solid #3a3535'}).show();
  count =0;
  wrongs = 0;
  corrects = 0;
  $('#score').text('0'); score=0;
  $('#live').text('5'); live=5;
  level_check = 1;
  wrongs_array = [];
  sum_of_wrong_array= [];
  selected_wrong_array= [];
  popupclose();
  math();
  sec= 5;
  ms=100;
  Timer();
  clearInterval(sec_interval);
  clearInterval(ms_interval);
  sec_interval = setInterval(Timer,1000);
  ms_interval = setInterval(millisec,10);
}
$('#sec').text('0');$('#ms').text('0');

function make_vertical_question() {
  var question = $('#question');
  cur_state_question = {lineHeight :question.css('lineHeight')};
  question.html(adad.adad1 + '<br>+<br>' + adad.adad2).css({'lineHeight':'53px',});
  question.off('click').on('click',make_horizontal_question);
 }
function make_horizontal_question() {
  var question = $('#question');
  question.html(adad.adad2 + ' + ' + adad.adad1).css({'lineHeight':cur_state_question.lineHeight,});
  question.off('click').on('click',make_vertical_question);
}
function analyse() {
  var ana = '';
  var analyse = '';
  cur_end_text = $('.popup_box').html();
  if(count>=7)
  {
  /*  if(score<=pre_record)
    {
      var change_record = score - pre_record;
      var progress_percent = change_record/record * 100; //progress whit prev values 100plus
      record_show_final = record;
    }*/
    //if(score>pre_record)
    //{
      var change_record = score - pre_record;
      var progress_percent = change_record/record * 100;
      var progress_percent_two_decimal =  progress_percent.toFixed('2');
      record_show_final = pre_record; //progress whit prev values 100plus.
      pre_record  = record;
  //  }
    //var progress_percent_under_hundred = progress_percent.toFixed('0') - 100; //progress whit prev values 100plus
    if(score>pre_record)
    {
      var verb = 'صعود کرده اید';
    }
    if(score<pre_record)
    {
      var verb = 'سقوط کرده اید';
    }
    analyse = '<span style="color:purple; font-weight:bold; font-size:120%;">آنالیز</span><br>'
    + 'شما از ' + count + ' سوال پرسیده شده ' + wrongs + ' بار اشتباه پاسخ داده اید' + '<br>' +
    '<input type="button" value="نمایش غلط های شما" id="show_wrong_btn" class="btn btn-danger ">'+
    '<hr>' + ' از رکورد ' +'<span style="color:brown;">'+ record_show_final + '</span>' + ' به امتیاز' + '<span style="color:brown;">' +  score + '</span>' + verb + '<br><span style="color:purple;"> درصد پیشرفت : </span>'+
    '<br><span style="margin:0; padding:0;color:purple; direction:ltr;">'+ progress_percent_two_decimal +' % </span>' ;
    }
  if(count<7)
  {
    analyse = 'برای آنالیز دقیق باید به سوالات بیشتری جواب داده باشید. لطفا حد اقل به '+
    (7-count) + ' سوال دیگر نیز پاسخ دهید';
  }
  popup('<span style="font-size:120%">' + analyse + '</span>','<span class="glyphicon glyphicon-arrow-left">','back_btn_analyse',10);
}
function show_wrongs()
{
  var result = '';
  if(wrongs_array.length>0)
  {
    for(i=0 ; i < wrongs_array.length ; i++)
    {
      result +=sum_of_wrong_array[i]+'<span style="color:green;"> ⇨ </span>' +selected_wrong_array[i]+ '<span style="color:red;"> ≠ </span>' + wrongs_array[i]+'<br>';
    }

    popup('<span>غلط ها</span><br><span style="font-size:120%; overflow-y: scroll; max-height:85%;">' + result + '</span>','<span class="glyphicon glyphicon-arrow-left">','back_btn_analyse');
  }
  else if(wrongs_array.length>=0)
  {
    popup('<span style="font-size:120%">'+'آفرین! هیچ غلطی نداشتی'+'</span>'
  ,'<span class="glyphicon glyphicon-arrow-left">', 'back_btn_analyse');
  }
}


function add_score_reward_status_bar(kind,val) {
  if(kind === 'plus')
  {
    $('#reward_score_span').hide(0,function(){
      $('#score').hide();
      $('#reward_score_span').html('+' + val).css('color','green').show(500,function(){
        $('#reward_score_span').delay(100).html('');
        $('#score').show();
      });
    });
  }
  if(kind === 'minus')
  {
    $('#reward_score_span').hide(0,function(){
      $('#score').hide();
      $('#reward_score_span').html(val.toString()+'-').css('color','red').show(500,function(){
        $('#reward_score_span').delay(100).html('');
        $('#score').show();
      });
    });
  }
}
function setCookies(cookie_name,cookie_value,expire_days) {
  var date = new Date();
  date.setTime(date.getTime() + (expire_days*24*60*60*1000)); //days must be converted to milliseconds
  var expire_date = date.toUTCString(); // milliseconds to UTC string
  document.cookie = cookie_name + '=' + cookie_value + '; ' + 'expires=' + expire_date;
}
function getCookies(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function pause(pause_or_resume) {
  if(pause_or_resume==false)
  {
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    cur = $('#question').text();
    $('#question').css({'fontSize':'300%'}).text('بازی متوقف شده.');
    $('body').off('click','#pause').on('click','#pause',function(){pause(true);});
    $('#pause').html('<span class="glyphicon glyphicon-play"></span>');
    $('ul li').hide();
  }
  if (pause_or_resume==true)
  {
    var question = $('#question');
    question.fadeOut(250,function(){
      question.delay(500).text('آماده ؟').fadeIn(255,function(){
        question.delay(500).fadeOut(250,function(){
          question.delay(500).text('3').fadeIn(250,function(){
            question.delay(500).fadeOut(250,function(){
              question.delay(500).text('2').fadeIn(250,function(){
                question.delay(500).fadeOut(250,function(){
                  question.delay(500).text('1').fadeIn(250,function(){
                    question.delay(500).fadeOut(250,function(){
                      question.fadeIn(250).css({'fontSize':'500%'}).text(cur);
                      sec_interval = setInterval(Timer,1000);
                      ms_interval = setInterval(millisec,10);
                      $('body').on('click','#pause',function(){pause(false);});
                      $('#pause').html('<span class="glyphicon glyphicon-pause"></span>').show();
                      if(level_check != 2 && level_check != 9 && level_check != 15)$('ul li').show();
                      else{$('#answ1,#answ2').show();}
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    $('body').off('click','#pause');
    $('#pause').hide();
    //$('#question').css({'fontSize':'350%'}).text(cur);

  }
}

function score_end() {
    if(score>=0)
    {
      if(to_score != score)
      {
        to_score++;
        $('#score_end').text(to_score);
      }
      if(to_score == score)
      {
        clearInterval(score_end_interval);
        $('#score_end').text(score);
      }
    }

    if(score<0)
    {
      if(to_score != score)
      {
        to_score--;
        $('#score_end').text(to_score);
      }
      if(to_score == score)
      {
        clearInterval(score_end_interval);
        $('#score_end').text(score);
      }
    }

}
function record_btn() {
  cur_end_text = $('.popup_box').html();
  var check_login = window.localStorage.getItem('loged-in');
  if(check_login == 'true')
  {
    var username = window.localStorage.getItem('username');
    if(level_check !== 0)
    {
      popup('ارسال رکورد'+'<br>'+'<span style="color:brown; font-weight:bold;">' + username +'</span>'+' عزیز برای ثبت رکورد خود دکمه ارسال را انتخاب نمایید'+'<br>'+
      'رکورد الان شما : ' + record +'<br>'+
      '<input type="button" value="ارسال" id="send_record_btn" class="btn btn-primary btn-lg">');
    }
    else if(level_check == 0)
    {
      popup('<span style="color:purple; font-weight:bold;">پروفایل شما</span>'+'<hr>'+ 'شما با نام کاربری ' +'<span style="color:brown; font-weight:bold;">' + username +'</span>'+' وارد شده اید '+ '<br>'+
      'بیشترین رکورد شما : ' + record + '<br> ' + 'برای خارج شدن از بازی خروج را بفشارید<br>'+
      '<input type="button"  value="خروج" id="log_out" onclick="logout(1)" class="btn btn-danger btn-lg">'+
      ' <input type="button"  value="ثبت رکورد" id="send_record_btn" class="btn btn-success btn-lg">'+
      '<br><button type="button" class="btn btn-warning" id="close_loged_in_btn"><span class="glyphicon glyphicon-remove"></span></button>','no','no',10);
    }

  }
  else
  {
    if(level_check != 0)
    {
      popup(Text.signup_screen,'no','no',12); //signup screen content
    }
    else if(level_check == 0)
    {
      popup(Text.signup_screen_main_page,'no','no',12); //signup screen content // for main page btn
    }
  }

}
var check = '';
function save_record(how) {
  if(how == 'update_record')
  {
    record = record;
    var username = window.localStorage.getItem('username');
    $.post('http://heavenr.ir/php/update_record.php',{'username':username,'record':record},function(data){
      popup(data,'نمایش رکورد ها ','best_records_btn');
    });
  }
  if(how == 'login_and_send')
  {
    record = record;
    var username = window.localStorage.getItem('username');
    $.post('http://heavenr.ir/php/update_record.php',{'username':username,'record':record},function(data){
      popup('وارد شدید'+ '<br>' + data +'<br>'+ 'رکورد شما : '+ record
      ,'نمایش رکورد ها ','best_records_btn');
    });
  }
  if(how == 'signup_and_send')
  {
    record = record;
    var name_signup =$('#name_text').val();
    var pass_signup =$('#pass_text').val();
    var pass_signup_repeat =$('#pass_text_repeat').val();
    $('#error_screen_signup').html('').hide();
    if(name_signup)
    {
        if(pass_signup)
        {
          if(pass_signup === pass_signup_repeat)
          {
            $.post('http://heavenr.ir/php/signup.php',{'name_signup':name_signup, 'pass_signup':pass_signup,'record':record},function(data){
              if(data == 1) {$('#error_screen_signup').html('<br>'+'این نام قبلا اسفاده شده').show();}
              if(data == 2) {
                popup('ارسال شد','نمایش رکورد ها ','best_records_btn');

                window.localStorage.setItem('loged-in','true');
                window.localStorage.setItem('username',name_signup);}
            });

          }
          else
          {
            $('#error_screen_signup').append('رمز عبور و تکرارش یکی نیست').show();
          }
        }
        else
        {
          $('#error_screen_signup').append('رمز عبور را وارد کنید').show();
        }

    }
    else if(!name_signup)
    {
      $('#error_screen_signup').append('نام کاربری را وارد کنید').show();
    }
  }
}
function show_best_records (period) {
    var username = window.localStorage.getItem('username');
    if(period == 'total')
    {
      $('#start_btn').off('click');
      $('#math_screen').fadeOut(500);
      $.post('http://heavenr.ir/php/get_records.php',{'username':username},function(data){
          $('#bestrecord_screen').fadeIn(500).css('backgroundColor','rgb(182, 156, 88)');

        $('#tbody').html(data);
      });
    }
    if(period == 'today')
    {
      $.post('http://heavenr.ir/php/get_records_today.php',{'username':username},function(data){
        $('#tbody').html(data);
      });
    }
}

function go_first_screen() {
    level_check = 0;
    $('#bestrecord_screen').hide();
    $('#quest_sec,#answ_sec').hide();
    $('#math_screen').fadeIn().css('backgroundColor','#2b3e4d');
    $('#start_btn').one('click',ready).show();
    $('#start_btn_span').css({'fontSize':'100%'}).text('شروع');
    $('#best_records_btn_main,#cur_record').show();
    $('#license,.title,#user,#setting,#purchase_main_btn').show();
    $('#credit').show();
}

function login (job) {
  if(job == 'login_screen')
  {
    popup(Text.login_screen,'no','no',15); //login screen content
  }

  if(job == 'login_btn')
  {
    var username = $('#name_text').val();
    var password = $('#pass_text').val();
    if(username)
    {
      if(password)
      {
        $.post('http://heavenr.ir/php/login.php',{'username':username,'password':password},function(data){
          console.log(data);
          if(data)
          {
            if(data>=record)
            {
              record = data;
              popup('وارد شدید' +
              '<br>'+ 'رکورد شما : ' + record,'نمایش رکورد ها ','best_records_btn');
            }
            if(data<record) //in this state login popup will be displayed just after sending new record to server
            {
              save_record('update_record');
            }
            $('#cur_record').html('رکورد کنونی : ' +record);
            $('#score').html(' '+record);

            window.localStorage.setItem("record_math", record);

            window.localStorage.setItem("loged-in", "true");

            window.localStorage.setItem("username",username);
          }
          if(!data)
          {
            $('#error_screen_login').html('نام کاربری یا رمز عبور ناردست است').show();
            $('#doـsign_up_question_btn').on('click',record_btn).show();
          }
        });
      }
      else
      {
        $('#error_screen_login').html('پسورد را وارد کنید').show();
      }

    }
    else
    {
        $('#error_screen_login').html('نام کاربری را وارد کنید').show();
    }

  }

 }

function logout(stage) {
  if(stage === 1)
  {
    popup('آیا برای خروج مطمينید؟ <br> ' + 'رکورد کنونی شما حذف خواهد شد... <br>با ورود مجدد به بازی رکوردتان از سرور دریافت خواهد شد<br> <button type="button" onclick="logout(2)" class="btn btn-danger btn-lg">خروج</button>')
  }
  if(stage === 2)
  {
     window.localStorage.setItem('loged-in','false');
     window.localStorage.removeItem('record_math');
     window.localStorage.removeItem('username');
     record = 0;
     $('#score').text('0');
     $('#cur_record').text('هنوز رکوردی ثبت نشده است');
     $('.popup_box,.popup_back').hide();
     logout(3);
  }
  if(stage === 3)
  {
    popup('خارج شدید' + '<br>' +
    'برای ورود مجدد از دکمه ' + '<span class="glyphicon glyphicon-user"></span> ' + 'استفاده کنید' +
     '<br><button type="button" class="btn btn-warning" id="hadrness_screen_close_btn"><span class="glyphicon glyphicon-remove"></span></button>','no','no',13);
  }
}
$( document ).ajaxStart(function() {
    $( "#loading_screen" ).show();
});
$( document ).ajaxStop(function() {
    $( "#loading_screen" ).hide();
});
function live_run_out() {
  if(live<=0)
  {
    var sound = document.getElementById('fail_sound');
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    if(score>record)
    {
      pre_record = record;
      record = score ;
      window.localStorage.setItem("record_math",record);
      var record_changed = 'yes';
      records_array.push(record);
    }
    if(record_changed == 'yes')
    {
      var record_success = '<br><span style="color:purple;">'+'رکورد قبلیت رو شکوندی !'+'</span>';
    }
    else
    {
      var record_success = '';
    }
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    popup('<span style="font-size:125%"><span class="glyphicon glyphicon-heart"></span><br>'+'قلب هات تموم شد' +'<br>'+'امتیاز : '+'<span id="score_end"></span>'+ '<br>' + 'بیشترین رکورد : ' + record +
    '' + record_success + '<br> <img id="start_first_popup_btn" src="img/restart.png" style="width:41px; height:41px; margin-top:20px; margin-bottom:30px;"></img>'+
    '<br><input type="button" value="آنالیز  شما" id="analyse" class="btn btn-info btn-lg">  '+
    '<input type="button" value="ثبت رکورد" id="record_save_btn" class="btn btn-success btn-lg"> </span>',
    'no','no',15);
    score_end_interval = setInterval(score_end,15);
    var t = wrongs + corrects;
  }
}
