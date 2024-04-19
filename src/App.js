import { FormBreaker } from './modules/FormBreaker';

const App = () => {
  const currentScript = document.currentScript;
  window.addEventListener('load', (e) => {
    FormBreaker(currentScript);
  });
};

export default App;
