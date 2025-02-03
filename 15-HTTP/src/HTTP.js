export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("An error occurred while fetching places.");
    }
    return resData.places;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places ");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("An error occurred while fetching user places.");
    }
    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ places }),
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error("An error occurred while saving places.");
    }
    return resData.message;
}