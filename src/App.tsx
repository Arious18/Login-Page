import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Toaster position="top-right" />
      <AuthForm 
        isLogin={isLogin} 
        onToggleMode={() => setIsLogin(!isLogin)} 
      />
    </>
  );
}

export default App;