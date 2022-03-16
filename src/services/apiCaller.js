export const getData = (url, data) => {
    let res = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    });
    return res
};

export function getInterests(onSuccess) {
    let data = "";
    getData("/getInterests", data)
        .then(res => {
            return res.json()

        })
        .then(res => {
            onSuccess(res)
        })
}
