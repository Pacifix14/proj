declare module "intuit-oauth" {
  export default class OAuthClient {
    /**
     * @constructor
     * @param {OAuthClientConfig} config - Configuration for the OAuth client
     */
    constructor(config: OAuthClientConfig);

    /**
     * The environment for the OAuth client
     */
    environment: string;

    /**
     * The client ID for the OAuth client
     */
    clientId: string;

    /**
     * The client secret for the OAuth client
     */
    clientSecret: string;

    /**
     * The redirect URI for the OAuth client
     */
    redirectUri: string;

    /**
     * The token for the OAuth client
     */
    token: Token;

    /**
     * Whether logging is enabled
     */
    logging: boolean;

    /**
     * The logger instance
     */
    logger: Logger | null;

    /**
     * The state for CSRF protection
     */
    state: CSRFState;

    /**
     * Set custom authorize URLs
     * @param params - Custom authorize URLs
     */
    setAuthorizeURLs(params: AuthorizeURLs): OAuthClient;

    /**
     * Redirect user to authorization page
     * @param params - Authorization parameters
     * @returns Authorization URI
     */
    authorizeUri(params: AuthorizeUriParams): string;

    /**
     * Create token by exchanging authorization code for bearer token
     * @param uri - URI with authorization code
     * @returns Promise resolving to AuthResponse
     */
    createToken(uri: string): Promise<AuthResponse>;

    /**
     * Refresh the access token
     * @returns Promise resolving to AuthResponse
     */
    refresh(): Promise<AuthResponse>;

    /**
     * Refresh tokens by passing refresh_token parameter explicitly
     * @param refresh_token - Refresh token
     * @returns Promise resolving to AuthResponse
     */
    refreshUsingToken(refresh_token: string): Promise<AuthResponse>;

    /**
     * Revoke access_token/refresh_token
     * @param params - Token revocation parameters
     * @returns Promise resolving to AuthResponse
     */
    revoke(params?: RevokeParams): Promise<AuthResponse>;

    /**
     * Get user info
     * @returns Promise resolving to AuthResponse
     */
    getUserInfo(): Promise<AuthResponse>;

    /**
     * Make API call
     * @param params - API call parameters
     * @returns Promise resolving to AuthResponse
     */
    makeApiCall(params: ApiCallParams): Promise<AuthResponse>;

    /**
     * Validate ID token
     * @param params - ID token validation parameters
     * @returns Promise resolving to boolean
     */
    validateIdToken(params?: ValidateIdTokenParams): Promise<boolean>;

    /**
     * Get key from JWKS URI
     * @param id_token - ID token
     * @param kid - Key ID
     * @param request - Request object
     * @returns Promise resolving to decoded JWT
     */
    getKeyFromJWKsURI(
      id_token: string,
      kid: string,
      request: HttpRequest,
    ): Promise<JWTPayload>;

    /**
     * Get public key
     * @param modulus - Modulus
     * @param exponent - Exponent
     * @returns Public key
     */
    getPublicKey(modulus: string, exponent: string): string;

    /**
     * Get token request
     * @param request - Request object
     * @returns Promise resolving to AuthResponse
     */
    getTokenRequest(request: HttpRequest): Promise<AuthResponse>;

    /**
     * Validate token
     * @returns void
     */
    validateToken(): void;

    /**
     * Load response using Axios client
     * @param request - Request object
     * @returns Promise resolving to response
     */
    loadResponse(request: HttpRequest): Promise<HttpResponse>;

    /**
     * Load response from JWKS URI
     * @param request - Request object
     * @returns Promise resolving to response
     */
    loadResponseFromJWKsURI(request: string): Promise<HttpResponse>;

    /**
     * Create error with more information
     * @param e - Error
     * @param authResponse - Auth response
     * @returns Error with additional information
     */
    createError(e: Error | ApiError, authResponse?: AuthResponse): ApiError;

    /**
     * Check if access token is valid
     * @returns Whether access token is valid
     */
    isAccessTokenValid(): boolean;

    /**
     * Get token
     * @returns Token
     */
    getToken(): Token;

    /**
     * Set token
     * @param params - Token parameters
     * @returns Token
     */
    setToken(params: TokenParams): Token;

    /**
     * Get auth header
     * @returns Auth header
     */
    authHeader(): string;

    /**
     * Log message
     * @param level - Log level
     * @param message - Message
     * @param messageData - Message data
     */
    log(level: LogLevel, message: string, messageData: string): void;

    /**
     * Cache ID
     */
    static cacheId: string;

    /**
     * Authorize endpoint
     */
    static authorizeEndpoint: string;

    /**
     * Token endpoint
     */
    static tokenEndpoint: string;

    /**
     * Revoke endpoint
     */
    static revokeEndpoint: string;

    /**
     * User info endpoint for production
     */
    static userinfo_endpoint_production: string;

    /**
     * User info endpoint for sandbox
     */
    static userinfo_endpoint_sandbox: string;

    /**
     * Migration endpoint for sandbox
     */
    static migrate_sandbox: string;

    /**
     * Migration endpoint for production
     */
    static migrate_production: string;

    /**
     * Environment URLs
     */
    static environment: {
      sandbox: string;
      production: string;
    };

    /**
     * JWKS URI
     */
    static jwks_uri: string;

    /**
     * Available scopes
     */
    static scopes: {
      Accounting: string;
      Payment: string;
      Payroll: string;
      TimeTracking: string;
      Benefits: string;
      Profile: string;
      Email: string;
      Phone: string;
      Address: string;
      OpenId: string;
      Intuit_name: string;
    };

    /**
     * User agent
     */
    static user_agent: string;
  }

  /**
   * Configuration for the OAuth client
   */
  export interface OAuthClientConfig {
    /**
     * Environment (sandbox or production)
     */
    environment: string;

    /**
     * Client ID
     */
    clientId: string;

    /**
     * Client secret
     */
    clientSecret: string;

    /**
     * Redirect URI
     */
    redirectUri: string;

    /**
     * Token object (optional)
     */
    token?: TokenParams;

    /**
     * Whether to enable logging (optional)
     */
    logging?: boolean;
  }

  /**
   * Custom authorize URLs
   */
  export interface AuthorizeURLs {
    /**
     * Custom authorize endpoint
     */
    authorizeEndpoint: string;

    /**
     * Custom token endpoint
     */
    tokenEndpoint: string;

    /**
     * Custom revoke endpoint
     */
    revokeEndpoint: string;

    /**
     * Custom user info endpoint
     */
    userInfoEndpoint: string;
  }

  /**
   * Authorization URI parameters
   */
  export interface AuthorizeUriParams {
    /**
     * Scopes to request
     */
    scope: string | string[];

    /**
     * State for CSRF protection (optional)
     */
    state?: string;
  }

  /**
   * Token revocation parameters
   */
  export interface RevokeParams {
    /**
     * Access token to revoke (optional)
     */
    access_token?: string;

    /**
     * Refresh token to revoke (optional)
     */
    refresh_token?: string;
  }

  /**
   * API call parameters
   */
  export interface ApiCallParams {
    /**
     * URL to call
     */
    url: string;

    /**
     * HTTP method (optional, default is GET)
     */
    method?: string;

    /**
     * Headers (optional)
     */
    headers?: Record<string, string>;

    /**
     * Request body (optional)
     */
    body?: Record<string, unknown>;

    /**
     * Response type (optional, default is json)
     */
    responseType?: "json" | "text" | "stream" | "arraybuffer";
  }

  /**
   * ID token validation parameters
   */
  export interface ValidateIdTokenParams {
    /**
     * ID token to validate (optional)
     */
    id_token?: string;
  }

  /**
   * Token parameters
   */
  export interface TokenParams {
    /**
     * Realm ID (optional)
     */
    realmId?: string;

    /**
     * Token type (optional)
     */
    token_type?: string;

    /**
     * Access token (optional)
     */
    access_token?: string;

    /**
     * Refresh token (optional)
     */
    refresh_token?: string;

    /**
     * Expires in (seconds) (optional)
     */
    expires_in?: number;

    /**
     * Refresh token expires in (seconds) (optional)
     */
    x_refresh_token_expires_in?: number;

    /**
     * ID token (optional)
     */
    id_token?: string;

    /**
     * Latency (ms) (optional)
     */
    latency?: number;

    /**
     * Created at timestamp (optional)
     */
    createdAt?: number;
  }

  /**
   * Token class
   */
  export class Token {
    /**
     * @constructor
     * @param params - Token parameters
     */
    constructor(params?: TokenParams);

    /**
     * Realm ID
     */
    realmId: string;

    /**
     * Token type
     */
    token_type: string;

    /**
     * Access token
     */
    access_token: string;

    /**
     * Refresh token
     */
    refresh_token: string;

    /**
     * Expires in (seconds)
     */
    expires_in: number;

    /**
     * Refresh token expires in (seconds)
     */
    x_refresh_token_expires_in: number;

    /**
     * ID token
     */
    id_token: string;

    /**
     * Latency (ms)
     */
    latency: number;

    /**
     * Created at timestamp
     */
    createdAt: number;

    /**
     * Get access token
     * @returns Access token
     */
    accessToken(): string;

    /**
     * Get refresh token
     * @returns Refresh token
     */
    refreshToken(): string;

    /**
     * Get token type
     * @returns Token type
     */
    tokenType(): string;

    /**
     * Get token object
     * @returns Token object
     */
    getToken(): TokenParams;

    /**
     * Set token object
     * @param tokenData - Token data
     * @returns Token instance
     */
    setToken(tokenData: TokenParams): Token;

    /**
     * Clear token object
     * @returns Token instance
     */
    clearToken(): Token;

    /**
     * Check token expiry
     * @param seconds - Seconds
     * @returns Whether token is valid
     */
    _checkExpiry(seconds: number): boolean;

    /**
     * Check if access token is valid
     * @returns Whether access token is valid
     */
    isAccessTokenValid(): boolean;

    /**
     * Check if refresh token is valid
     * @returns Whether refresh token is valid
     */
    isRefreshTokenValid(): boolean;
  }

  /**
   * Auth response class
   */
  export class AuthResponse {
    /**
     * @constructor
     * @param params - Auth response parameters
     */
    constructor(params: AuthResponseParams);

    /**
     * Token
     */
    token: Token;

    /**
     * Response
     */
    response: HttpResponse;

    /**
     * Response body
     */
    body: string;

    /**
     * JSON response
     */
    json: TokenResponseJson | ErrorResponseJson | null;

    /**
     * Intuit TID
     */
    intuit_tid: string;

    /**
     * Process response
     * @param response - Response
     */
    processResponse(response: HttpResponse): void;

    /**
     * Get token
     * @returns Token object
     */
    getToken(): TokenParams;

    /**
     * Get response text
     * @returns Response text
     */
    text(): string;

    /**
     * Get response status
     * @returns Response status
     */
    status(): number;

    /**
     * Get response headers
     * @returns Response headers
     */
    headers(): HttpHeaders;

    /**
     * Check if response is valid
     * @returns Whether response is valid
     */
    valid(): boolean;

    /**
     * Get JSON response
     * @returns JSON response
     */
    getJson(): TokenResponseJson | ErrorResponseJson;

    /**
     * Get Intuit TID
     * @returns Intuit TID
     */
    get_intuit_tid(): string;

    /**
     * Check if response has specific content type
     * @param contentType - Content type
     * @returns Whether response has content type
     */
    isContentType(contentType: string): boolean;

    /**
     * Get content type
     * @returns Content type
     */
    getContentType(): string;

    /**
     * Check if response is JSON
     * @returns Whether response is JSON
     */
    isJson(): boolean;

    /**
     * Content type header name
     */
    static _contentType: string;

    /**
     * JSON content type
     */
    static _jsonContentType: string;

    /**
     * URL-encoded content type
     */
    static _urlencodedContentType: string;
  }

  /**
   * Auth response parameters
   */
  export interface AuthResponseParams {
    /**
     * Token (optional)
     */
    token?: Token;

    /**
     * Response (optional)
     */
    response?: HttpResponse;

    /**
     * Response text (optional)
     */
    responseText?: string;

    /**
     * Intuit TID (optional)
     */
    intuit_tid?: string;
  }

  /**
   * User info response
   */
  export interface UserInfo {
    /**
     * Subject
     */
    sub: string;

    /**
     * Email
     */
    email: string;

    /**
     * Whether email is verified
     */
    emailVerified: boolean;

    /**
     * Given name
     */
    givenName: string;

    /**
     * Family name
     */
    familyName: string;
  }

  /**
   * HTTP request
   */
  export interface HttpRequest {
    /**
     * URL
     */
    url: string;

    /**
     * HTTP method
     */
    method: string;

    /**
     * Headers
     */
    headers: Record<string, string>;

    /**
     * Request data (optional)
     */
    data?: Record<string, unknown>;

    /**
     * Response type (optional)
     */
    responseType?: string;
  }

  /**
   * HTTP response
   */
  export interface HttpResponse {
    /**
     * URL
     */
    url: string;

    /**
     * Headers
     */
    headers: HttpHeaders;

    /**
     * Response body
     */
    body?: string;

    /**
     * Response data
     */
    data?: Record<string, unknown>;

    /**
     * Status code
     */
    status: number;

    /**
     * Status text
     */
    statusText: string;
  }

  /**
   * HTTP headers
   */
  export interface HttpHeaders {
    /**
     * Content type
     */
    "content-type"?: string;

    /**
     * Content length
     */
    "content-length"?: string;

    /**
     * Connection
     */
    connection?: string;

    /**
     * Server
     */
    server?: string;

    /**
     * Date
     */
    date?: string;

    /**
     * Intuit TID
     */
    intuit_tid?: string;

    /**
     * Cache control
     */
    "cache-control"?: string;

    /**
     * Pragma
     */
    pragma?: string;

    /**
     * Strict transport security
     */
    "strict-transport-security"?: string;

    /**
     * Other headers
     */
    [key: string]: string | undefined;
  }

  /**
   * Token response JSON
   */
  export interface TokenResponseJson {
    /**
     * ID token
     */
    id_token?: string;

    /**
     * Expires in (seconds)
     */
    expires_in: number;

    /**
     * Token type
     */
    token_type: string;

    /**
     * Refresh token expires in (seconds)
     */
    x_refresh_token_expires_in: number;

    /**
     * Refresh token
     */
    refresh_token: string;

    /**
     * Access token
     */
    access_token: string;
  }

  /**
   * Error response JSON
   */
  export interface ErrorResponseJson {
    /**
     * Error description
     */
    error_description: string;

    /**
     * Error
     */
    error: string;
  }

  /**
   * API error
   */
  export interface ApiError extends Error {
    /**
     * Error
     */
    error: string;

    /**
     * Auth response
     */
    authResponse: AuthResponse;

    /**
     * Intuit TID
     */
    intuit_tid: string;

    /**
     * Original message
     */
    originalMessage: string;

    /**
     * Error description
     */
    error_description: string;
  }

  /**
   * JWT payload
   */
  export interface JWTPayload {
    /**
     * Issuer
     */
    iss: string;

    /**
     * Subject
     */
    sub: string;

    /**
     * Audience
     */
    aud: string[];

    /**
     * Expiration time
     */
    exp: number;

    /**
     * Issued at
     */
    iat: number;

    /**
     * JWT ID
     */
    jti: string;

    /**
     * Other claims
     */
    [key: string]: unknown;
  }

  /**
   * JWK response
   */
  export interface JWKResponse {
    /**
     * Keys
     */
    keys: JWK[];
  }

  /**
   * JWK
   */
  export interface JWK {
    /**
     * Key type
     */
    kty: string;

    /**
     * Exponent
     */
    e: string;

    /**
     * Use
     */
    use: string;

    /**
     * Key ID
     */
    kid: string;

    /**
     * Algorithm
     */
    alg: string;

    /**
     * Modulus
     */
    n: string;
  }

  /**
   * CSRF state
   */
  export interface CSRFState {
    /**
     * Create state
     */
    create(secret: string): string;

    /**
     * Create secret
     */
    secretSync(): string;
  }

  /**
   * Logger
   */
  export interface Logger {
    /**
     * Log
     */
    log(level: LogLevel, message: string): void;
  }

  /**
   * Log level
   */
  export type LogLevel = "info" | "error" | "warn" | "debug";
}
