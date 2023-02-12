import Cookies, { CookieSetOptions } from "universal-cookie";

/**
 * Cookie管理
 */
export class MyCookie {
  private readonly keyToken: string;
  private cookies: Cookies;

  readonly options: CookieSetOptions = {
    path: "/",
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  };

  public constructor(keyToken: CookieTokenList, cookies: Cookies) {
    this.keyToken = keyToken.toString();
    this.cookies = cookies;
  }

  public setToken(token: string) {
    this.cookies.set(this.keyToken, token, this.options);
  }

  public getToken(): string | null {
    return this.cookies.get(this.keyToken) || null;
  }

  public removeToken() {
    this.cookies.remove(this.keyToken, this.options);
  }
}

export enum CookieTokenList {
  BACKEND_USER_ID = "N_USER_ID",
  BACKEND_ACCESS_TOKEN = "N_ACCESS_TOKEN",
}
