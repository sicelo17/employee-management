import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "@/layout/Layout";
import { Button } from 'react-bootstrap';
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>Welcome to the Employee Management System</h1>
      <Link href="/employees">
        <Button variant="primary">
          Employees
        </Button>
      </Link>

    </>
  );
}
