export function setHeaders(){
    var headers: Headers = new Headers();

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    return headers;
}