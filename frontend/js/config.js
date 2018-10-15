// See Docs
window.ParsleyConfig = {
  successClass: 'has-success'
  , errorClass: 'has-error'
  , errorElem: '<span></span>'
  , errorsWrapper: '<span class="help-block"></span>'
  , errorTemplate: "<div></div>"
  , classHandler: function (el) {
    return el.$element.closest(".form-group");
  }
};


window.rauxa = {
  api: 'http://localhost:1337'
};


io.sails.url = rauxa.api;


