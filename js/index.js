// javascript for index.html

const container = document.querySelector('.blogs')
const searchForm = document.querySelector('.search')
const input = document.querySelector('.search-input')
const pageList = document.querySelector('.page-list')


// Pagination
let searchterm =''
let totalPosts = 0
let currentPage = 1
const postPerPage = 3

const renderPosts = async (term)=> {
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc'
  if(term){
    uri += `&q=${term}`
  }
  const res = await fetch(uri)
  const posts = await res.json()
  // Number of Posts
  totalPosts =  posts.length
  pagination()
  
  const indexOfLastPost = currentPage*postPerPage
  const indexOfFirstPost = indexOfLastPost-postPerPage

    const currentPosts = await posts.slice(indexOfFirstPost,indexOfLastPost)

   let template = '' 
        currentPosts.forEach(post => {
        template += `
         <div class="post">
         <h2>${post.title}</h2>
         <p> <small>${post.likes} likes</small> </p>
         <p>${post.body.slice(0,200)}</p>
         <a href="/details.html?id=${post.id}">read more...</a>
         </div>
         `
    });
    container.innerHTML = template
}

// Showing search results on Submit
searchForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    currentPage = 1
    searchterm = searchForm.term.value.trim()
    renderPosts(searchterm)
  })

// Showing search results

  const searchOnChange = (e) => {
  currentPage = 1
  searchterm = input.value.trim()
  renderPosts(searchterm)
}


// Get Page list
const pagination = () => {
  let pages = ''
    for(let i =1; i<= Math.ceil(totalPosts/postPerPage); i++ ){
       pages += `<li onclick="getCurrentPage(${i})")>${i}</li>`
    }
  pageList.innerHTML = pages
}

// Get current page

const getCurrentPage = (pageNum) => {
    currentPage = pageNum
    renderPosts(searchterm)
}



window.addEventListener('DOMContentLoaded',()=> renderPosts())
