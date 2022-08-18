import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ApolloPrivider from './ApolloProvider'



const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  ApolloPrivider
)

reportWebVitals();