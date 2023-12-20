// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.


const input = document.getElementById('number');

input.addEventListener('change', () => {
  
    async function getFile(url) {
        try {
            let request = await fetch(url);
            if (input.value >= 0 && input.value <= 100) {
                const response = request.ok ? await request.json() : Promise.catch(response.statusText);
                return response;
            }
        } catch (error) {
            alert('Error!!!', error);
        }
    }
    
    getFile(`https://jsonplaceholder.typicode.com/posts/${input.value}`)
    .then(response => {
        const newDiv = document.getElementById('post__block').innerHTML = `
       <h2>ID Post: ${response.id}</h2>
       <h3>${response.title}</h3>
       <p>${response.body}</p>
       `;

       const button = document.getElementById('comment__btn');

        button.innerHTML = 'Отримати коментарі';
        button.onclick = () => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${input.value}/comments`)
                .then(response => response.json())
                .then(data => {
                    let comments = document.createElement('div');
                    comments.id = 'comments';
                    data.forEach(comment => {
                        let commentDiv = document.createElement('div');
                        commentDiv.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
                        comments.appendChild(commentDiv);
                    });
                    document.body.appendChild(comments);
                })
                .catch(error => console.log('Error:', error));
        };
       
        
    })
    .catch(error => console.log('Error:', error));
  
})


