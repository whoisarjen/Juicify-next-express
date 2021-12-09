export default async function useFetch(url, body) {
    let response = {}
    let status = ''
    await fetch(`http://localhost:4000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then((res) => {
            if (res.error) throw res
            response = res
            status = 'success'
        })
        .catch((err) => {
            console.log(err)
            status = 'error'
        })
    return { response, status }
}