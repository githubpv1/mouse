/*	slider */
$('.slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  var i = (currentSlide ? currentSlide : 0) + 1;
  $('.pagingInfo').html('<span class="pagingInfo_top">' + i + '</span>' + ' / ' +
    '<span class="pagingInfo_bottom">' + slick.slideCount + '</span>');

});

$('.slider').slick({

  prevArrow: $('.prev'), 
  nextArrow: $('.next')
});




/* google.maps */

var styles_Snazzy = [ //  style on Snazzy Maps
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#193341"
    }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
      "color": "#2c5a71"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "color": "#29768a"
      },
      {
        "lightness": -37
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#406d80"
    }]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "color": "#406d80"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
      },
      {
        "color": "#3e606f"
      },
      {
        "weight": 2
      },
      {
        "gamma": 0.84
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#ffffff"
    }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{
        "weight": 0.6
      },
      {
        "color": "#1a3541"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#2c5a71"
    }]
  }
];



/*свой infowindow вариант */

function initMap() {
  INFWOverlay.prototype = new google.maps.OverlayView();

  function INFWOverlay(content, map, point, width) {
    this.width_ = width;
    this.point_ = point;
    this.content_ = content;
    this.map_ = map;

    this.setMap(map);
  }

  INFWOverlay.prototype.onAdd = function () {
    var CIW = this;

    var div = document.createElement('div');
    div.style.border = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    div.classList.add('customInfoWindow');
    div.innerHTML = CIW.content_;

    // кнопка Close  
    var divClose = document.createElement('div');
    divClose.classList.add('close');
    divClose.addEventListener('click', function (e) {
      CIW.toggle();
    });

    div.appendChild(divClose);

    CIW.div_ = div;

    var panes = CIW.getPanes();
    panes.overlayImage.appendChild(CIW.div_);
  };

  INFWOverlay.prototype.draw = function () {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.point_);

    var div = this.div_;
    div.style.left = (sw.x - 0.5 * this.width_) + 'px';
    div.style.top = (sw.y - 120) + 'px'; //минус высота блока и стрелки
    div.style.width = (this.width_) + 'px';
    div.style.height = 'auto';
  };

  INFWOverlay.prototype.hide = function () {
    if (this.div_) {
      this.div_.style.visibility = 'hidden';
    }
  };

  INFWOverlay.prototype.show = function () {
    if (this.div_) {
      this.div_.style.visibility = 'visible';
    }
  };

  INFWOverlay.prototype.toggle = function () {
    if (this.div_) {
      if (this.div_.style.visibility === 'hidden') {
        this.show();
      } else {
        this.hide();
      }
    }
  };


  var myPos = new google.maps.LatLng(55.7992576, 37.5297314);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myPos, //обязатель. Координаты центра
    zoom: 18, //обязатель. Зум по умолчанию. Возможные значения от 0 до 21
    disableDefaultUI: true, //убирает элементы управления
    styles: styles_Snazzy // стилизация цвета если задано
  });

  var marker = new google.maps.Marker({
    position: myPos, // Координаты расположения маркера.
    map: map, // Карта на которую нужно добавить маркер
    //(Необязательно)
    title: "Текст всплывающей подсказки", // Текст выводимый в момент наведения на маркер
    //icon: "img/flash.png" ,            // изображение вместо стандартного маркера
    //animation: google.maps.Animation.DROP // после загрузки карты маркер падает сверху.
  });

  var overlay = new INFWOverlay('<div class="map_info"><span>Наш офис</span>' +
    '<p> Электрозаводская 54,<br> БЦ Колибрис  офис. 543</p></div>',
    map, // карта
    myPos, // точка на карте
    270); // ширина окна

  overlay.show(); //Чтобы информационное окно было видно сразу
  marker.addListener('click', function () { //вызов окна при клике на маркер 
    overlay.show();
  });
}

google.maps.event.addDomListener(window, "load", initMap); //initMap();после загрузки стр.	


//сбрасываем :focus при клике для a и button, но оставляем с клавиатуры

(function () {
  var isMouseDown = false;
  var button = document.querySelectorAll('a, button');
  var isDialog = document.querySelector('[role="dialog"]');

  function func() {
    if (isMouseDown) {
      this.blur();
    }
  }

  for (var i = 0; i < button.length; i++) {
    var el = button[i];
    el.addEventListener('mousedown', function () {
      isMouseDown = true;
      if (isDialog) {
        isKeyClick = false;
      }
    });
    el.addEventListener('mouseup', function () {
      isMouseDown = false;
    });
    if (isDialog) {
      el.addEventListener('keydown', function () {
        isKeyClick = true;
      });
    }
    el.addEventListener('focus', func.bind(el));
  }
}());




/* плавная прокрутка вверх */

(function () {
  var btn_up = document.querySelector('[data-up]');

  function scrollUp() {
    window.scrollBy(0, -80);

    if (window.pageYOffset > 0) {
      requestAnimationFrame(scrollUp);
    }
  }

  var lastScrollPos = 0;
  var start = true;

  function showBtnUp() {
    if (start) {
      start = false;

      setTimeout(function () {
        var scrollPos = window.pageYOffset;

        if (scrollPos > 600 && scrollPos < lastScrollPos) {
          btn_up.classList.add('show');
        } else {
          btn_up.classList.remove('show');
        }
        lastScrollPos = scrollPos;
        start = true;
      }, 200);
    }
  }

  if (btn_up) {
    btn_up.addEventListener('click', scrollUp);
    document.addEventListener('scroll', showBtnUp);
  }
}());


objectFitImages();



