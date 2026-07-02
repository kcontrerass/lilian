"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

// Actual downloaded images from Figma
const placeholders = {
  heroBg: "/assets/1cac87c18c1468d2888af44c8b9eaf900c8113fd.png",
  pastelMoras: "/assets/b4eff3dc8591a8935337a4beadedb6f2892d7c50.png",
  tamalitos: "/assets/6b9f3a1ffd556516edd2d630812755b3e8406bd9.png",
  relampago: "/assets/a1d44b28b02a58376b1a20dce458848550800f4f.png",
  pastelFresas: "/assets/f4f9e98f856f909c012d5996e71d70f92a797f87.png",
  quesadillas: "/assets/667f005659eab89dce25f856885b0cf2158efc71.png",
  pastelCup: "/assets/a3abd80c1bd41edcc14aa9dede23028d804222a5.png"
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const PRODUCTS = [
    { id: 1, name: "Quesadillas", image: "/assets/667f005659eab89dce25f856885b0cf2158efc71.png", color: "bg-lilian-teal" },
    { id: 2, name: "Pastel Cup", image: "/assets/a3abd80c1bd41edcc14aa9dede23028d804222a5.png", color: "bg-lilian-pink" },
    { id: 3, name: "Dona de Oreo", image: "/assets/1ff05a6b7598114c6fb1b1ea359890d5a56accb8.png", color: "bg-[#2c1d54]" },
    { id: 4, name: "Tostadas de Curtido", image: "/assets/174d0aeb253eb37158edd975fd1841e3a016b509.png", color: "bg-[#e2b18a]" },
    { id: 5, name: "Pastel de Moras", image: "/assets/b4eff3dc8591a8935337a4beadedb6f2892d7c50.png", color: "bg-[#2c1d54]" },
    { id: 6, name: "Tamalitos", image: "/assets/6b9f3a1ffd556516edd2d630812755b3e8406bd9.png", color: "bg-[#e2b18a]" },
    { id: 7, name: "Relámpago Relleno", image: "/assets/a1d44b28b02a58376b1a20dce458848550800f4f.png", color: "bg-lilian-teal" },
    { id: 8, name: "Pastel de Fresas", image: "/assets/f4f9e98f856f909c012d5996e71d70f92a797f87.png", color: "bg-[#c6687a]" }
  ];

  const filteredProducts = PRODUCTS.filter(prod => 
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden">
      
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[840px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Overlay / Image */}
        <div className="absolute inset-0 w-full h-full bg-[#e7ebf0]">
          <Image 
            src={placeholders.heroBg} 
            alt="Bakery background" 
            fill 
            className="object-cover opacity-30"
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-32 text-center">
          
          <h1 className="flex items-center flex-wrap justify-center gap-4 text-[40px] md:text-[73px] uppercase text-lilian-purple tracking-normal font-chronica">
            <span className="font-medium">Hecho con</span>
            <span className="font-owl-cute text-[60px] md:text-[93px] text-lilian-orange lowercase normal-case mt-[-10px]">amor</span>
            <span className="font-medium">y horneado para ti.</span>
          </h1>

          <Link 
            href="#" 
            className="mt-8 bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-8 py-4 rounded-full font-chronica text-[20px] uppercase flex items-center gap-3 hover:scale-105 transition-transform"
          >
            {/* Small icon placeholder */}
            <span className="w-4 h-4 block bg-white rounded-sm" /> 
            Ordena en Pedidos Ya
          </Link>

        </div>

        {/* Hero Slider Progress */}
        <div className="absolute bottom-10 w-[90%] max-w-[1130px] mx-auto z-10">
          <div className="w-full h-[13px] bg-white/50 backdrop-blur-md rounded-full overflow-hidden">
            <div className="h-full bg-lilian-orange w-[25%] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Section */}
      <section className="relative w-full py-24 flex flex-col items-center overflow-hidden">
        
        {/* Background shape for the right side */}
        <div className="absolute top-0 right-[-100px] w-[50%] h-full z-0 opacity-40 pointer-events-none">
          <Image 
            src="/assets/95483b2bb3649200ddd8d916da6ca91a9821833c.svg"
            alt=""
            fill
            className="object-cover object-left"
          />
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Column - Image with decorators */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[1.1] max-w-[650px] mx-auto lg:mx-0">
            {/* Main Image */}
            <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
              <Image 
                src="/assets/a92c92b1efcd065cb45b45ee8829992627c1d38d.png" 
                alt="Panadería Lilian sucursal" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Dotted Pattern Top Left */}
            <div className="absolute top-0 left-0 w-[120px] h-[120px] opacity-70">
              <Image src="/assets/35d89ec71c4436f403a57a0e9f4398e046db8aba.svg" alt="" fill className="object-cover" />
            </div>

            {/* White Logo Bottom Left */}
            <div className="absolute bottom-6 left-6 w-[120px] sm:w-[150px] h-[50px]">
              <Image src="/assets/e01406bd27c2a730171ccbfdf33cc1ef24c179da.svg" alt="Lilian Logo" fill className="object-contain object-left" />
            </div>

            {/* Sticker / Insignia Top Right (overlapping out) */}
            <div className="absolute top-[-20px] right-[-20px] sm:top-[-30px] sm:right-[-30px] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] z-20">
              <Image src="/assets/de26de4eadb76eac4b1836ae5c8f3afc248ab9a6.svg" alt="Sticker Lilian" fill className="object-contain" />
            </div>
          </div>

          {/* Right Column - Text content */}
          <div className="flex flex-col text-left max-w-[600px] mx-auto lg:mx-0">
            
            {/* Title */}
            <div className="mb-10 text-center lg:text-left">
              <h2 className="font-chronica text-[40px] sm:text-[50px] md:text-[60px] leading-[1.1] uppercase font-bold">
                <span className="text-lilian-orange">Cada </span>
                <span className="font-owl-cute text-lilian-teal text-[50px] sm:text-[65px] md:text-[75px] normal-case lowercase inline-block -mb-2">receta</span>
                <span className="text-lilian-orange"> tiene</span><br/>
                <span className="text-lilian-orange">una historia</span>
              </h2>
            </div>

            {/* Text blocks */}
            <div className="text-lilian-purple font-gotham text-[16px] md:text-[18px] leading-relaxed flex flex-col gap-8 text-center lg:text-left">
              <p>
                <span className="font-bold">Nuestra Misión:</span> Atender y satisfacer las necesidades de nuestros clientes, brindando productos y servicios de alta calidad, pertenecientes a la industria pastelera, con un personal altamente motivado y capacitado, contribuyendo al desarrollo del país y de nuestros colaboradores.
              </p>
              <p>
                <span className="font-bold">Nuestra Visión:</span> Queremos que en cada bocado que disfrutes te lleves una experiencia única del sabor, que por una vida ha venido a mis manos y poder compartir estas vivencias a través de recetas únicas.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="catalogo" className="py-16 px-4 w-full bg-white flex flex-col items-center relative overflow-hidden">
        
        {/* Title with Branches */}
        <div className="flex flex-col items-center mb-12 text-center w-full max-w-[1440px]">
          <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
            {/* Left Branch */}
            <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
              <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#e2b18a] rotate-180 transform scale-y-[-1]">
                <path d="M10 20 Q 30 5 50 20 T 90 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor"/>
                <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor"/>
                <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor"/>
                <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor"/>
              </svg>
            </div>

            <h2 className="font-chronica text-lilian-purple text-[32px] sm:text-[45px] md:text-[55px] font-bold leading-[1.2] whitespace-nowrap">
              Escoge aquí<br/>
              tu próxima <span className="font-owl-cute text-lilian-orange text-[42px] sm:text-[60px] md:text-[70px] normal-case lowercase inline-block -mb-2">delicia</span>
            </h2>

            {/* Right Branch */}
            <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
              <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#e2b18a]">
                <path d="M10 20 Q 30 5 50 20 T 90 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor"/>
                <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor"/>
                <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor"/>
                <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-[800px] mx-auto mb-16 px-4">
          <div className="flex items-center gap-4 border-b border-[#df8d40] pb-2">
            <div className="w-[45px] h-[45px] rounded-full bg-[#fcf2ea] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#df8d40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            
            <input 
              type="text" 
              placeholder="Paninis, Pasteles, desayunos..."
              className="w-full bg-transparent outline-none font-gotham text-[16px] text-lilian-purple placeholder-lilian-purple/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <button className="bg-lilian-purple text-white px-8 py-2.5 rounded-[100px] font-gotham font-medium text-[15px] shrink-0 hover:bg-lilian-purple-light transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto w-full z-10 px-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <div key={prod.id} className="relative w-full aspect-[0.9] flex flex-col bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300 border-[6px] border-white/50">
                
                {/* Top Colored Background */}
                <div className={`w-full h-[65%] relative ${prod.color}`}>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  {/* Image */}
                  <div className="absolute inset-[-10px] sm:inset-[-20px]">
                    <Image src={prod.image} alt={prod.name} fill className="object-contain" />
                  </div>
                </div>

                {/* Bottom White Info Section */}
                <div className="w-full h-[35%] bg-white px-4 pt-3 pb-4 flex flex-col justify-between z-10">
                  <h3 className="font-gotham font-bold uppercase text-[12px] sm:text-[13px] text-lilian-purple tracking-wide line-clamp-2">
                    {prod.name}
                  </h3>

                  <div className="flex justify-end w-full">
                    <span className="font-gotham font-bold text-[13px] text-lilian-purple border-b-2 border-lilian-purple pb-0.5">
                      Comprar aquí
                    </span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-lilian-purple/70 font-gotham">
              No se encontraron productos que coincidan con tu búsqueda.
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center w-full relative z-10">
          <button className="bg-lilian-purple text-white px-8 py-3.5 rounded-[100px] font-gotham font-medium text-[15px] hover:bg-lilian-purple-light transition-colors inline-flex items-center justify-center gap-2 shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Cargar más
          </button>
        </div>

        {/* Wavy Background Graphic Bottom */}
        <div className="absolute bottom-[-50px] left-[-100px] w-full max-w-[800px] h-[300px] opacity-30 z-0 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-lilian-purple" fill="currentColor">
            <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" />
          </svg>
        </div>

      </section>
    </div>
  );
}
