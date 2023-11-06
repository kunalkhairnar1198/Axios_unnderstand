//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
// GET REQUEST
function getTodos() {
  //how to get api data and set the limit in the webpage
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err))
  // console.log('GET Request');

  //shorter and descriptive use than previous method
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
      timeout: 5000
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  // create new todo using postmethod in api
  axios
    .post('https://jsonplaceholder.typicode.com/todos',
      {
        data: {
          title: 'New Todo',
          completed: false
        }
      })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
  //update the data todo updated todo using put and patch
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1',
      {
        title: 'Updated Todo',
        completed: true

      })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  // axios
  //   .put('https://jsonplaceholder.typicode.com/todos/1',
  //     {
  //       title: 'Updated Todo',
  //       completed: true

  //     })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err))
  console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  console.log('DELETE Request');
}

// SIMULTANEOUS DATA
function getData() {
  //how to multiple api call in once click
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.log(err))
  console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Sometoken'
    }
  }

  axios
    .post('https://jsonplaceholder.typicode.com/todos',

      {
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello world'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data
    })
  }
  axios(options).then(res => showOutput(res))
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  //how to error handle in axios in when api link is incorect
  axios.get('https://jsonplaceholder.typicode.com/todoss', {
    validateStatus: function (status) {
      return status < 500; //Reject only if status is greater or equal to 500
    }
  })
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        //Server responded with a status other than 200 range
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)

        if (err.response.status === 404) {
          alert('Error: Page Not Found')
        }
      } else if (err.request) {
        //Request was made but no response
        console.error(err.request)
      } else {
        console.error(err.message)
      }
    })
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos', {
    cancelToken: source.token
  })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request cancelled', thrown.message)
      }
    })
  if (true) {
    source.cancel('Request Canceled!')
  }
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
//get when you fetch data then it will getdate and time to fetch data in console otherwise shows error
axios.interceptors.request.use(
  config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at time ${new Date().getTime()}`)
    return config
  },
  error => { return Promise.reject(error) }

)

// AXIOS INSTANCES
const axiosInstace = axios.create({
  //other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
})
// axiosInstace.get('/comments').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
