<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">

    <!-- Force IE to use the latest rendering engine available -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Remove browser styling -->
    <meta name="format-detection" content="telephone=no">

    <!-- Link stylesheet -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

    <!-- Import fonts from Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

</head>

<body>

<h1>Load more WordPress posts with jQuery</h1>
<?php   // Uncomment the have posts loop after you've copied this in your theme file
        // also don't forget to uncomment the the endif and the endwhile of the loop. ?>
<section class="blog-posts">
	<?php
	// Number of the div around the post
	$i = 1;
	// Show this many posts before load more button
	$nr_posts_max = 27;

	// !!!! -- UNCOMMENT START -- !!!!
    //	if ( have_posts() ) {
    //	while ( have_posts() ) {
    //	the_post();
	// !!!! -- UNCOMMENT END -- !!!!

	// If post count is bigger than number of posts that are
	// standard displayed, hide posts with display none
	if ( $i > $nr_posts_max ){

	// Container created to hide posts
	?>
    <div class="post-container <?php if ( $i > $nr_posts_max ) : echo 'hidden'; endif ?>">


        <!-- HTML START -->

		<?php   // Drop your HTML between the HTML start and end comments
                // test if the loop works by uncommenting the title function ?>

        <?php // the_title(); ?>

        <!-- HTML END -->


		<?php
		// Close the post-container div
		if ( $i > $nr_posts_max ) {
			echo "</div>";
		} // End if post container if statement
		} // End if post count bigger than
		// Increase post count
		$i ++;

		// !!!! -- UNCOMMENT START -- !!!!
        // } // End while loop
		// !!!! -- UNCOMMENT END -- !!!!
		?>

		<?php // Load more container ?>
        <div class="loadmore-container">
			<?php // Button to load more posts connected by ID ?>
            <a class="btn small primary" id="loadmore">LOAD MORE</a>
        </div>
</section>
</body>
</html>