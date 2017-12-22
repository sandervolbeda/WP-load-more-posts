jQuery(document).ready(function($){

    // ID of the button to load more posts
    $('#loadmore').on('click', function(e){
        e.preventDefault();

        // Target the containers of posts that should be displayed.
        // Change the slice number to for example .slice(0, new number)
        // to display more posts with the load more button.
        $('.post-container.hidden').slice(0,9).slideDown('slow').removeClass('hidden');

        // Uncomment console log to check if you get enough posts to display.
        // console.log(checkItems());
        // If you don't get enough posts, try to check in the WP-admin ->
        // Settings -> Reading and adjust how many posts a page should show
        // to 999999 or so.

        // Checks how many items there are hidden on the page. If there
        // are no hidden items this hides the button.
        if (checkItems() === 0) {
            $('.loadmore-container').hide();
        }
    });

    // This is the function to check the number of hidden items to show or
    // not show the load more button.
    var checkItems = function() {
        return $('.post-container.hidden').length;
    };
});