export default (markup, styles) => {
	return `<html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        ${styles}
        <title>MERN Skeleton</title>
      </head>
      <body>
        <div id="root">${markup}</div>
    
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>
    `;
};
