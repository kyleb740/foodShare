/**
 * Fetches data from the api
 */

function getFiles() {
  return fetch('/api/account')
    .then(response => response.json())
    .then(files => {
      console.log("Files, I got them:", files);
      return files;
    })
    .catch(error => console.error("GETFILES:", error));
}

/**
  * Gets contact phone # to send text to user that has food
  */

// function contact() {}


/**
 * Render a list of files
 */
function renderFiles(files) {

  const listItems = files.map(file => `

    <li class="list-group-item">
      <strong>${file.title}</strong> - ${file.description} - ${file.expiration} - ${file.user}
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-file-id="${file._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteFileClick(this)" data-file-id="${file._id}">Del</button>
      </span>
    </li>`

  );

  const html = `<ul class="list-group">${listItems.join('')}</ul>`;
  return html;
}

/* edit button functionality */
function handleEditFileClick(element) {
  const fileId = element.getAttribute('data-file-id');

  const formHtml =
      `<div id="form-container" class="panel">
          <form id="add-file-form">
            <input type="hidden" id="file-id" value="" />

            <legend id="form-label">Edit File</legend>
            <div class="form-group">
              <label for="file-title">Title</label>
              <input type="text" class="form-control" id="file-title" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="file-description">Description</label>
              <input type="text" class="form-control" id="file-description" placeholder="Description">
            </div>
            <div class="form-group">
              <label for="file-expiration">Expiration Date</label>
              <input type="text" class="form-control" id="file-expiration" placeholder="If no Exp then date bought">
            </div>
            <div class="form-group">
              <label for="file-user">Username</label>
              <input type="text" class="form-control" id="file-user" placeholder="FoodShare Username">
            </div>
            <button type="button" onclick="submitFileForm()" class="btn btn-success">Submit</button>
            <button type="button" onclick="cancelFileForm()" class="btn btn-link">Cancel</button>
          </form>
        </div>`;

  const file = window.fileList.find(file => file._id === fileId);
  if (file) {
    $('#modal').html(formHtml).modal();
    setForm(file)
  }
}

function setForm(data) {
  data = data || {};

  const file = {
    title: data.title || '',
    description: data.description || '',
    _id: data._id || '',
    expiration: data.expiration || '',
    user: data.user || '',
  };

  $('#file-title').val(file.title);
  $('#file-description').val(file.description);
  $('#file-id').val(file._id);
  $('#file-expiration').val(file.expiration);
  $('#file-user').val(file.user);

}

function setAddForm(data) {
  data = data || {};

  const file = {
    title: data.title || '',
    description: data.description || '',
    _id: data._id || '',
    expiration: data.expiration || '',
    user: data.user || '',
  }
  $('#file-title-add').val(file.title);
  $('#file-description-add').val(file.description);
  $('#file-id-add').val(file._id);
  $('#file-expiration-add').val(file.expiration);
  $('#file-user-add').val(file.user);
};

/**
 * Fetch files from the API and render to the page
 */
function refreshTable() {
  getFiles()
    .then(files => {

      var table = $('#example').DataTable();

      table.ajax.reload( function ( json ) {
      $('#myInput').val( json.lastInput );
      } );
    });
}

function refreshFileList() {
  getFiles()
    .then(files => {
      window.fileList = files;

      const html = renderFiles(files);
      $('#list-container').html(html);
    });
}



/** buttons for form */

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
  const fileData = {
    title: $('#file-title').val(),
    description: $('#file-description').val(),
    _id: $('#file-id').val(),
    expiration: $('#file-expiration').val(),
    user: $('#file-user').val(),
  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  fetch(url, {
  method: method,
  body: JSON.stringify(fileData),
  headers: {
    'Content-Type': 'application/json'
  }
  })
    .then(response => response.json())
    .then(file => {
      console.log("we have posted the data", file);
      setForm();
      $.modal.close();
      refreshTable();
      refreshFileList();
    })
    .catch(err => {
      console.error("A terrible thing has happened", err);
    })

  console.log("Your file data", fileData);
}

function submitAddFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
  const fileData = {
    title: $('#file-title-add').val(),
    description: $('#file-description-add').val(),
    _id: $('#file-id-add').val(),
    expiration: $('#file-expiration-add').val(),
    user: $('#file-user-add').val(),
  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  fetch(url, {
  method: method,
  body: JSON.stringify(fileData),
  headers: {
    'Content-Type': 'application/json'
  }
  })
    .then(response => response.json())
    .then(file => {
      console.log("we have posted the data", file);
      setAddForm();
      refreshTable();
      refreshFileList();
    })
    .catch(err => {
      console.error("A terrible thing has happened", err);
    })

  console.log("Your file data", fileData);
}

function cancelFileForm() {
  setForm();
  setAddForm();
  $.modal.close();
}

function handleDeleteFileClick(element) {
  const fileId = element.getAttribute('data-file-id');

if (confirm("Are you sure?")) {
    deleteFile(fileId);
  }
}

function deleteFile(fileId) {
  const url = '/api/file/' + fileId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("DOOOOOOOOOM!!!!!");
      refreshTable();
      refreshFileList();
    })
    .catch(err => {
      console.error("I'm not dead yet!", err);
    });
}


//* Nutrition API
let globalSearch;
let foodReport;
const mykey = config.API_Key;

  function ingredients() {
    const table = $('#example').DataTable();
    $('#example tbody').on( 'click', 'td', function () {
    let foodItem = table.cell( this ).data();
    console.log(foodItem);

      fetch('https://api.nal.usda.gov/ndb/search/?q=' + foodItem + '&format=json&max=1&api_key=' + mykey)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          globalSearch = myJson;

          let searchNo = globalSearch.list.item["0"].ndbno;
          console.log(searchNo);

          fetch('https://api.nal.usda.gov/ndb/reports/?ndbno=' + searchNo + '&type=f&format=json&api_key=' + mykey)
            .then(function(response) {
              return response.json();
            })
            .then(function(myReport) {
              foodReport = myReport;
              let report = foodReport.report.food.ing.desc;
              $('#modal').text('Ingredients:' + report).modal();
            });
          });



    } );
  }



  // function handleNutritionClick(element) {
  //   const fileTitle = element.getAttribute('data-file-title');
  //   console.log('in handleNutritionClick', fileTitle);
  //   fetch('https://api.nal.usda.gov/ndb/search/?q=' + fileTitle + '&format=json&max=1&api_key=oMX1F2fp47ODPXmZg7LxM5OAq5f78VpVt3zAFyzm')
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       globalSearch = myJson;
  //
  //       let searchNo = globalSearch.list.item["0"].ndbno;
  //       console.log(searchNo);
  //
  //       fetch('https://api.nal.usda.gov/ndb/reports/?ndbno=' + searchNo + '&type=f&format=json&api_key=oMX1F2fp47ODPXmZg7LxM5OAq5f78VpVt3zAFyzm')
  //         .then(function(response) {
  //           return response.json();
  //         })
  //         .then(function(myReport) {
  //           foodReport = myReport;
  //           let report = foodReport.report.food.ing.desc;
  //           $('#modal').text('Ingredients:' + report).modal();
  //         });
  //       });
  //     };
