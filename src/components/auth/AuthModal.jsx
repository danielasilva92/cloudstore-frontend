import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { login as apiLogin, register as apiRegister } from '../../api/authApi';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './AuthModal.module.css';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { show } = useToast();
  const isLogin = mode === 'login';

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Obligatoriskt';
    if (!isLogin && !form.email.trim()) e.email = 'Obligatoriskt';
    if (form.password.length < 6) e.password = 'Minst 6 tecken';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const data = isLogin
        ? await apiLogin({ username: form.username, password: form.password })
        : await apiRegister(form);
      login(data.token, { username: data.username || form.username });
      onClose();
      show(`✦ Välkommen${isLogin ? ' tillbaka' : ''}, ${data.username || form.username}!`);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Visar backend-fel
  const handleApiError = (err) => {
    const status = err.response?.status;
    const body = err.response?.data;

    if (status === 401) {
      show('Fel användarnamn eller lösenord.', 'error');
      return;
    }

    // 400 med fältfel
    if (status === 400 && body && typeof body === 'object' && !body.error) {
      setErrors(body);
      return;
    }

    // 400/409 med allmänt fel
    if (body?.error) {
      show(body.error, 'error');
      return;
    }

    show('Något gick fel. Försök igen.', 'error');
  };

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: null }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.accent} />
        <h2 className={styles.title}>{isLogin ? 'Välkommen tillbaka' : 'Skapa konto'}</h2>
        <p className={styles.subtitle}>{isLogin ? 'Logga in för att fortsätta handla.' : 'Registrera dig för en bättre upplevelse.'}</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && <Input label="E-post" type="email" placeholder="din@email.com" value={form.email} onChange={set('email')} error={errors.email} />}
          <Input label="Användarnamn" type="text" placeholder="ditt namn" value={form.username} onChange={set('username')} error={errors.username} />
          <Input label="Lösenord" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} error={errors.password} />
          {!isLogin && (
            <p className={styles.hint}>
              Minst 6 tecken, en stor bokstav, en siffra och ett specialtecken.
            </p>
          )}
          <Button type="submit" size="lg" loading={loading} style={{ width: '100%', marginTop: 8 }}>
            {isLogin ? 'Logga in' : 'Skapa konto'}
          </Button>
        </form>
        <div className={styles.switch}>
          {isLogin
            ? <>Inget konto? <button onClick={() => setMode('register')}>Registrera dig</button></>
            : <>Har redan ett konto? <button onClick={() => setMode('login')}>Logga in</button></>}
        </div>
      </div>
    </div>
  );
}