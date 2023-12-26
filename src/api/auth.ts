import axios from '../core/axios';
import { LoginFormDto, LoginResponseDto, RegisterFormDto, RegisterResponseDto, User } from '@/api/dto/auth.dto';
import { destroyCookie } from 'nookies';

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
  console.log('Login triggers');
  return (await axios.post('/auth/login', values)).data
};

export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
  console.log('Registration triggers');
  return (await axios.post('/auth/register', values)).data
};

export const getMe = async (): Promise<User> => {
  console.log('Get user/me triggers');
  return (await axios.get('/users/me')).data
};

export const logout = () => {
  destroyCookie(null, "_token", { path: '/' })
}
