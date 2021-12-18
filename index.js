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

function callApi(endpoint, method = 'GET') {
    const url = BASE_API_URL + endpoint;
    const options = { method, ...SECURITY_HEADERS };
  
    return fetch(url, options)
      .then(response =>
        response.ok
          ? response.json()
          : Promise.reject(Error('Failed to load'))
      )
       .catch(error => { throw error });
  }

      class FighterService {
        #endpoint = 'repos/oleksandr-danylchenko/street-fighter/contents/resources/api/fighters.json'
       
        async getFighters() {
          try {
            const apiResult = await callApi(this.#endpoint, 'GET');
            return JSON.parse(atob(apiResult.content));
          } catch (error) {
            throw error;
          }
        }
       }


       const fighterService = new FighterService();



       class View {
        element;
        createElement({ tagName, className = '', attributes = {} }) {
          const element = document.createElement(tagName);
          element.classList.add(className);
          
          Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
      
          return element;
        }
        get element() {
            return this.element;
          }
          
          set element(value) {
            this.element = value;
          }

      }

           
      class FightersView extends View {
        constructor(fighters) {
          super();
      
          this.handleClick = this.handleFighterClick.bind(this);
          this.createFighters(fighters);
        }
      
        createFighters(fighters) {
          const fighterElements = fighters.map(fighter => {
      
            // 1. Class function with context
            const fighterView = new FighterView(fighter, this.handleClick);

            return fighterView.element;
          });
      
          // ...
  
          this.element = this.createElement({ tagName: 'div', className: 'fighters' });
          this.element.append(...fighterElements);
        }
      
        handleFighterClick(event, fighter) {
          this.fightersDetailsMap.set(fighter._id, fighter);
          console.log('clicked')
          // get from map or load info and add to fightersMap
          // show modal with fighter info
          // allow to edit health and power in this modal
        }
      }
      class App {
        static rootElement = document.getElementById('root');
        static loadingElement = document.getElementById('loading-overlay');
      
        static async startApp() {
          try {
            App.loadingElement.style.visibility = 'visible';
      
            const fighters = await fighterService.getFighters();
            const fightersView = new FightersView(fighters);
      
            App.rootElement.appendChild(fightersView.element);
          } catch (error) {
            console.warn(error);
            App.rootElement.innerText = 'Failed to load data';
          } finally {
            App.loadingElement.style.visibility = 'hidden';
          }
        }
      }
      
      App.startApp();