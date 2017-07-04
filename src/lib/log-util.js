import config from '../appConfig'

export function log(content) {
    if (config.env.active == config.env.dev) {
        log(content);
    }
}
