import { createApp } from 'vue'
import HighlightItComponent from '../src/component'
import HighlightItDirective from '../src/directive'
import App from './index.vue'

createApp(App).use(HighlightItComponent).use(HighlightItDirective).mount('#app')
