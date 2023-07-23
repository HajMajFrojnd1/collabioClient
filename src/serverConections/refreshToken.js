import { refreshToken } from "./auth";

export const refreshTokenTry = async (setToken, interval = null) => {
    try {
        const response = await refreshToken();

        console.log("refreshToken");

        if(!response.ok){
            const {message} = await response.json();
            setToken(null);
            clearInterval(interval);
            return;
        }

        const {acessToken} = await response.json();
        setToken(acessToken);

        return;
    } catch (error) {
        console.error(error);
        setToken(null);
    }
};

export const refreshTokenInterval = (setToken) => {
    const interval = setInterval(async () => {
        refreshTokenTry(setToken, interval);
    }, 780000)
    return interval;
}