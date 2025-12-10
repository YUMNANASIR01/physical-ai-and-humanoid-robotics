import ChatWidget from '../components/ChatWidget';
import { AuthProvider } from '../contexts/AuthContext';

export default function Root({ children }) {
  return (
    <AuthProvider>
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}
