export class ApiService {
  async fetchProducts() {
    const response = await fetch('/data/skincare.json');
    if (!response.ok) throw new Error('Ошибка HTTP: ' + response.status);
    const data = await response.json();
    return data.products;
  }
}