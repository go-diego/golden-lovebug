export function to(promise) {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err]);
}

export function toAll(promises) {
    const iteratable = promises.map(p => {
        return p.then(response => response).catch(error => [error]);
    });

    return Promise.all(iteratable).then(all => all);
}
