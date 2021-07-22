import { Media } from "../data/MediaInformation"

export async function getAnimeById(id, token = undefined): Promise<Media> {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = token;
    }

    return await fetch('http://localhost:8080/anime/' + id, {
        method: 'GET',
        headers: headers
    })
    .then(data => data.json())
}