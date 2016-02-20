$(document).ready(function(){
  /*popup('عطاردی جان !<br> بهت که گفتم که این برای تبلت بهینه نشده !<br>'+
  'این نسخه فوق ابتداییه و یه کار چند ساعته و تفریحیه و ارزش دیگری ندارد'
  +'بای',
  'میفهمم چی میگی','no');*/
  //Check if a record already is broken using Cookie
  record=-100;
  to_score = 0;
  cur_end_txxt= '';
  main_sum = 0;
  var cur_record = getCookies('record_math');
  if(cur_record)
  {
    $('#cur_record').html(Text.cur_record + cur_record);
    $('#score').html(' '+cur_record);
    record = cur_record;
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
          startbtn.animate({'fontSize':'+=40%'},1000,function(){
            body.one('click','#start_btn',show_main);
            $('#hardness_btn_main').fadeIn();
            $('#best_records_btn_main').fadeIn();
          });
        });
      });
    });
  }); //Start btn Animation END

  $('.answ').on('click',result);
  body.on('click','#close_popup_btn',popupclose);
  body.on('click','#start_first_popup_btn',start_first);
  body.on('click','#next_level_popup_btn',next_level);
  body.on('click','#quest',make_vertical_question);
  body.on('click','#credit',credits);
  body.on('click','#analyse',analyse);
  body.on('click','#show_wrong_btn',show_wrongs);
  body.on('click','#hardness_btn_main',hardness);
  body.on('click','#pause',function(){pause(false);});
  body.on('click','#record_save_btn',record_btn);
  body.on('click','#signup_btn',function(){save_record('signup_and_send');});
  body.on('click','#send_record_btn',function(){save_record('update_record');});
  body.on('click','#best_records_btn,#best_records_btn_main',function(){show_best_records('total');$('#total_records_header,#today_records_header').removeClass('focused'); $('#total_records_header').addClass('focused'); $(this).parent().hide();
        $(this).parent().parent().find('.popup_back').hide();});
  body.on('click','#total_records_header',function(){show_best_records('total');$('#total_records_header,#today_records_header').removeClass('focused'); $('#total_records_header').addClass('focused');});
  body.on('click','#today_records_header',function(){show_best_records('today');$('#total_records_header,#today_records_header').removeClass('focused');  $('#today_records_header').addClass('focused');});
  body.on('click','#go_first_btn',go_first_screen);
  body.on('click','#hadrness_screen_close_btn',just_closepopup); //also is being used for setting and credit popups
  body.on('click','#signed_up_question_btn',function(){login('login_screen');});
  body.on('click','#login_btn',function(){login('login_btn');});
  body.on('click','#continue_time',function(){
    if(live-2>0)
    {
      sec+=5; live-=2; to_score=0; $('#answ_sec li').css({'color':'black','textDecoration':'none'}); $('.popup_back,.popup_box').fadeOut(500); $('#live').text(live);  Timer(); sec_interval = setInterval(Timer,1000);
      ms_interval = setInterval(millisec,10); math();
    }
    else
    {
        popup('<span class="glyphicon glyphicon-heart"></span><br> <span style="color:#fff;background-color:red; border-radius:30px;text-align:center;padding: 5px 5px;">قلب هات  کافی نیست </span><br> ' +
         'فیلم تبلیغاتی کوتاه ببین و 2 قلب هدیه بگیر'+'<br><br>'+
       '<input type="button" class="btn btn-primary" value="مشاهده فیلم" id="ad_video_btn">  '+
       '<input type="button" class="btn btn-danger" value="خرید بسته" id="buy_live_btn">');
    }
  });
  body.on('click','#back_btn_analyse',function (){popup(cur_end_text);});//also is being used for signup screen
  body.on('click','#settings',hardness);
  body.on('click','#next_question_true_false_btn',function(){$('.popup_box,.popup_back').hide(); sec_interval = setInterval(Timer,1000);
    ms_interval = setInterval(millisec,10); math();});


});

function credits() {
  popup(Text.credit,
  'خوب میگی چی کار کنم؟','hadrness_screen_close_btn');
}
function hardness() {
  popup('درجه سختی'+'<br>'+
  '<form>'+
  '<label for="rad_hard">سخت</label> <span class="glyphicon glyphicon-lock"> </span>'+
  '<input type="radio" id="rad_hard" name="hardness" value="سخت">'+'<br>'+
  '<label for="rad_hard">متوسط</label>'+
  '<input checked type="radio" id="rad_medium" name="hardness" value="متوسط">'+'<br>'+
  '<label for="rad_hard">ساده</label> <span class="glyphicon glyphicon-lock"> </span>'+
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
  body.off('click','#hardness_btn_main');
  body.one('click','#hardness_btn_main',function(){$('#hardness_btn_main').val('دیگه نمیشه ! ');});
  var startbtnspan = $('#start_btn_span');
  startbtnspan.animate({'fontSize':'-=100%'},500,function(){
    startbtnspan.text('آماده').animate({'fontSize':'+=140%'},500,function(){
      startbtnspan.delay(1000).animate({'fontSize':'-=140%'},500,function(){
          startbtnspan.text('3').animate({'fontSize':'+=140%'},500,function(){
            startbtnspan.text('2').hide().fadeIn(1000,function(){
              startbtnspan.text('1').hide().fadeIn(1000,function(){
                show_main();
              });
            });
          });
      });
    });
  });
}

//Initial variable define! پیش تعریف ورای ایبل ها
sec = 5;
score=0;
adad1 = 0;
adad2 = 0;
wrongs = 0;
wrongs_array = [];
sum_of_wrong_array= [];
selected_wrong_array= [];
records_array = [];
corrects = 0;
count = 0;
reward_Time =2; //default value (medium level that already selected)
reward_Score = 4;
level_check = 1;
cur=0;
live =5;
count_wrongs_selection = 0;
percent = 0;
format = 0;

//Initial variable define! END!
function show_main() {
  cur=0;
  live =5;
  count_wrongs_selection = 0;
  sec = 5;
  score=0;
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
  level_check = 1;
  to_score = 0;
  $('.title,#cur_record').hide();
  $('#math_screen').addClass('level1');
  $('#start_btn').toggle(500);
  $('#best_records_btn_main').hide();
  $('#license').hide();
  $('#credit').hide();
  $('#hardness_btn_main').hide();
  $('#quest_sec,#answ_sec').fadeIn(1000);
  $('#score').text('0');
  math();
  Timer();
  sec_interval = setInterval(Timer,1000);
  ms_interval = setInterval(millisec,10);
}

function math() {
  count++;
  if(score<50)//Level 1
  {

    var rand1 = Math.random(),
        adad1_s = rand1 * 10 + 2;
        adad1 = parseInt(adad1_s.toFixed('0'),10);
    var rand2 = Math.random(),
        adad2_s = rand2 * 10 + 2;
        adad2 = parseInt(adad2_s.toFixed('0'),10);
    sum = adad1 + adad2;
    var val_other1 = 2;
    var val_other2 = 1;
    var val_other3 = 2;
    var val_other4 = 1;
  } // Level 1 END

  /*if(score>=50 && score<80)//Level 2
  {

      if(level_check == 1) level_check = 'reached 2';
      var rand1 = Math.random(),
          adad1_s = rand1 * 35 + 5,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 35 + 5,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad1 + adad2;
     var val_other1 = 10;
     var val_other2 = 1;
     var val_other3 = 5;
     var val_other4 = 1;
  }// Level 2 END*/
  if(score>=50 && score<80)//Level 2
  {
      if(level_check == 1) level_check = 'reached 2';
      var rand1 = Math.random(),
          adad1_s = rand1 * 10 + 2,
          adad1 = parseInt(adad1_s.toFixed('0'),10);
      var rand2 = Math.random(),
          adad2_s = rand2 * 10 + 2,
          adad2 = parseInt(adad2_s.toFixed('0'),10);
     sum = adad1 + adad2;
     main_sum = sum;
     var rand_trueorfalse = Math.random(),
         trueorfalse_s = rand_trueorfalse * 19 + 1,
         trueorfalse = parseInt(trueorfalse_s.toFixed('0'),10);
     switch(true)
     {
       case (trueorfalse>10) : var rand_sum_change_val = Math.random(),
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
                    break;
     }
  }// Level 2 END
  if(score>=80 && score<110)//Level 3
  {
    if(level_check == 2) level_check = 'reached 3';
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
  if(score>=110 && score<150)//Level 4
  {
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

  if(score>=150 && score<200)//Level 5
  {

    if(level_check == 4) level_check = 'reached 5';
    var rand1 = Math.random(),
        adad1_s = rand1 * 10 + 2,
        adad1 = parseInt(adad1_s.toFixed('0'),10);
    var rand2 = Math.random(),
        adad2_s = rand2 * 10 + 2,
        adad2 = parseInt(adad2_s.toFixed('0'),10);
   sum = adad1 * adad2;
   var val_other1 = 2;
   var val_other2 = 1;
   var val_other3 = 2;
   var val_other4 = 1;
 } // Level 5 END
 if(score>=200 && score<250)//Level 6 // sum and multiplication
 {

   if(level_check == 5) level_check = 'reached 6';
   var rand1 = Math.random(),
       adad1_s = rand1 * 8 + 0,
       adad1 = parseInt(adad1_s.toFixed('0'),10);
   var rand2 = Math.random(),
       adad2_s = rand2 * 8 + 0,
       adad2 = parseInt(adad2_s.toFixed('0'),10);
   var rand3 = Math.random(),
       adad3_s = rand3 * 8 + 0,
       adad3 = parseInt(adad3_s.toFixed('0'),10);
  sum = adad1 * adad2 + adad3;
  var val_other1 = 2;
  var val_other2 = 1;
  var val_other3 = 2;
  var val_other4 = 1;
} // Level 6 END
if(score>=250 && score<300)//Level 7
{

  if(level_check == 6) level_check = 'reached 7';
  var rand1 = Math.random(),
      adad1_s = rand1 * 10 + 0,
      adad1 = parseInt(adad1_s.toFixed('0'),10);
  var rand2 = Math.random(),
      adad2_s = rand2 * 10 + 0,
      adad2 = parseInt(adad2_s.toFixed('0'),10);
  var rand3 = Math.random(),
      adad3_s = rand3 * 10 + 0,
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
if(score>=300 && score<400)//Level 8 - Division
{

  if(level_check == 7) level_check = 'reached 8';

    var rand1 = Math.random(),
        adad1_s = rand1 * 9 + 1;
        adad1 = parseInt(adad1_s.toFixed('0'),10);
    var rand2 = Math.random(),
        adad2_s = rand2 * 9 + 1;
        adad2 = parseInt(adad2_s.toFixed('0'),10);

 res = adad1*adad2; // it will multiplicate the two number and in next satement the result will divided to one of numbers
 sum = res / adad2;
 var val_other1 = 2;
 var val_other2 = 1;
 var val_other3 = 2;
 var val_other4 = 1;
} // Level 8 END
  if(level_check == 'reached 2') // popup alert for level 2 reach
  {
    $('#math_screen').addClass('level2');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک </span><br> مرحله دوم آغاز شد<br>سوالات سختر میشه' ,
     'ادامه' , 'next_level_popup_btn');
    level_check = 2; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').hide();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',true_false);
    $('#answ1').html('درست');
    $('#answ2').html('نادرست');
  }
  if(level_check == 'reached 3') // popup alert for level 3 reach
  {
    $('#math_screen').addClass('level3');
    percent = 0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br> مرحله سوم آغاز شد <br> حالا تفریق ها رو حل کن' ,
     'ادامه' , 'next_level_popup_btn');
    level_check = 3; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').show();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',result);
  }

  if(level_check == 'reached 4') // popup alert for level 4 reach
  {
    $('#math_screen').addClass('level4');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br> مرحله چهارم آغاز شد <br> جمع چند تایی',
     'ادامه' , 'next_level_popup_btn');
    level_check = 4; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 5') // popup alert for level 5 reach
  {
    $('#math_screen').addClass('level5');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br>مرحله پنج آغاز شد! <br> حالا ضرب ها رو انجام بده. نترس سادس',
     'ادامه' , 'next_level_popup_btn');
    level_check = 5; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 6') // popup alert for level 6 reach
  {
    $('#math_screen').addClass('level6');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br>مرحله 6 آغاز شد! <br> با ضرب سه تایی چطوری؟',
     'ادامه' , 'next_level_popup_btn');
    level_check = 6; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 7') // popup alert for level 7 reach
  {
    $('#math_screen').addClass('level7');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br>مرحله 7 آغاز شد! <br> جمع و تفریق سه تایی مخلوط',
     'ادامه' , 'next_level_popup_btn');
    level_check = 7; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 8') // popup alert for level 7 reach
  {
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 1px 5px;">'+'تبریک'+'</span>'+' <br>مرحله 8 آغاز شد! <br>منتظر تقسیم بودی؟ حلشون کن !',
     'ادامه' , 'next_level_popup_btn');
    level_check = 8; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  var which_answ_rand = Math.random(), // find a random answer block 1 or 2 or 3 or 4
      which_answ_s = which_answ_rand * 3 + 1 ,
      which_answ = parseInt(which_answ_s.toFixed('0'),10);
    if(level_check != 2) //cuz in level2 in answ li true or false is writen
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
    if(level_check != 2) //cuz in level2 in answ li true or false is writen
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
    case 1: var question = adad2 + ' + ' + adad1; break;
    case 2: var question = sum + ' = ' + adad1 + ' + ' + adad2;
            break;

    case 3: var question = adad2 + ' - ' + adad1;
            break;

    case 4: var question = adad3 + '+' + adad2 + '+' + adad1;
            break;
    case 5: var question = adad2 + ' × ' + adad1;
            break;
    case 6: var question = adad3 + ' + ' + adad2 + ' × ' + adad1;
            break;
    case 7 : switch(format)
              {
                case 1 : var question = adad1 + '-' + adad2 + '+' + adad3; break;
                case 2 : var question = adad1 + '+' + adad2 + '-' + adad3; break;
                case 3 : var question = adad1 + '+' + adad2 + '+' + adad3; break;
                case 4 : var question = adad1 + '-' + adad2 + '-' + adad3; break;
              }
              break;
    case 8: var question = adad2 + ' ÷ ' + res; break;
  }

  $('#question').text(question);

  console.log(question + ' = ' + sum +' manisum : '+main_sum + '  |  ' + which_answ + ' | Lev : ' + level_check +
  ' | Corrects : ' + corrects + ' | Wrongs :' + wrongs);
  if(live<=0)
  {
    if(score>record)
    {
      record = score ;
      setCookies('record_math',record,100);
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
    '<br><button type="button" class="btn btn-danger" style="margin-bottom:5px;" id="continue_time">'+'ادامه میدی؟ (دو <span class="glyphicon glyphicon-heart" ></span> نیازه)'+'</button>'+
    '<br><input type="button" value="آنالیز  شما" id="analyse" class="btn btn-info btn-lg">  '+
    '<input type="button" value="ثبت رکورد" id="record_save_btn" class="btn btn-success btn-lg"> </span>',
    'no','no',15);
    score_end_interval = setInterval(score_end,15);
    var t = wrongs + corrects;
  }
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
    $(li[i]).css({'color':'black'});
  }

  var selected = $(this).text();
  if(selected == sum)
  {

    count_wrongs_selection = 0;
    $('ul li').css({'textDecoration':'none'});
    math();

    if($('#rad_hard:checked').val()) // check hardness settings
    {
      reward_Time = 1;
      reward_Score = 10;
    }
    if($('#rad_medium:checked').val())
    {
      reward_Time = 2;
      reward_Score = 4;
    }
    if($('#rad_easy:checked').val())
    {
      reward_Time = 4;
      reward_Score = 1;
    }
    add_score_reward_status_bar();
    corrects++;

    switch(level_check)
    {
      case 1 : sec+=reward_Time; score+=reward_Score; break;
      case 3 : sec+=(reward_Time+1); score+=(reward_Score+2); break;
      case 4 : sec+=(reward_Time+1); score+=(reward_Score+3); break;
      case 5 : sec+=(reward_Time+1); score+=(reward_Score+3); break;
      case 6 : sec+=(reward_Time+1); score+=(reward_Score+3); break;
      case 7 : sec+=(reward_Time+1); score+=(reward_Score+3); break;
    }
  }

  else
  {

    $(this).css({'color':'red','textDecoration':'line-through'});+
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
    score-=5;

    live--;
  }

  $('#score').text(score);
  $('#live').text(live);
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger').html('');
  switch(level_check)
  {
    case 1 : percent = ((score-0)/50)*100; progress_bar.html('مرحله 1').append(' (' + score + ' <span class="glyphicon glyphicon-star">' + ')'); break;
    case 3 : percent = ((score-80)/30)*100; progress_bar.addClass('progress-bar-info').html('مرحله 3').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 4 : percent = ((score-110)/40)*100; progress_bar.addClass('progress-bar-active').html('مرحله 4').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 5 : percent = ((score-150)/50)*100; progress_bar.addClass('progress-bar-danger').html('مرحله 5').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 6 : percent = ((score-200)/50)*100; progress_bar.addClass('progress-bar-success').html('مرحله 6').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 7 : percent = ((score-250)/50)*100; progress_bar.addClass('progress-bar-info').html('مرحله 7').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
    case 8 : percent = ((score-250)/50)*100; progress_bar.addClass('progress-bar-warning').html('مرحله 8').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')'); break;
  }
  progress_bar.css('width',percent+'%');
  $('#score_progress').html(score);
}

function true_false() {
  console.log('sum : ' + sum + 'main_sum' + main_sum);
  if($(this).text() == 'درست') //correct
  {
    if(sum == main_sum)
    {
      math();
      score+=5;
      sec+=4;
    }
    else if(sum != main_sum)
    {
      popup('اشتباه بود' + '<br>',
    'سوال بعدی','next_question_true_false_btn');
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      score-=5;
      live--;
    }
  }

  if($(this).text() == 'نادرست') //wrong
  {
    if(sum == main_sum)
    {
      popup('اشتباه بود' + '<br>',
    'سوال بعدی','next_question_true_false_btn');
      clearInterval(sec_interval);
      clearInterval(ms_interval);
      score-=5;
      live--;
    }
    else if(sum != main_sum)
    {
      math();
      score+=5;
      sec+=4;
    }
  }
  $('#score').html(score);
  $('#live').html(live);
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger').html('');
  percent = ((score-50)/30)*100; progress_bar.addClass('progress-bar-success').html('مرحله 2').append(' (' + score + ' <span class="glyphicon glyphicon-star"> ' + ')');
  progress_bar.css('width',percent+'%');
  $('#score_progress').html(score);
}

function Timer ()
{
  sec--;
  $('#sec').text(sec);
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
    if(score>record)
    {
      record = score ;
      setCookies('record_math',record,100);
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
     popup('<span style="font-size:125%"><span class="glyphicon glyphicon-time"></span><br>'+'زمان شما به پایان رسید' +'<br>'+'امتیاز : '+'<span id="score_end"></span>'+ '<br>' + 'بیشترین رکورد : ' + record +
     '' + record_success + '<br> <img id="start_first_popup_btn" src="img/restart.png" style="width:41px; height:41px; margin-top:20px; margin-bottom:30px;"></img>'+
     '<br><button type="button" class="btn btn-danger" style="margin-bottom:5px;" id="continue_time">'+'ادامه میدی؟ (دو <span class="glyphicon glyphicon-heart" ></span> میگیرم)'+'</button>'+
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
  if(level_check == 2)
  {
    $('#answ3,#answ4').show();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',result);
  }
  $('#math_screen').removeClass('level1').removeClass('level2').removeClass('level3').removeClass('level5').removeClass('level5').removeClass('level6').removeClass('level7').removeClass('level8').addClass('level1');
  var progress_bar =  $('.progress-bar');
  progress_bar.removeClass('progress-bar-info').removeClass('progress-bar-success').removeClass('progress-bar-danger');
  progress_bar.css('width','0%');
  clearInterval(score_end_interval);
  to_score = 0;
  $('ul li').css({'textDecoration':'none','color':'black'});
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
   cur = $('#question').text();
   reg1= /^[0-9]+/g;
   reg2= /\+ [0-9]+/g;
   var cur1 = cur.match(reg1).toString();
   var cur2 = cur.match(reg2).toString();
   var cur2_noplus = cur2.replace('+','');
   $('#question').html(cur2_noplus+ '<br>+<br>' + cur1);
 }

function analyse() {
  var ana = '';
  var analyse = '';
  cur_end_text = $('.popup_box').html();
  if(count>=7)
  {
    switch(true)
    {
      case score>100: ana = 'بسیار عالی عمل کردید'; break;
      case score>=5 && wrongs<10 : ana = 'عالی عمل کردید'; break;
      case wrongs>=10 && wrongs<10 : ana = ''; break;
    }
    analyse = 'شما از ' + count + ' سوال پرسیده شده ' + wrongs + ' بار اشتباه پاسخ داده اید' + '<br>' +
    '<input type="button" value="نمایش غلط های شما" id="show_wrong_btn" class="btn btn-danger ">';
    }
  if(count<7)
  {
    analyse = 'برای آنالیز دقیق باید به سوالات بیشتری جواب داده باشید. لطفا حد اقل به '+
    (7-count) + ' سوال دیگر نیز پاسخ دهید';
  }
  popup(analyse,'<span class="glyphicon glyphicon-arrow-left">','back_btn_analyse');
}

function show_wrongs()
{
  var result = '';
  if(wrongs_array.length>0)
  {
    for(i=0 ; i < wrongs_array.length ; i++)
    {
      result +=sum_of_wrong_array[i]+'<span style="color:green;"> <= </span>' +selected_wrong_array[i]+ ' ≠ ' + wrongs_array[i]+'<br>';
    }

    popup(result,'<span class="glyphicon glyphicon-arrow-left">','back_btn_analyse');
  }
  else if(wrongs_array.length>=0)
  {
    popup('احسنت. هیچ غلطی نداشتی'
  ,'<span class="glyphicon glyphicon-arrow-left">', 'back_btn_analyse');
  }
}


function add_score_reward_status_bar() {
  $('#reward_score_span').hide(0,function(){
    $('#score').hide();
    $('#reward_score_span').html('+' + reward_Score).show(500,function(){
      $('#reward_score_span').delay(100).html('');
      $('#score').show();
    });
  });
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
                      $('ul li').show();
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
  var check_login = getCookies('loged-in');
  if(check_login == 'true')
  {
    var username = getCookies('username');
    popup('ارسال رکورد'+'<br>'+ username +' عزیز برای ثبت رکورد خود دکمه ارسال را انتخاب نمایید'+'<br>'+
    '<input type="button" value=ارسال" id="send_record_btn" class="btn btn-primary btn-lg">');
  }
  else
  {
   popup(Text.signup_screen,'no','no',15); //signup screen content
  }

}
var check = '';
function save_record(how) {
  if(how == 'update_record')
  {
    record = record;
    var username = getCookies('username');
    $.post('php/update_record.php',{'username':username,'record':record},function(data){
      popup(data,'نمایش رکورد ها ','best_records_btn');
    });
  }
  if(how == 'login_and_send')
  {
    record = record;
    var username = getCookies('username');
    $.post('php/update_record.php',{'username':username,'record':record},function(data){
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
            $.post('php/signup.php',{'name_signup':name_signup, 'pass_signup':pass_signup,'record':record},function(data){
              if(data == 1) {$('#error_screen_signup').html('<br>'+'این نام قبلا اسفاده شده').show();}
              if(data == 2) {popup('ارسال شد','نمایش رکورد ها ','best_records_btn');setCookies('loged-in','true',1000);setCookies('username',name_signup,1000);}
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
    var username = getCookies('username');
    if(period == 'total')
    {
      $('#start_btn').off('click');

      $('#math_screen').fadeOut(500);
      $.post('php/get_records.php',{'username':username},function(data){
        $('#bestrecord_screen').fadeIn(500);
        $('#tbody').html(data);
      });
    }
    if(period == 'today')
    {
      $.post('php/get_records_today.php',{'username':username},function(data){
        $('#tbody').html(data);
      });
    }
}

function go_first_screen() {
    $('body').on('click','#hardness_btn_main',hardness);
    $('#hardness_btn_main').val('درجه سختی');
    $('#bestrecord_screen').hide();
    $('#quest_sec,#answ_sec').hide();
    $('#math_screen').fadeIn();
    $('#start_btn').one('click',ready).show();
    $('#start_btn_span').css({'fontSize':'100%'}).text('شروع');
    $('#version,#best_records_btn_main').show();
    $('#license').show();
    $('#credit').show();
    $('#hardness_btn_main').show();
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
        $.post('php/login.php',{'username':username,'password':password},function(data){
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
            setCookies('record_math',record,100);
            setCookies('loged-in','true',1000);
            setCookies('username',username,1000);
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
