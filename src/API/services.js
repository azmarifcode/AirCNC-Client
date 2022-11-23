// save a home services or add home
export const addHome = async (homeData) => {
    const url = `${process.env.REACT_APP_API_URL}/homes`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(homeData),
    });
    const data = await response.json();
    return data;
};
