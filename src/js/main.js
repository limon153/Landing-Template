jQuery(document).ready(function( $ ) {
  var $menu = $("#my-menu").mmenu({
    "slidingSubmenus": false,
    "extensions": [
       "pagedim-black",
       "theme-dark"
    ],
    "offCanvas": {
       "position": "right"
    },
    "navbars": [
       {
          "position": "bottom",
          "content": [
            '<a href="#" class="fa fa-facebook"></a>',
            '<a href="#" class="fa fa-twitter"></a>',
            '<a href="#" class="fa fa-skype"></a>',
            '<a href="#" class="fa fa-linkedin"></a>'
          ]
       }
    ]
 });

  var $icon = $("#my-icon");
  var API = $menu.data( "mmenu" );
  
  $icon.on( "click", function() {
    API.open();
  });
  
  API.bind( "open:finish", function() {
    setTimeout(function() {
      $icon.addClass( "is-active" );
    }, 100);
  });
  API.bind( "close:finish", function() {
    setTimeout(function() {
      $icon.removeClass( "is-active" );
    }, 100);
  });
});