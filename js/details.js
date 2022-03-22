// javascript for details.html


const id = new URLSearchParams(window.location.search).get('id')
const container = document.querySelector('.details')
const deleteBtn = document.querySelector('.delete')

const renderDetails = async() => {
const res = await fetch('https://json-web.herokuapp.com/blogs/' + id)
const post = await res.json()
const template = `
<div class="detail">
<h2>${post.title}</h2>
<p> <small>${post.likes} likes</small> </p>
<p>${post.body}</p>
 </div>
 `
 container.innerHTML = template
}

// DELETING A BLOG

deleteBtn.addEventListener('click', async (e)=> {
    const res = await fetch('https://json-web.herokuapp.com/blogs/' + id,{
        method: 'DELETE'
    })
    window.location.replace('/index.html')
})

window.addEventListener('DOMContentLoaded',()=> renderDetails())