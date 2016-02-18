var Text = {
  cur_record : 'رکورد کنونی : ',
  no_record_yet : 'هنوز رکوردی ثبت نشده است',
  wrong : 'اشتباهه . دوباره امتحان کن ',
  credit : 'سازندگان <br> برنامه نویسی و طراحی رابط کاربری : علیرضا رضانیا <br> طراح و مشاور : امیرحسن عجم',
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

  signup_screen : 'ثبت نام'+'<br>'+
        '<input type="text" placeholder="نام کاربری" id="name_text" class="form-control" style="margin-top: 10px;">'+
        '<br>'+
        '<input type="password" placeholder="رمز عبور" id="pass_text" class="form-control" style="margin-top: -15px;">'+
        '<br>'+
        '<input type="password" placeholder="تکرار رمز عبور" id="pass_text_repeat" class="form-control" style="margin-top:-15px; margin-bottom: -40px;">'+
        '<br>'+
        '<span style="font-size:60%; font-weight:450; color:brown;" id="signed_up_question_btn">قبلا ثبت نام کرده اید ؟</span>'+
        '<br>'+
        '<span id="error_screen_signup" class="alert alert-danger" style="display:none;  font-size:80%;"></span>'+
        '<br>'+
        '<input type="button" value="ثبت نام" id="signup_btn" class="btn btn-primary btn-lg" style="margin-top:12px;">'+
        '<button type="button" class="btn btn-warning" id="back_btn_analyse"><span class="glyphicon glyphicon-arrow-left"></span></button>'
};
