import Image from "next/image";

const BrandsPatternsList = [
  {
    id: 1,
    name: "Nike",
    logo: "/nike.svg",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "/adidas.svg",
  },
  {
    id: 3,
    name: "Puma",
    logo: "/puma.svg",
  },
  {
    id: 4,
    name: "New Balance",
    logo: "/newbalance.svg",
  },
  {
    id: 5,
    name: "Converse",
    logo: "/converse.svg",
  },
  {
    id: 6,
    name: "Polo Wear",
    logo: "/polo.svg",
  },
  {
    id: 7,
    name: "Zara",
    logo: "/zara.svg",
  },
];

export function BrandsPatterns() {
  return (
    <section className="flex flex-col justify-center gap-4">
      <h2 className="font-semibold whitespace-nowrap md:text-2xl px-4">Marcas parceiras</h2>
      <div className="flex w-full md:gap-6 gap-9 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden px-4 h-[120px]">
        {BrandsPatternsList.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center gap-4 flex-shrink-0 w-[80px] md:w-[100px] h-[80px] rounded-3xl">
            <div className="border flex items-center justify-center rounded-3xl p-6 w-full h-full min-h-[80px]">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-fill w-full h-full"
              />
            </div>
            <span className="whitespace-nowrap text-base font-medium">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}