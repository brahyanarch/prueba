"use client"
import Head from "next/head";
import Map from "@/components/maps";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Google Maps en Next.js con TypeScript</title>
        <meta name="description" content="Integración de Google Maps con Next.js y TypeScript" />
      </Head>
      <h1>Mapa de Puno</h1>
      <Map />
    </div>
  );
};

export default Home;
