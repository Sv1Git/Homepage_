//import App from './src/javascript/app';
//import './src/styles/styles.css';
const BASE_API_URL = 'https://api.github.com/repos/oleksandr-danylchenko/street-fighter/contents/resources/api/fighters.json';
const SECURITY_HEADERS = {
  headers: {
        authorization: "token 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"
    }
};

const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');
const fightersDetailsMap = new Map();

element.addEventListener('click', (event) => handleFighterClick(event, fighter), false)

 async function startApp() {
    async function startApp() {
        try {
          loadingElement.style.visibility = 'visible';
      
          const endpoint = 'repos/oleksandr-danylchenko/street-fighter/contents/resources/api/fighters.json';
          const fighters = await callApi(endpoint);
      
          rootElement.innerText = getFightersNames(fighters);
        } catch (error) {
          console.warn(error);
          rootElement.innerText = 'Failed to load data';
        } finally {
          loadingElement.style.visibility = 'hidden';
        }
      }
      
      function callApi(endpoint, method = 'GET') {
        const url = BASE_API_URL + endpoint;
        const options = { method, ...SECURITY_HEADERS };
      
        return fetch(url, options)
          .then(response =>
            response.ok
              ? response.json()
              : Promise.reject(Error('Failed to load'))
          )
          .then(file => JSON.parse(atob(file.content)))
          .catch(error => { throw error });
      }

      function createElement({ tagName, className = '', attributes = {} }) {
        const element = document.createElement(tagName);
        element.classList.add(className);
          
        Object
          .keys(attributes)
          .forEach(key => element.setAttribute(key, attributes[key]));
      
        return element;
      }

  function createName(name) {
    const nameElement = createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;
  
    return nameElement;
  }
  
  function createImage(source) {
    const attributes = { src: source };
    const imgElement = createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });
  
    return imgElement;
  }
  function createFighter(fighter) {
    const { name, source } = fighter;
    const nameElement = createName(name);
    const imageElement = createImage(source);
    const element = createElement({ tagName: 'div', className: 'fighter' });
  
    element.append(imageElement, nameElement);
    
    element.addEventListener('click', (event) => handleFighterClick(event, 'wrapper'), false)
    imageElement.addEventListener('click', (event) => handleFighterClick(event, 'image'), false)
    
    function handleFighterClick(event, el) {
      console.log(el);
    }
    return element;
  }
  function createFighters(fighters) {
    const fighterElements = fighters.map(fighter => createFighter(fighter));
    const element = createElement({ tagName: 'div', className: 'fighters' });
  
    element.append(...fighterElements);
  
    return element;
  };
 }

startApp();
