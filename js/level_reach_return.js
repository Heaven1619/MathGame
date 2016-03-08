function level_reach_return() {
  if(level_check == 'reached 2') // popup alert for level 2 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#d25400');
    percent = 0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 2'+'</span>'+ '<br>آیا عبارت درسته؟' ,
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
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#25ae5f');
    percent = 0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 3'+'</span>'+ '<br> حالا تفریق ها رو حل کن' ,
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
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#05a9d6');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 4'+'</span>'+'<br> جمع چند تایی',
     'ادامه' , 'next_level_popup_btn');
    level_check = 4; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 5') // popup alert for level 5 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 5'+'</span>'+'<br>حالا ضرب ها رو انجام بده',
     'ادامه' , 'next_level_popup_btn');
    level_check = 5; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 6') // popup alert for level 6 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#05a9d6');
    percent = 0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 6'+'</span>'+'<br> کدوم عبارت بزرگتره؟',
     'ادامه' , 'next_level_popup_btn');
    level_check = 6; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#question,#question2').css('fontSize','320%');
    $('#question2').show();
    $('#answ_ul').hide();
    $('#answ_bigger_ul').show();
  }
  /*if(level_check == 'reached 6') // popup alert for level 6 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#05a9d6');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 6'+'</span>'+'<br> با ضرب سه تایی چطوری؟',
     'ادامه' , 'next_level_popup_btn');
    level_check = 6; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }*/
  if(level_check == 'reached 7') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    live+=5;
    $('#math_screen').css('backgroundColor','#326288');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 7'+'</span>'+'<br> جمع و تفریق سه تایی مخلوط',
     'ادامه' , 'next_level_popup_btn');
    level_check = 7; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#question').css('fontSize','500%');
    $('#question2').hide();
    $('#answ_ul').show();
    $('#answ_bigger_ul').hide();
  }
  if(level_check == 'reached 8') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ef413d');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 8'+'</span>'+'<br>منتظر تقسیم بودی؟ حلشون کن !',
     'ادامه' , 'next_level_popup_btn');
    level_check = 8; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 9') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#d25400');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 9'+'</span>'+'<br> درست و نادرست!',
     'ادامه' , 'next_level_popup_btn');
    level_check = 9; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').hide();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',true_false);
    $('#answ1').html('درست');
    $('#answ2').html('نادرست');
  }
  if(level_check == 'reached 10') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 10'+'</span>'+'<br>جمع سطح 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 10; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').show();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',result);
  }
  /*if(level_check == 'reached 11') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#05a9d6');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 11'+'</span>'+'<br>جمع و ضرب مخلوط 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 11; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }*/
  if(level_check == 'reached 11') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#05a9d6');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 11'+'</span>'+'<br>کدوم عبارت بزرگ تره؟ سطح 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 11; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#question,#question2').css('fontSize','320%');
    $('#question2').show();
    $('#answ_ul').hide();
    $('#answ_bigger_ul').show();
  }
  if(level_check == 'reached 12') // popup alert for level 12 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 12'+'</span>'+'<br>جمع و تفریق مخلوط 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 12; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#question').css('fontSize','500%');
    $('#question2').hide();
    $('#answ_ul').show();
    $('#answ_bigger_ul').hide();
  }
  if(level_check == 'reached 13') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#3b5999');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 13'+'</span>'+'<br>جمع و ضرب و تفریق مخلوط',
     'ادامه' , 'next_level_popup_btn');
    level_check = 13; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
  if(level_check == 'reached 14') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 14'+'</span>'+'<br>درست یا نادرست سطح 3',
     'ادامه' , 'next_level_popup_btn');
    level_check = 14; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').hide();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',true_false);
    $('#answ1').html('درست');
    $('#answ2').html('نادرست');
  }
  if(level_check == 'reached 15') // popup alert for level 7 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 15'+'</span>'+'<br>درست نادرست سطح 4',
     'ادامه' , 'next_level_popup_btn');
    level_check = 15; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);

  }
  if(level_check == 'reached 16') // popup alert for level 16 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 16'+'</span>'+'<br>تقسیم سطح 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 16; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
    $('#answ3,#answ4').show();
    $('#answ1,#answ2').off('click');
    $('#answ1,#answ2').on('click',result);
  }
  if(level_check == 'reached 17') // popup alert for level 17 reach
  {
    document.getElementById('level_sound').play();
    $('#math_screen').css('backgroundColor','#ae249c');
    percent =0;
    popup('<span style="color:#fff;background-color:green; border-radius:30px;text-align:center;padding: 3px 7px; font-size:130%;">'+'مرحله 16'+'</span>'+'<br>تقسیم سطح 2',
     'ادامه' , 'next_level_popup_btn');
    level_check = 17; // for next level check
    clearInterval(sec_interval);
    clearInterval(ms_interval);
  }
}
