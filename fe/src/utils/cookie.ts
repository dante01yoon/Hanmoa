interface KeyPairObject {
  [key: string]: string;
};

export const COOKIE_NAME: {
  [key: string]: string
} = {
  SESSION: "_hm_guit"
};

export const buildCookieObject = (): KeyPairObject =>{
  const cookiePair = document.cookie
    .split(";")
    .map(value => value.split("="));
  return cookiePair.reduce((acc, curr) => {
    acc[curr[0].trim()] = curr[1].trim();
    return acc;
  }, {} as KeyPairObject);
}

export const getCookie = (cookieName: string): string | undefined => {
  const documentCookie = buildCookieObject();
  return documentCookie[cookieName];  
}

export const setCookie = (name: string, value: string)  => {
  const days = 365 * 100;
  const date = new Date();
  date.setDate(date.getTime() + days * 60 * 60 * 24 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/`
}

export const deleteCookie = (cookieName: string) => {
  document.cookie =`${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}