let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
    function fetchToys() {
      return fetch('http://localhost:3000/toys')
        .then(response => response.json())
        .then(toys => renderToys(toys))
        .catch(error => console.error('Error fetching toys:', error));
    }

    const toyForm = document.querySelector('.add-toy-form');
    toyForm.addEventListener('submit', event => {
      event.preventDefault();

      const toyName = event.target.name.value;
      const toyImage = event.target.image.value;

      const newToy = {
        name: toyName,
        image: toyImage,
        likes: 0
      };

      fetch('http://localhost:3000/toys',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newToy)
      })
      .then(response => response.json())
      .then(toy => {
        renderToy(toy);
      })
      .catch(error => console.error('Error adding toy:', error));
    })

  
    function renderToys(toys) {
      const toyCollection = document.getElementById('toy-collection');
      toyCollection.innerHTML = '';
  
      toys.forEach(toy => {
        const toyCard = document.createElement('div');
        toyCard.className = 'card';
  

        const toyName = document.createElement('h2');
        toyName.textContent = toy.name;
  

        const toyImage = document.createElement('img');
        toyImage.src = toy.image;
        toyImage.className = 'toy-avatar';
  

        const toyLikes = document.createElement('p');
        toyLikes.textContent = `${toy.likes} Likes`;
  

        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.id = toy.id;
        likeButton.textContent = 'Like';
  

        toyCard.append(toyName, toyImage, toyLikes, likeButton);
        toyCollection.appendChild(toyCard);
      });
      
      
      function handleLike(toy, toyLikesElement) {
          const newLikes = parseInt(toyLikesElement.getAttribute('data-likes)')) + 1;

          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({likes: newLikes })
          })
          .then(response => response.json())
          .then(updatedToy => {
            toyLikesElement.textContent = `${updatedToy.likes} Likes`;
            toyLikesElement.setAttribute('data-likes', updatedToy.likes);
          })
          .catch(error => console.error('Error updating likes:', error));
      }
    }
  
    fetchToys();
  });

