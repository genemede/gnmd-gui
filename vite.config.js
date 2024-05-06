import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(async({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    var appenv = env.VITE_APP_ENV
    var baseurl = env.BASE_URL

    // to bypass problem with gh workflow and npm/vite failing to correctly select ghpages env
    // we manually override it here
    if (appenv == "ghpages") {
        baseurl ="gnmd-gui"
    }

    console.log(`Building ENV: ${appenv} with base URL: ${baseurl}`)
    return {
        base: baseurl,
        plugins: [
            vue(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    }
})
