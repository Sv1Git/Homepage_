import App from './src/javascript/app';
import './src/styles/styles.css';
const API_URL = 'https://api.github.com/repos/oleksandr-danylchenko/street-fighter/contents/resources/api/fighters.json';
const SECURITY_HEADERS = {
    headers: {
        authorization: "token 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"
    }
};

const responsePromise=fetch(API_URL, SECURITY_HEADERS);
responsePromise
    .then(response => response.json())
    .then(file => {
        const fighters = JSON.parse(atob(file.content));
        const names = fighters.map(it => it.name);
        console.log(names)
        const namesStr = names.join('\n');
        console.log(namesStr);
    });
App.startApp();
