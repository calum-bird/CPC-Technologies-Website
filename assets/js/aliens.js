// The URLs that you want to embed.
var urls = [
    'https://gph.is/18wFkAS',
    'https://gph.is/20mTpBu',
    'https://gph.is/2m0JJfA',
    'https://gph.is/1bkotVs',
    'https://gph.is/2eeBhGn',
    'https://gph.is/XLayUC',
    'https://gph.is/2FF0pAM',
    'https://gph.is/2bg9mUq',
    'https://gph.is/2pVSlbg',
    'https://gph.is/1mTSdwm',
    'https://gph.is/1sEOjS0',
    'https://gph.is/g/Zx1D9Dz',
    'https://gph.is/g/ZyP6B6N',
    'https://gph.is/1NyKgjw',
    'https://gph.is/1VQolHI'
  ]
  
  $grid = $('.grid');
  
  // Use jQuery Embedly to make the API Calls.
  $.embedly.oembed(urls, {
      key: '1d5c48f7edc34c54bdae4c37b681ea2b' // replace with your API KEY.
    })
    .then(function(oembeds) {
        // Iterate over the results and add them to the grid.
      oembeds.forEach(function(oembed) {
        var $item = $('<div class="grid-item"></div>');
        // Video Types.
        if (oembed.type === 'video' || oembed.type === 'rich') {
          // Makes the video responsive.
          $resp = $('<div class="resp-media"></div>');
          var ratio = ((oembed.height / oembed.width) * 100).toPrecision(4) + '%'
          $resp.css({
            paddingBottom: ratio
          });
                  
          // Add it to and item.
          $resp.html(oembed.html);
          $item.append($resp);
        } else if (oembed.type === 'photo') { // Images
          $item.html('<img src="' + oembed.url + '"/>');
        } else if (oembed.type === 'link') {
          $item.html([
            '<img src="' + oembed.thumbnail_url + '"/>',
            '<h4>' + oembed.title + '</h4>',
            '<p>' + oembed.description + '</p>'
          ].join(''));
        } else {
            // error case.
          return false;
        }
        // Add the item to the grid.
        $grid.append($item);
      });
    })
    .then(function() {
        // tell masonry to do it's thing.
      $grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: 300
      });
      // layout Masonry after each image loads
      $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
      });
    });