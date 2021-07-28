(function ($) {
    "use strict";
    $(document).ready(function () {


        /*
        * Spiner 
        */
        const spinner = document.querySelector('.spinner');
        const spinnerButton = document.querySelectorAll('.spinner-line');
        const navMenu = document.querySelector('.nav-box');
        function spinnerClassToggle() {
            navMenu.classList.toggle("active");
            spinnerButton.forEach(elem => {
                elem.classList.toggle("active")
            });
        };
        spinner.addEventListener('click', (event) => {
            event.preventDefault();
            spinnerClassToggle();
        });

        /*
        * Nav animation 
        */
        const menuList = document.querySelector('.sf-menu');
        const menuItems = menuList.querySelectorAll('li');
        startPosition()

        menuItems.forEach(menuItem => {
            let menuItemLink = menuItem.querySelector('a');
            menuItem.addEventListener('mouseenter', function () {
                const elLeft = getLeftCords(menuItemLink) - getLeftCords(menuList);
                const elWidth = menuItemLink.getBoundingClientRect().width;
                $('#nav-indicator').animate({ width: elWidth, left: elLeft, }, { queue: false, duration: 250 });
            })
            menuItem.addEventListener('mouseleave', function () {
                startPosition();
            })
            menuItemLink.addEventListener('click', function (event) {
                event.preventDefault();
                let $parent = $(this).parent('li');
                $parent.addClass('active').siblings().removeClass('active');
                spinnerClassToggle();
                startPosition();
                anchorSmoothTransition($(this));
            });
        });

        function getLeftCords(el) {
            const cord = el.getBoundingClientRect();
            return cord.left;
        }

        function startPosition() {
            $('#nav-indicator').width($(".sf-menu").children('li.active').width())
            let activeItem = document.querySelector('.sf-menu li.active a');
            const elLeft = getLeftCords(activeItem) - getLeftCords(menuList);
            const elWidth = activeItem.getBoundingClientRect().width;
            $('#nav-indicator').animate({ width: elWidth, left: elLeft }, { queue: false, duration: 250 });
        }

        function anchorSmoothTransition(anchor) {
            let id = anchor.attr("href"),
                top = $(id).offset().top;
            top = top - 120;
            $("body,html").animate({
                scrollTop: top,
            },
                1500
            );
        }


        /*
        * ScrollMagic init
        */
        const postDetails = document.querySelector(".main-content");
        const postSidebar = document.querySelector(".js-sidebar");
        const postSidebarContent = document.querySelector(".js-sidebar > div");

        const controller = new ScrollMagic.Controller();
        const scene = new ScrollMagic.Scene({
            triggerElement: postSidebar,
            triggerHook: 0,
            duration: getDuration,
            offset: -120
        }).addTo(controller);

        if (window.matchMedia("(min-width: 1000px)").matches) {
            scene.setPin(postSidebar, { pushFollowers: false });
        }

        window.addEventListener("resize", () => {
            if (window.matchMedia("(min-width: 1000px)").matches) {
                scene.setPin(postSidebar, { pushFollowers: false });
            } else {
                scene.removePin(postSidebar, true);
            }
        });

        function getDuration() {
            return postDetails.offsetHeight - postSidebarContent.offsetHeight;
        }
    });



})(jQuery);