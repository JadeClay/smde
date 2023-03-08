import { Inter } from 'next/font/google';
import Layout from "@/layout";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
      <Layout size={'sm'}>
          <LoginForm/>
      </Layout>
  )
}
