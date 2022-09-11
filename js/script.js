$(document).ready(function () {
  AC="active"
  // gnb
  $(".gnb").find("li>a").on("click", function (e) {
    $("html,body").stop().animate({
      scrollTop: $(this.hash).offset().top
    }, 800)
    $(".toggleMenu").removeClass("on");
    $(".gnb ul").stop().animate({ left: "100%" }, 300);
    $('html').css("overflow", "auto");
    $(".header_top").css("background-color", "rgba(255,255,255,0.1)");
    e.preventDefault()
  })


  $(".toggleMenu").click(function () {
    const check = $(".toggleMenu").attr("class");
    if (check == "toggleMenu") {
      $(this).addClass("on");
      $(".gnb ul").stop().animate({ left: 0 }, 300);
      $('html').css("overflow", "hidden");
      $(".header_top").css("background-color", "rgba(0,0,0,1)");
    } else {
      $(this).removeClass("on");
      $(".gnb ul").stop().animate({ left: "100%" }, 300);
      $('html').css("overflow", "auto");
      $(".header_top").css("background-color", "rgba(255,255,255,0.1)");
    }
  });

  // $(window).scroll(function(){
  //   let scrollY = $(window).scrollTop();
  //   console.log(scrollY)
  //   console.log(scrollY + window.innerHeight/2)
    
  //   if(1300<scrollY + window.innerHeight/2){
  //     $(".section_nav ul li").removeClass(AC);
  //     $(".section_nav ul li:nth-child(2)").addClass(AC);
  //     if(1980<scrollY + window.innerHeight/2){
  //       $(".section_nav ul li").removeClass(AC);
  //       $(".section_nav ul li:nth-child(3)").addClass(AC);
  //     }
  //     if(2700<scrollY + window.innerHeight/2){
  //       $(".section_nav ul li").removeClass(AC);
  //       $(".section_nav ul li:nth-child(4)").addClass(AC);
  //     }
  //   }else{
  //     $(".section_nav ul li").removeClass(AC);
  //     $(".section_nav ul li:nth-child(1)").addClass(AC);
  //   }
  // });
  
  $(window).on("load scroll", function () {
    $(".section").each(function (i) {
      contTop = $(this)[0].getBoundingClientRect().top
      if (contTop < $(window).height() / 2) {
        $(".section_nav").find("li").eq(i).addClass(AC).siblings().removeClass(AC)
      } else {
        $(this).removeClass(AC)
      }
    })
  })
  $(".section_nav").find("li>a").on("click", function (e) {
    $("html,body").stop().animate({
      scrollTop: $(this.hash).offset().top
    }, 800)
    e.preventDefault()
  })


  const images = [...document.querySelectorAll(".image-grid img")];

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
  
  const getMousePosition = e => {
    let posX = e.clientX;
    let posY = e.clientY;
  
    return {
      x: posX,
      y: posY
    };
  };
  
  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener("mousemove", e => (mousePos = getMousePosition(e)));
  
  gsap.fromTo('img', {
      scale: 1.2,
      autoAlpha: 0,
      ease: 'power3.inOut',
  }, {
      scale: 1,
      autoAlpha: 1,
      stagger: 0.1,
      duration: 2.5,
  })
  
  images.forEach(img => {
    let values = { x: 0, y: 0 };
    const xStart = gsap.utils.random(16, 64);
    const yStart = gsap.utils.random(-16, 64);
  
    const render = () => {
      values.x = lerp(
        values.x,
        map(mousePos.x, 0, window.innerWidth, -xStart, xStart),
        0.07
      );
  
      values.y = lerp(
        values.y,
        map(mousePos.y, 0, window.innerHeight, -yStart, yStart),
        0.07
      );
      gsap.set(img, { x: values.x, y: values.y });
  
      requestAnimationFrame(render);
    };
      render();
  });

});