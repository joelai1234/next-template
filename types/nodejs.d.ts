declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_BASE_API_URL: string;
    NEXT_PUBLIC_SESSION_SECRET: string;

    KEYCLOAK_ID: string;
    KEYCLOAK_SECRET: string;
    KEYCLOAK_ISSUER: string;
  }
}
