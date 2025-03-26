import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type LoginFormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { signInWithCredentials } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signInWithCredentials(values.username, values.password);
      navigate('/');
    } catch (error: any) {
      console.error("Login Error Trace:", error);
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen bg-muted">
      {/* Top-left Home Button */}
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          ← Back to Home
        </Button>
      </div>

      {/* Centered Login Card */}
      <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button type="submit">Login</Button>
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
