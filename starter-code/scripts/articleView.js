//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};


articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      /* DONE: If the select box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was aselected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
      $('article').hide();
      var temp = $(this).val();
      $('article').each(function(){
        if($(this).attr('data-attribute') === temp) {
          $(this).fadeIn();
        }
      });
    } else {
    /* Otherwise, we should:
        1. Show all the articles except the template */
      $('article').not('.template').fadeIn();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  /* Done: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
  $('#category-filter').on('change', function(){
    if($(this).val()){
      $('article').hide();
      var temp = $(this).val();
      $('article').each(function(){
        if($(this).attr('data-category') === temp){
          $(this).fadeIn();
        }
      });
    } else {
      $('article').not('template').fadeIn();
    }
    $('#author-filter').val('');
  })
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* Done:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
    var tempSelector = $(this).attr('data-content')
    if(tempSelector === 'articles'){
      $('#about').hide();
      $('#articles').fadeIn();
    }
    if(tempSelector === 'about'){
      $('#articles').hide();
      $('#about').fadeIn();
    }
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  /* Done: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!

    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  */
  $('.read-on').on('click', function(event){
    event.preventDefault();
    var holder = $(this).parent().attr('data-attribute');
    $('article').each(function(){
      if($(this).attr('data-attribute') === holder){
        $(this).find('.article-body *:nth-of-type(n+2)').fadeIn();
        $(this).find('.read-on').text('Show Less');
        $(this).find('.read-on').off('click');
        $(this).find('.read-on').on('click',articleView.shownTeasers);
      }
    })
  })
};

articleView.shownTeasers = function(event) {
  event.preventDefault();
  var holder = $(this).parent().attr('data-attribute');
  $('article').each(function(){
    if($(this).attr('data-attribute') === holder){
      $(this).find('.article-body *:nth-of-type(n+2)').hide();
      $(this).find('.read-on').text('Read on');
      window.scrollTo(0, $(this).position().top);
      $(this).find('.read-on').off('click');
      articleView.setTeasers();
    }
  });
}

// Done: Invoke all of the above functions (I mean, methods!):
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
