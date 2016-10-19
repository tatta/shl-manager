$('.game__day-list li:first').addClass('curr');

var slide = function(){
      var Act_curr = $('.game__day-list li.curr');
      Act_curr.hide().removeClass('curr');

      if (Act_curr.next()[0] && Act_curr.next()[0].nodeName == 'LI') {
          Act_curr.next().show('fade').addClass('curr');
      } else {
          $('.game__day-list li:first').addClass('curr').show('fade');
      }
  setTimeout(slide, 4500);
}
//slide();


