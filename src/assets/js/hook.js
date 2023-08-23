import $ from "jquery";

export function callSelect() {

    try {


        $(".js-select2").each(function (i, item) {
            $(this).select2();
        });



        $(".js-select2").on('change', function (event) {

            event.stopImmediatePropagation();
            $(this).attr('data-value', event.currentTarget.value);
            $(this).trigger('click');

        });

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

    } catch (e) {

    }


}
