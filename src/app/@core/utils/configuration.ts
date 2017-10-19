export class Configuration {
    static get Server(): string {
        const hostname = window.location.origin ? window.location.origin
            : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        if (hostname.includes("localhost"))
            return "http://www.tourine.ir";
        return hostname;
    }

    static ApiUrl = Configuration.Server + "/api/";
}
