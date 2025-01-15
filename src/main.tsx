import ReactDOM from 'react-dom/client'
import '@/assets/css/main.css'
import Layout from '@/Layout/default'
import { Provider } from './Provider'
import { GitHubUserProvider } from '@/context/GithubUserContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider>
        <GitHubUserProvider username="PentSec">
            <Layout />
        </GitHubUserProvider>
    </Provider>
)
