import jQuery from 'jquery';
(function($) {
  "use strict";
  var music = {
    initialised: false,
    version: 1.0,
    mobile: false,
    init: function() {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }

      this.Menu();

    },

    // Toggle Menu
    Menu: function() {

      try {
        $(".js-select2").each(function () {
          $(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(this).next('.dropDownSelect2')
          });
        });

      } catch (error) {
        console.log(error);
      }
      try {
        var arrow = $('.js-arrow');
        arrow.each(function () {
          var that = $(this);
          that.on('click', function (e) {
            e.preventDefault();
            that.find(".arrow").toggleClass("up");
            that.toggleClass("open");
            that.parent().find('.js-sub-list').slideToggle("250");
          });
        });

      } catch (error) {
        console.log(error);
      }

      $(".ms_nav_close").on('click', function() {
        $(".ms_sidemenu_wrapper").toggleClass('open_menu');
      });




    },


  };
  $(document).ready(function() {
    music.init();

  });


})(jQuery);
