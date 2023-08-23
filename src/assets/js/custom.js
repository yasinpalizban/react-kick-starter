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


      /**
       * Sticky header on scroll
       */
      const selectHeader = document.querySelector('#header');
      if (selectHeader) {
        document.addEventListener('scroll', () => {
          window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
        });
      }

      /**
       * Scroll top button
       */
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        const togglescrollTop = function() {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
          top: 0,
          behavior: 'smooth'
        }));
      }

      /**
       * Mobile nav toggle
       */
      const mobileNavShow = document.querySelector('.mobile-nav-show');
      const mobileNavHide = document.querySelector('.mobile-nav-hide');

      document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
        el.addEventListener('click', function(event) {
          event.preventDefault();
          mobileNavToogle();
        })
      });

      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
      }

      /**
       * Hide mobile nav on same-page/hash links
       */
      document.querySelectorAll('#navbar a').forEach(navbarlink => {

        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        navbarlink.addEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        });

      });



      $(".ms_nav_close").on('click', function() {
        $(".ms_sidemenu_wrapper").toggleClass('open_menu');
      });




    },


  };
  $(document).ready(function() {
    music.init();

  });


})(jQuery);




