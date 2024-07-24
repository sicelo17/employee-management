import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "@/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <h1>Welcome to the Employee Management System</h1>
  );
}
