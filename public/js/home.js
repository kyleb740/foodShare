// Smooth scroll to rest of content from title page
$('.scrollButton').click(function(event) {
  var target = $('#section2');
  $('html, body').animate({
    scrollTop: target.offset().top}, 1000);
  });

$('.logCall').click(function(event) {
  var target = $('#flex-wrap');
  $('html, body').animate({
    scrollTop: target.offset().top}, 1000);
  });

// slick slider for info
      $('.info').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        dots: true,
        responsive: [
          {
            breakpoint: 790,      //adds breakpoint to take panels from 3 to 2 at 790 width
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              autoplay: true,
              dots: true
            }
          },
          {
            breakpoint: 490,      //adds breakpoint to take panels from 2 to 1 at 490 width
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              autoplay: true,
              dots: true
            }
          }
      ]
      });

/**
* Fetches data from the api
*/

      function getFiles() {
        return fetch('/api/file')
          .then(response => response.json())
          .then(files => {
            console.log("Files, I got them:", files);
            return files;
          })
          .catch(error => console.error("GETFILES:", error));
      }

/**
* Render a list of files   (only showing food title and description on home page)
*/
      function renderFiles(files) {

        const listItems = files.map(file => `

          <li class="list-group-item">
            ${file.title} - ${file.description}
          </li>`

        );

        const html = `<ul class="list-group">${listItems.join('')}</ul>`;

        return html;
      }

/**
* Fetch files from the API and render to the page
*/
function refreshFileListHome() {
  getFiles()
    .then(files => {

      window.fileList = files;

      const html = renderFiles(files);
      $('#list-container-home').html(html);
    });
}

/**
* Fetch to Post new user account
*/
let newUserCallout

function handleNewUser() {
  console.log("You clicked 'submit'. Congratulations.");
  const userData = {
    name: $('#name').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    password: $('#password').val(),
  };

  const url = '/api/user';

  fetch(url, {
  method: 'POST',
  body: JSON.stringify(userData),
  headers: {
    'Content-Type': 'application/json'
  }
  })
    .then(response => response.json())
    .then(user => {
      newUserCallout = user;
    })
    .catch(err => {
      console.error("A terrible thing has happened", err);
    })

};
