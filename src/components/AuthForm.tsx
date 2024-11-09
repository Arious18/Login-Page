import React, { useState } from 'react';
import { Github, Mail, Lock, User } from 'lucide-react';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import SocialButton from './SocialButton';
import InputField from './InputField';

interface AuthFormProps {
  isLogin?: boolean;
  onToggleMode: () => void;
}

export default function AuthForm({ isLogin = true, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Welcome back!', {
          icon: '👋',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Welcome to our platform!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back!' : 'Join us today'}
          </h1>
          <p className="text-white text-opacity-90">
            {isLogin
              ? 'Sign in to continue your journey'
              : 'Start your amazing journey with us'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <InputField
              icon={<User />}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
          )}

          <InputField
            icon={<Mail />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />

          <InputField
            icon={<Lock />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="primary-button"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white border-opacity-20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-white bg-transparent">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            onClick={handleGoogleSignIn}
            icon={
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
            }
            label="Google"
          />
          <SocialButton
            onClick={handleGithubSignIn}
            icon={<Github className="w-5 h-5" />}
            label="GitHub"
          />
        </div>

        <p className="text-center text-white text-opacity-90">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={onToggleMode}
            className="font-medium text-white hover:text-opacity-75 transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}