(function ($) {
  "use strict";

  $(window).on("load", function () {
    $(".fullpage_loader").fadeOut("slow", function () {
      $(this).remove();
    });
  });

  // Fixed menu js start
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $("#sticky-header").removeClass("sticky-menu");
      $("#header-fixed-height").removeClass("active-height");
    } else {
      $("#sticky-header").addClass("sticky-menu");
      $("#header-fixed-height").addClass("active-height");
    }
  });

  // testimonial slider js
  $(".banner_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    arrows: true,
    dots: true,
    prevArrow: `<i class="fas arrow arrow-prev fa-arrow-left"></i>`,
    nextArrow: `<i class="fas arrow arrow-next fa-arrow-right"></i>`,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      }
    }]
  });

  // Split text animation
  document.addEventListener("DOMContentLoaded", function () {
    if ($(".split-text").length > 0) {
      let st = $(".split-text");
      if (st.length == 0) return;
      gsap.registerPlugin(SplitText);
      st.each(function (index, el) {
        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "tp-split-line"
        });
        gsap.set(el, {
          perspective: 400
        });
        if ($(el).hasClass('right')) {
          gsap.set(el.split.chars, {
            opacity: 0,
            x: "50",
            ease: "Back.easeOut",
          });
        }
        if ($(el).hasClass('left')) {
          gsap.set(el.split.chars, {
            opacity: 0,
            x: "-50",
            ease: "circ.out",
          });
        }
        if ($(el).hasClass('up')) {
          gsap.set(el.split.chars, {
            opacity: 0,
            y: "80",
            ease: "circ.out",
          });
        }
        if ($(el).hasClass('down')) {
          gsap.set(el.split.chars, {
            opacity: 0,
            y: "-80",
            ease: "circ.out",
          });
        }
        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          x: "0",
          y: "0",
          rotateX: "0",
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
        });
      });
    };
  })

  // Image reveal js
  document.addEventListener('DOMContentLoaded', function () {
    let revealContainers = document.querySelectorAll(".reveal_image");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none reverse",
        }
      });

      tl.set(container, {
        autoAlpha: 1
      });

      if (container.classList.contains('zoom-out')) {
        // Zoom-out effect
        tl.from(image, 1.5, {
          scale: 1.4,
          ease: Power2.out
        });
      } else if (container.classList.contains('left') || container.classList.contains('right')) {
        let xPercent = container.classList.contains('left') ? -100 : 100;
        tl.from(container, 1.5, {
          xPercent,
          ease: Power2.out
        });
        tl.from(image, 1.5, {
          xPercent: -xPercent,
          scale: 1,
          delay: -1.5,
          ease: Power2.out
        });
      }
    });
  });

  // magnific popup js
  $(".parent-container").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $('.vidplay').magnificPopup({
    type: 'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        '</div>',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        },
      },
      srcAction: 'iframe_src',
    }
  });


  // back to top js
  var btn = $(".scroll-to-top");

  $(window).scroll(function () {
    btn.toggleClass("show", $(window).scrollTop() > 300);
  });

  btn.click(function (e) {
    e.preventDefault();
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      $("html").animate({
          scrollTop: 0,
        },
        1000
      );
    } else {
      $("html, body").animate({
          scrollTop: 0,
        },
        0
      );
    }
  })

  // mobilel menu js
  $(".mobile-topbar .bars i").on("click", function () {
    $(".mobile-menu-overlay,.mobile-menu-main").addClass("active");
    return false;
  });

  $(".close-mobile-menu,.mobile-menu-overlay").on("click", function () {
    $(".mobile-menu-overlay,.mobile-menu-main").removeClass("active");
  });

  $(".sub-mobile-menu ul").hide();
  $(".sub-mobile-menu a").on("click", function () {
    $(this).parent(".sub-mobile-menu").children("ul").slideToggle("100");
    $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
  });
})(jQuery);