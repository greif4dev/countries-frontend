export function salvarTokenLocal(token: string) {
    localStorage.setItem('token', token);
  }
  
export function getTokenLocal(): string | null {
    return localStorage.getItem('token');
  }
  
export function removerTokenLocal() {
    localStorage.removeItem('token');
  }