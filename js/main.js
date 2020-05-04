/* -----------------------------------------------------------
 * リサイズタイマー(リサイズ時の処理) 
----------------------------------------------------------- */

let resizeTimer;

window.addEventListener('resize', () => {
	//resizeTimerがセットされていればタイマーを解除して、改めてタイマーをセットしなおす。
	if(resizeTimer != null){
		clearTimeout(resizeTimer);
	}
	//1000ミリ秒後に関数を実行するタイマーをセット。
	resizeTimer = setTimeout(() => {
    footerAdjust(); // フッターの位置調整
    toTopAppear();
	}, 1000);
});

/* -----------------------------------------------------------
 * 読み込まれた時、リロード時の処理
----------------------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => { // DOMアクセスできるタイミングで実行
  footerAdjust(); // フッターの位置調整
  toTopAppear();
});

/* -----------------------------------------------------------
 * Adjustment for footer position
----------------------------------------------------------- */
// mainのコンテンツがfooterの下へ潜り込むことを防止する。
function footerAdjust(){
  const footer = document.querySelector('footer'),
        body = document.querySelector('body');
  let footerHeight = getComputedStyle(footer).height;

  body.style.paddingBottom = footerHeight;
}

/* -----------------------------------------------------------
 * humburger menu
----------------------------------------------------------- */

function hamburger() {
  const hamButton = document.querySelector('.hamburger-menu'),
        hamNav = document.querySelector('#hamburger-nav'),
        mediaQuery860 = matchMedia('(min-width: 860px)');

  hamButton.addEventListener('click', () => {
    let check = hamNav.classList.contains('active');
    if(check === true) {
      hamButton.classList.remove('active');
      hamNav.classList.remove('active');
    } else {
      hamButton.classList.add('active');
      hamNav.classList.add('active');
    }
  });

  mediaQuery860.addListener(hamMediaQuery);

  function hamMediaQuery() {
    if(mediaQuery860.matches === true) {
      hamButton.classList.remove('active');
      hamNav.classList.remove('active');
    }
  }
}
hamburger();

/* -----------------------------------------------------------
 * accordion menu
----------------------------------------------------------- */

function menu() {
  const switchList = document.querySelectorAll('#menu .switch'),
        switchArray = [],
        menuMore = document.querySelector('#menu .more-red');

  let accordionCheck = close;

  menuMore.addEventListener('click', (event) => {
    event.preventDefault();

    if(accordionCheck === close) {
      accordionCheck = open;
      menuMore.innerHTML = 'close';
      for(i = 0; i < switchList.length; i++) {
        switchList[i].classList.add('active');
      }
    } else {
      accordionCheck = close;
      menuMore.innerHTML = 'more';
      for(i = 0; i < switchList.length; i++) {
        switchList[i].classList.remove('active');
      }
    }
  });
}
menu();

/* -----------------------------------------------------------
 * スクロールの禁止・許可
----------------------------------------------------------- */

function scrollBanned(){
	document.addEventListener('wheel', scrollProhibited, {passive: false});
	document.addEventListener('touchmove', scrollProhibited, {passive: false});
}
function scrollPermitted(){
	document.removeEventListener('wheel', scrollProhibited, {passive: false});
	document.removeEventListener('touchmove', scrollProhibited, {passive: false});
}
function scrollProhibited(event){
	event.preventDefault();
}

/* -----------------------------------------------------------
 * overlay photo
----------------------------------------------------------- */

function overlay() {
  const menuList = document.querySelectorAll('#menu li'),
        imgList = document.querySelectorAll('#menu li img'),
        overlay = document.querySelector('.overlay'),
        overlayAnchor = overlay.querySelector('a'),
        overlayImg = overlay.querySelector('img');

  //trigger領域調整
  menuList.forEach( (targetList) => {
    targetList.addEventListener('click', () => {
      event.preventDefault();
    });
  });

  //overylay open用の処理
  imgList.forEach( (targetImg) => {
    targetImg.addEventListener('click', () => {
      event.preventDefault();
      overlayImg.src = targetImg.src.replace('thumbnail/', '').replace('-thumbnail.jpg', '.jpg');
      overlay.classList.add('active');
      scrollBanned();
    });
  });

  //close用の処理
  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    scrollPermitted();
  });
  overlayAnchor.addEventListener('click', (event) => {
    event.preventDefault();
    overlay.classList.remove('active');
    scrollPermitted();
  });
}
overlay();

/* -----------------------------------------------------------
 * スクロールの検知
----------------------------------------------------------- */

let scrollTimer;

window.addEventListener('scroll', () => {
	//scrollTimerがセットされていればタイマーを解除して、改めてタイマーをセットしなおす。
	if(scrollTimer != null){
		clearTimeout(scrollTimer);
	}
	//100ミリ秒後に関数を実行するタイマーをセット。
	scrollTimer = setTimeout(() => {
		toTopAppear();
	}, 100);
});

/* -----------------------------------------------------------
 * smooth scroll top
----------------------------------------------------------- */

const toTop = document.querySelector('#arrowTop');

toTop.addEventListener('click', moveTop);
toTop.addEventListener('touchstart', moveTop);

function moveTop(event){
	event.preventDefault();
	
	let currentScroll = window.scrollY,
		decelerationRate = 0.1;
	
	progressTimer = setInterval(updateProgress, 1000 / 60); // 1/60秒で処理
	
	function updateProgress(){
		currentScroll -= currentScroll * decelerationRate;
		window.scrollTo(0, currentScroll);
		
		if(currentScroll < 2){
			clearInterval(progressTimer);
			window.scrollTo(0, 0);
			return;
		}
	}
}

/*------------- to-page-top button on/off ---------------------- */

function toTopAppear(){
	let currentScroll = window.scrollY;

	if(currentScroll < 500){
		toTop.style.opacity = '0';
		toTop.style.visibility = 'hidden';
	} else {
		toTop.style.opacity = '1';
		toTop.style.visibility = 'visible';
	}
}
toTopAppear();