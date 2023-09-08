class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeApiCall(endpoint, method, data, token, id) {
    const fullUrl = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    // Agregar headers de token si se proporciona token y Id
    if (token !== null && id !== null) {
      headers["custom-token"] = token;
      headers["id"] = id;
    }

    const request = {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(fullUrl, request);
      const Data = await response.json();
      return Data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ApiClient };
