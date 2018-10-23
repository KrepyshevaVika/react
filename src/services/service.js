const JSON_DATA = 'application/json';
const host = "http://localhost";
const port = 8080;

const defaultConfig = {
    contentType: JSON_DATA
};

export function checkStatus(response) {

    if (response.ok) {
        if (response.headers.get("Content-Type"))
            return Promise.resolve(response.json());
        else
            return Promise.resolve(response.blob());
    }

    return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}

function ConvertData(contentType, data){
    if(!data) return null;

    switch(contentType){
        case JSON_DATA: 
            return  JSON.stringify(data);
        default:
            return null;
    }
}

export function configurateRequest(config) {
    if (!config.method) throw new Error("Method of request is not defined!");
    
    let fullUrl = `${host}:${port}`;

    if (config.url)
        fullUrl = fullUrl + config.url;

    config.contentType = config.contentType || defaultConfig.contentType;

    let header = {
            method: config.method,
            headers: {
                'content-type': config.contentType
            },
        },
        data = ConvertData(config.contentType, config.data);
    
    if (data) 
        header.body = data;

    return {
        fullUrl: fullUrl,
        header: header,
    }
}

export function request(config) {

    let setting = configurateRequest(config);

    return fetch(setting.fullUrl, setting.header)
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            return data;
        }).catch((error) => {
            return error;
        });
}

export function getTopNodes() {
    return request(
        {
            method: "GET",
            url: "/nodes",
        }
    )
}

export function getNodeById(id) {
    return request(
        {
            method: "GET",
            url: `/nodes/${id}`,
        }
    )
}

export function getNodeChildren(id) {
    return request(
        {
            method: "GET",
            url: `/nodes/${id}/children`,
        }
    )
}

export function insert(data) {
    return request(
        {
            method: "POST",
            data: data,
            url: "/nodes",
        }
    )
}

export function remove(id) {
    return request(
        {
            method: "DELETE",
            url: `/nodes/${id}`,
        }
    )
}

export function update(data) {
    return request(
        {
            method: "PUT",
            data: data,
            url: "/nodes",
        }
    )
}

export function getAllNodes() {
    return request(
        {
            method: "GET",
            url: "/nodes/all",
        }
    )
}