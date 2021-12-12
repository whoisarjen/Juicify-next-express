export default async function useAPI (url, body) {
    let response = {};
    let isSuccess = false;
    if(!url) return 
    await fetch(`http://localhost:4000${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) throw res;
        response = res;
        isSuccess = true;
      })
      .catch((err) => console.log(err));
    return { response, isSuccess };
}
  