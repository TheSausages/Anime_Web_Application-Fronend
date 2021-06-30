export async function getTopAnimeAllTime(pageNumber = 1, token = undefined) {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = token;
    }

    return await fetch('http://localhost:8080/anime/ranking/topAllTime/' + pageNumber, {
        method: 'GET',
        headers: headers
    })
    .then(data => data.json())
}

export async function getTopAiringAnime(pageNumber = 1, token = undefined) {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = token;
    }

    return await fetch('http://localhost:8080/anime/ranking/topAiring/' + pageNumber, {
        method: 'GET',
        headers: headers
    })
    .then(data => data.json())
}

export async function getTopAnimeMovie(pageNumber = 1, token = undefined) {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = token;
    }

    return await fetch('http://localhost:8080/anime/ranking/topMovie/' + pageNumber, {
        method: 'GET',
        headers: headers
    })
    .then(data => data.json())
}