export const Cookie = {
  set: (name: string, value: string, days?: number) => {
    if (typeof document === "undefined") return;

    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${value}${expires}; path=/`;
  },

  setWithMaxAge: (name: string, value: string, seconds: number) => {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=${value}; path=/; max-age=${seconds}`;
  },

  get: (name: string) => {
    if (typeof document === "undefined") return null;

    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }

    return null;
  },

  remove: (name: string) => {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=; Max-Age=0; path=/`;
  },

  removeAll: () => {
    if (typeof document === "undefined") return;

    const cookies = document.cookie.split(";");

    for (let c of cookies) {
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      document.cookie = `${c}=; Max-Age=0; path=/`;
    }
  },
};
