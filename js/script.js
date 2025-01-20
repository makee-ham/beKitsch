$(document).ready(function () {
  // icon hover
  $("img.iconHover").mouseenter(function () {
    $(this).attr("src", $(this).attr("src").replace(".png", "_p.png"));
  });
  $("img.iconHover").mouseleave(function () {
    $(this).attr("src", $(this).attr("src").replace("_p.png", ".png"));
  });

  $(".viewMore p").hover(
    function () {
      $("+ img", this).attr(
        "src",
        $("+ img", this).attr("src").replace(".png", "_p.png")
      );
    },
    function () {
      $("+ img", this).attr(
        "src",
        $("+ img", this).attr("src").replace("_p.png", ".png")
      );
    }
  );

  // 질문: 터치스크린에선 어떻게 해야하지?

  ///////////////////////////
  // submenu
  $(".navi li:first-of-type, .subCategories").mouseover(function () {
    $(".subCategories").addClass("active");
  });
  $(".navi li:first-of-type, .subCategories").mouseout(function () {
    $(".subCategories").removeClass("active");
  });

  ///////////////////////////
  // text slide (GPT가 함)
  $(document).ready(function () {
    const $ul = $(".tsUl");
    const $li = $(".tsUl li");
    const liWidth = $li.outerWidth(true); // li의 너비 (margin 포함)

    // ul의 맨 앞과 맨 뒤에 li 복제
    $ul.prepend($li.last().clone()); // 마지막 li를 맨 앞에 복제
    $ul.append($li.first().clone()); // 첫 번째 li를 맨 뒤에 복제

    // 초기 위치 설정 (복제된 첫 번째 요소만큼 왼쪽으로 이동)
    $ul.css("transform", `translateX(-${liWidth}px)`);

    // 슬라이드 함수
    function slideContinuously() {
      $ul.animate(
        { left: `-=${liWidth}px` }, // li의 너비만큼 이동
        1000, // 애니메이션 시간
        "linear", // 부드러운 움직임
        function () {
          // 슬라이드 끝 도달 시 위치 초기화
          $ul.append($(".tsUl li:first")); // 첫 번째 li를 끝으로 이동
          $ul.css("left", `0`); // ul의 위치 초기화
          slideContinuously(); // 재귀 호출로 이어짐
        }
      );
    }

    slideContinuously(); // 슬라이드 시작
  });

  ///////////////////////////
  // recommend section (GPT가 함)
  const board = document.querySelector(".recommendBoard");
  const images = document.querySelectorAll(".recoCircle img");
  const links = document.querySelectorAll(".recoCircle");
  let isDragging = false; // 드래그 상태
  let startX = 0; // 드래그 시작 X 좌표
  let currentTranslate = 0; // 현재 위치
  let previousTranslate = 0; // 이전 위치
  let dragDistance = 0; // 드래그 거리

  // 드래그 시작
  function startDrag(event) {
    isDragging = true;
    startX = getEventX(event);
    board.style.transition = "none"; // 드래그 중에는 애니메이션 비활성화
    board.style.cursor = "grabbing";
    dragDistance = 0; // 드래그 거리 초기화
  }

  // 드래그 중
  function drag(event) {
    if (!isDragging) return;
    const currentX = getEventX(event);
    dragDistance = currentX - startX; // 드래그 거리 계산
    currentTranslate = previousTranslate + dragDistance;
    board.style.transform = `translateX(${currentTranslate}px)`;
  }

  // 드래그 종료
  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    board.style.cursor = "grab";

    // 슬라이드 범위 보정
    const containerWidth = board.parentElement.offsetWidth;
    const boardWidth = board.offsetWidth;

    if (currentTranslate > 0) {
      currentTranslate = 0; // 왼쪽 경계 보정
    } else if (currentTranslate < containerWidth - boardWidth) {
      currentTranslate = containerWidth - boardWidth; // 오른쪽 경계 보정
    }

    // 부드러운 이동
    board.style.transition = "transform 0.3s ease";
    board.style.transform = `translateX(${currentTranslate}px)`;
    previousTranslate = currentTranslate;

    // 드래그가 아닌 경우에만 링크 클릭 허용
    if (Math.abs(dragDistance) < 5) {
      const targetLink = event.target.closest(".recoCircle"); // 클릭된 요소가 링크인지 확인
      if (targetLink) {
        window.location.href = targetLink.href; // 링크로 이동
      }
    }
  }

  // 링크 클릭 차단 (드래그 중일 때만)
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (Math.abs(dragDistance) >= 5) {
        event.preventDefault(); // 드래그 중이면 클릭 이벤트 차단
      }
    });
  });

  // 이벤트에서 X 좌표 가져오기
  function getEventX(event) {
    return event.type.includes("mouse")
      ? event.clientX
      : event.touches[0].clientX;
  }

  // 이미지 기본 드래그 방지
  images.forEach((img) => {
    img.addEventListener("dragstart", (event) => {
      event.preventDefault(); // 브라우저의 기본 이미지 드래그 방지
    });
  });

  // 이벤트 리스너 등록
  board.addEventListener("mousedown", startDrag);
  board.addEventListener("mousemove", drag);
  board.addEventListener("mouseup", endDrag);
  board.addEventListener("mouseleave", endDrag);

  // 터치 이벤트 처리
  board.addEventListener("touchstart", startDrag);
  board.addEventListener("touchmove", drag);
  board.addEventListener("touchend", endDrag);

  // 초기 커서 스타일
  board.style.cursor = "grab";

  //////////////////////////////////////////////////////
  // tab menu
  $(".tabMenu a").on("click", function () {
    $(this).parent().addClass("active").siblings().removeClass("active");
    let i = $(".tabMenu a").index(this);
    $(`.itemWindow > div:nth-child(${i + 3})`)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  //////////////////////////////////////////////////////
  // to top
  $(".toTop").hide();
  // 버튼 숨김/표시 조건

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 600) {
      $(".toTop").fadeIn(); // 600px 이상 스크롤 시 버튼 표시
    } else {
      $(".toTop").fadeOut(); // 그렇지 않으면 버튼 숨김
    }
  });

  // 버튼 클릭 시 페이지 맨 위로 이동
  $(".toTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500); // 부드러운 스크롤 (0.5초)
  });

  ///////////////////////////////////////////////////////
  // 화면 크기 구하기
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`화면 크기 변경됨: ${width}px x ${height}px`);
  });

  ///////////////////////////////////////////////////////
  // burger spin! + menu open!
  let angle = 0;
  $(".burger").click(function () {
    // spin
    angle += 180; // 각도를 누적
    $(this).css("transform", `rotate(${angle}deg)`); // CSS transform으로 회전

    // menu open
    $(".mainMenuTab").stop().slideToggle();
  });

  ///////////////////////////////////////////////////////
  /* 이미지 슬라이드 하다가 사람 잡아요 */
  const mediaQuery = matchMedia("screen and (max-width: 767.9px)");
  let slideInterval = null; // setInterval을 저장할 변수

  // 모바일 슬라이드 동작 함수
  function startMobileSlideShow() {
    if (!slideInterval) {
      // 중복 실행 방지
      slideInterval = setInterval(function () {
        $(".slideList").animate({ marginLeft: "-200vw" }, 500, function () {
          $(".slideList a:first").appendTo(".slideList");
          $(".slideList").css("margin-left", "-100vw");
        });
      }, 3000);
    }
  }

  // PC 슬라이드 동작 함수
  function startPCSlideShow() {
    clearInterval(slideInterval); // 기존 모바일 슬라이드 멈춤
    slideInterval = null; // 변수 초기화

    $(".nextSlide")
      .off("click") // 기존 이벤트 제거
      .on("click", function () {
        $(".slideList").animate({ marginLeft: "-180vw" }, 500, function () {
          $(".slideList a:first").appendTo(".slideList");
          $(".slideList").css("margin-left", "-90vw");
        });
      });

    $(".prevSlide")
      .off("click") // 기존 이벤트 제거
      .on("click", function () {
        $(".slideList a:last").prependTo(".slideList");
        $(".slideList").css("margin-left", "-180vw");
        $(".slideList").animate({ marginLeft: "-90vw" }, 500);
      });
  }

  // 화면 크기 변화에 따른 슬라이드 동작
  function startSlideShow() {
    clearInterval(slideInterval); // 기존 동작 정리
    slideInterval = null; // 중복 방지

    if (mediaQuery.matches) {
      // 모바일 화면일 때
      startMobileSlideShow();
    } else {
      // PC 화면일 때
      startPCSlideShow();
    }
  }

  // 탭 활성화/비활성화 이벤트 관리
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      // 탭이 비활성화될 때 슬라이드 중지
      clearInterval(slideInterval);
      slideInterval = null;
    } else if (document.visibilityState === "visible") {
      // 탭이 다시 활성화되었을 때 슬라이드 재개
      startSlideShow();
    }
  });

  // 화면 크기 변화 이벤트 리스너 추가
  mediaQuery.addEventListener("change", () => {
    startSlideShow(); // 새로운 동작 실행
  });

  // 초기 실행
  startSlideShow();

  ///////////////////////////////////////////////
  // owl carousel
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 1, // 한번에 보여지는 이미지 수
    dots: true, // 초기화...
    loop: true, // 항목들을 무한으로 반복하여 보여줄지 여부
    autoplay: true, // 자동으로 슬라이드 쇼를 시작할지 여부
    autoplayTimeout: 3000, // 다음 이미지로 넘어가는 시간 (단위 : 밀리초)
    autoplayHoverPause: true, // 마우스가 이미지에 위에 있을 때 자동 슬라이드를 일시중지 할지 여부
  });
});
