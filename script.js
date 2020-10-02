// Grab all the element from html
const form = document.querySelector('.form');
const teaTopic = document.querySelector('.tea-topic');
const pastTopic = document.querySelector('.past-topic');
// Grap the url of the API
const endpiont = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json'

async function fetchData() {
  // fetch the API 
  const response = await fetch(endpiont);
  const data = await response.json();
  console.log(data);
  let newTopic = [];
  newTopic = data;

  // mapping and add html 
  function displayData() {
    const html = newTopic.map(topic  => {
      return `
    <article data-id="${topic.id}">
        <p>${topic.title}</p>
        <button type="submit" class="submit">
             <img src="./archive.png" alt="">
        </button>
        <div class ="button">
          <button type="button" data-id="${topic.id} class ="increment-score">
             <img src="./thumb-up.png" alt="">
          </button>
                <p class = "number">
                  ${topic.upvotes}
                </p>
                <button type="button" data-id="${topic.id} class ="increment-score">
                  <img src="./thumb-down.png" alt="">
                </button>
                <p class = "number"> 
                  ${topic.downvotes}
                </p>
         </div>
    </article>
   `
    }).join(' ');
    teaTopic.innerHTML = html;
  }
// Take the input value from html
  const addNewTopic = (e) => {
    e.preventDefault();
    const forElm = e.currentTarget;
    console.log(e.currentTarget);
    const listnewTop = {
      title: forElm.newtopic.value,
      upvotes: 0,
      downvotes: 0,
      id : Date.now(),
    }
    newTopic.push(listnewTop);
    displayData();
    form.reset();
    teaTopic.dispatchEvent(new CustomEvent('topicUpdate'));
  }
  form.addEventListener('submit', addNewTopic);
  
  const handleClick = e => {
    console.log(e.target);
    if (e.target.closest('button.increment-score')) {
      const button = e.target.closest('button.increment-score');
      console.log(button);
      const id = button.dataset.id;
      rateTopic(Number(id));
    }
  };

  
  const rateTopic = async id => {
    console.log(id);
    const score = await newTopic.find(topic => topic.id === id);
    teaTopic.dispatchEvent(new CustomEvent('topicUpdate'));
  }

  console.log(rateTopic());
  teaTopic.addEventListener('click', handleClick);
  // add local storage 
  const initLocalStorage = () => {
    const teaTopicList = JSON.parse(localStorage.getItem('newTopic'));
    if (teaTopicList) {
      newTopic = teaTopicList;
      teaTopic.dispatchEvent(new CustomEvent('topicUpdate'));
    }
  };
  // update the local storage 
  const updateLocalStorage = () => {
    localStorage.setItem('newTopic', JSON.stringify(newTopic));
  };

  teaTopic.addEventListener('click', updateLocalStorage);
  window.addEventListener('DOMContentLoaded', addNewTopic);
  initLocalStorage();
  displayData();
}
fetchData();