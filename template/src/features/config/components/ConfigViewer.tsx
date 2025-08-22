import { useEffect, useState } from 'react';
import { fetchConfig } from '../lib/fetchConfig';

export function ConfigViewer() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Configuração</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {config ? <pre>{JSON.stringify(config, null, 2)}</pre> : <p>A carregar...</p>}
    </section>
  );
}
