// タブレット表示
// $(function () {
//   var ua = navigator.userAgent;
//   if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPod") > 0 || (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)) {
//     $("head").prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
//   } else {
//     $("head").prepend('<meta name="viewport" content="width=1050">');
//   }
// });

// ハンバーガーメニュー
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
});

// 製品一覧スライダー

const swiper = new Swiper(".swiper", {
  loop: true,
  spaceBetween: "24px", // スライド間の余白
  grabCursor: true, // カーソルを置いたときに指のカーソルを表示
  centeredSlides: true, // アクティブなスライドを中央にする
  slidesPerView: "auto",
  loopedSlides: 3,

  autoplay: {
    delay: 3000, // 3秒ごとにスライド
  },

  breakpoints: {
    0: {
      // spaceBetween: 20,
      slidesPerView: "auto",
    },

    430: {
      spaceBetween: 24,
      slidesPerView: "auto",
    },
  },
});

// FAQアコーディオン

jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
  } else {
    jQuery(this).parent().addClass("is-open");
  }
});

let accordionDetails = ".js-accordion";
let accordionSummary = ".js-summary";
let accordionContent = ".js-content";
let speed = 200;

$(accordionSummary).each(function () {
  $(this).on("click", function (event) {
    // デフォルトの挙動を無効化
    event.preventDefault();
    if ($(this).parent($(accordionDetails)).attr("open")) {
      // アコーディオンを閉じるときの処理
      $(this)
        .nextAll($(accordionContent))
        .slideUp(speed, function () {
          // アニメーションの完了後にopen属性を取り除く
          $(this).parent($(accordionDetails)).removeAttr("open");
          // display:none;を消して、ページ内検索にヒットするようにする
          $(this).show();
        });
    } else {
      // アコーディオンを開くときの処理
      // open属性を付ける
      $(this).parent($(accordionDetails)).attr("open", "true");
      // いったんdisplay:none;してからslideDownで開く
      $(this).nextAll($(accordionContent)).hide().slideDown(speed);
    }
  });
});

$(function () {
  // #で始まるアンカーをクリックした場合に処理
  $('.s_01 a[href^="#"]').click(function () {
    // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
    var adjust = 0;
    // スクロールの速度
    // var buffer = 100;
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href = $(this).attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? "html" : href);
    // 移動先を調整
    var position = target.offset().top + adjust;
    // スムーススクロール
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

// セクションタイトルのアニメーション

const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    } else {
      // entry.target.classList.remove("is-in-view");
    }
  });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});

// ローディング画面ページ遷移で非表示
$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      /*
        2回目以降アクセス時の処理
      */
      $(".p-loading").addClass("is-active");
    } else {
      /*
        初回アクセス時の処理
      */
      sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
      $("p-loading__logo").addClass("is-active"); // loadingアニメーションを表示
      setTimeout(function () {
        // ローディングを数秒後に非表示にする
        $(".p-loading").addClass("is-active");
        $("p-loading__logo").removeClass("is-active");
      }, 3000); // ローディングを表示する時間
    }
  };
  webStorage();
});

$(".zoomInTrigger").each(function () {
  //zoomInTriggerというクラス名が
  var elemPos = $(this).offset().top - 0; //要素より、50px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight) {
    $(this).addClass("zoomIn"); // 画面内に入ったらzoomInというクラス名を追記
  } else {
    $(this).removeClass("zoomIn"); // 画面外に出たらzoomInというクラス名を外す
  }
});
