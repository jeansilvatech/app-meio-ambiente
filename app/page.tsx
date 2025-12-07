"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TableComponent from "@/components/Table";
import DrawerAppBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <DrawerAppBar/>
      <Header/>
      <TableComponent/>
      <Footer/>
    </>
  );
}
