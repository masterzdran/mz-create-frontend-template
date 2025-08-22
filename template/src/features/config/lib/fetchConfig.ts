export async function fetchConfig() {
    const res = await fetch('/api/config', {
      headers: {
        'x-config-token': process.env.NEXT_PUBLIC_CONFIG_ACCESS_TOKEN || '',
      },
    });
  
    if (!res.ok) throw new Error(`Erro: ${res.status}`);
    return res.json();
  }
  