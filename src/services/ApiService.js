export class ApiService {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async fetchProducts() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const response = await fetch(`${this.baseUrl}./data/skincare.json`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return { products: [] };
    }
  }
}