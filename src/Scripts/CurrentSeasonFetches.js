export async function getCurrentSeasonAnime(token = undefined) {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = token;
    }

    return await fetch('http://localhost:8080/anime/season/current', {
        method: 'GET',
        headers: headers
    })
    .then(data => data.json())
}