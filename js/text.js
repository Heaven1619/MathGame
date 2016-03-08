var Text = {
  cur_record : 'رکورد کنونی : ',
  no_record_yet : 'هنوز رکوردی ثبت نشده است',
  wrong : 'اشتباهه . دوباره امتحان کن ',
  credit : 'برنامه نویس و طراح : <br> rezania@heavenr.ir',
  login_screen:'ورود'+'<br>'+
        '<input type="text" placeholder="نام کاربری" id="name_text" class="form-control" style="margin-top: 10px;">'+
        '<br>'+
        '<input type="password" placeholder="رمز عبور" id="pass_text" class="form-control" style="margin-top: -15px;">'+
        '<br>'+
        '<span id="error_screen_login" class="alert alert-danger" style="display:none;  font-size:80%;"></span>'+
        '<br>'+
        '<span style="font-size:60%; font-weight:450; color:brown; display:none;" id="doـsign_up_question_btn">ثبت نام نکرده اید؟</span>'+
        '<br>'+
        '<input type="button" class="btn btn-primary btn-lg" id="login_btn" value="ورود">',

  signup_screen : 'ارسال رکورد'+'<br>'+
        '<input type="text" placeholder="نام کاربری" id="name_text" class="form-control" style="margin-top: 10px;">'+
        '<br>'+
        '<input type="password" placeholder="رمز عبور" id="pass_text" class="form-control" style="margin-top: -15px;">'+
        '<br>'+
        '<input type="password" placeholder="تکرار رمز عبور" id="pass_text_repeat" class="form-control" style="margin-top:-15px; margin-bottom: -15px;">'+
        '<br>'+
        '<span style="font-size:60%; font-weight:450; color:brown;" id="signed_up_question_btn">قبلا ثبت نام کرده اید ؟</span>'+
        '<br>'+
        '<span id="error_screen_signup" class="alert alert-danger" style="display:none;  font-size:80%;"></span>'+
        '<br>'+
        '<input type="button" value="ثبت نام" id="signup_btn" class="btn btn-primary btn-lg" style="margin-top:12px;">'+
        '<br><button type="button" class="btn btn-warning" id="back_btn_analyse"><span class="glyphicon glyphicon-arrow-left"></span></button>',
        signup_screen_main_page : 'ارسال رکورد'+'<br>'+
              '<input type="text" placeholder="نام کاربری" id="name_text" class="form-control" style="margin-top: 10px;">'+
              '<br>'+
              '<input type="password" placeholder="رمز عبور" id="pass_text" class="form-control" style="margin-top: -15px;">'+
              '<br>'+
              '<input type="password" placeholder="تکرار رمز عبور" id="pass_text_repeat" class="form-control" style="margin-top:-15px; margin-bottom: -15px;">'+
              '<br>'+
              '<span style="font-size:60%; font-weight:450; color:brown;" id="signed_up_question_btn">قبلا ثبت نام کرده اید ؟</span>'+
              '<br>'+
              '<span id="error_screen_signup" class="alert alert-danger" style="display:none;  font-size:80%;"></span>'+
              '<br>'+
              '<input type="button" value="ثبت نام و ثبت رکورد" id="signup_btn" class="btn btn-primary btn-lg" style="margin-top:12px;">'+
              '<br><button type="button" class="btn btn-warning" id="hadrness_screen_close_btn"><span class="glyphicon glyphicon-remove"></span></button>'
};
