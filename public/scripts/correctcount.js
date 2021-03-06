/* globals $, projectId, csrfvalue, document */
$(function () {

  function correctSend(type, value) {
    return function () {
      var data = {
        _csrf: csrfvalue
      };
      data['correct' + type] = typeof value === 'function' ? value() : value;
      $('#correct' + type + 'loading').show();
      $.post('/projects/' + projectId + '/correct' + type, data)
        .always(function () {
        $('#correct' + type + 'loading').hide();
      }).fail(function (response) {
        $('#correct' + type + 'block').addClass('has-error');
        $('#correct' + type + 'help').html(response.responseJSON.error);
        $('#correct' + type ).focus();
      }).done(function () {
        document.location.reload();
      });
    };
  }

  $('#correctwc').on('keypress', function (e) {
    if (e.which === 13) {
      $('#correctwcsave').trigger('click');
    }
  });

  $('#correctwclink').on('click', function (e) {
    e.preventDefault();
    $('#correctwcblock').toggle();
  });

  $('#correctwccancel').on('click', function () {
    $('#correctwcblock').hide();
  });

  $('#correctwcsave').on('click', correctSend('wc', function () {
    return $('#correctwc').val();
  }));
  
  $('#correctwcreset').on('click', correctSend('wc', 'reset'));

  $('#correctcc').on('keypress', function (e) {
    if (e.which === 13) {
      $('#correctccsave').trigger('click');
    }
  });

  $('#correctcclink').on('click', function (e) {
    e.preventDefault();
    $('#correctccblock').toggle();
  });

  $('#correctcccancel').on('click', function () {
    $('#correctccblock').hide();
  });

  $('#correctccsave').on('click', correctSend('cc', function () {
    return $('#correctcc').val();
  }));

  $('#correctccreset').on('click', correctSend('cc', 'reset'));
});
