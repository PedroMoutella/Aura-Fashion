export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fato de Treino Track Branco",
    category: "Conjuntos",
    price: 89.90,
    image: "/images/Gemini_Generated_Image_64h2sf64h2sf64h2.png",
    tag: "Destaque",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Cinza", hex: "#9E9E9E" },
    ],
    description: "Fato de treino premium com corte desportivo estruturado. Casaco com fecho de correr e calças combinadas com banda lateral. Tecido técnico de alto desempenho, ideal para treino e street style.",
  },
  {
    id: 2,
    name: "Conjunto Atlético Rosa Neon",
    category: "Conjuntos",
    price: 99.90,
    image: "/images/Gemini_Generated_Image_819gxm819gxm819g.png",
    tag: "Novo",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Rosa/Preto", hex: "#E91E8C" },
      { name: "Azul/Preto", hex: "#2196F3" },
      { name: "Verde/Preto", hex: "#4CAF50" },
    ],
    description: "Conjunto desportivo de alto impacto em rosa neon e preto. Inclui casaco bomber, calças e camisola interior combinadas. Tecido respirável com corte slim para máxima mobilidade.",
  },
  {
    id: 3,
    name: "Casaco Bomber Branco",
    category: "Casacos",
    price: 69.90,
    image: "/images/Gemini_Generated_Image_eo5trgeo5trgeo5t.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Bege", hex: "#C8B89A" },
    ],
    description: "Casaco bomber clássico em tecido premium com detalhes em contraste na gola, punhos e bainha. Acabamento limpo e moderno, perfeito para layering em qualquer look.",
  },
  {
    id: 4,
    name: "Conjunto Polo Bicolor",
    category: "Conjuntos",
    price: 79.90,
    image: "/images/Gemini_Generated_Image_f3c1jdf3c1jdf3c1.png",
    tag: "Top",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Preto/Rosa", hex: "#E91E8C" },
      { name: "Preto/Azul", hex: "#1565C0" },
      { name: "Preto/Verde", hex: "#2E7D32" },
    ],
    description: "Conjunto urbano composto por polo e calções com design bicolor arrojado. Corte descontraído com detalhes técnicos. Ideal para o dia-a-dia e lazer activo.",
  },
  {
    id: 5,
    name: "Camisola Interior Sem Mangas",
    category: "Tops",
    price: 24.90,
    image: "/images/Gemini_Generated_Image_f5tu16f5tu16f5tu.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Cinza", hex: "#9E9E9E" },
    ],
    description: "Base essencial em algodão premium, de corte slim e decote redondo. Tecido macio e respirável para uso desportivo ou casual como segunda pele.",
  },
  {
    id: 6,
    name: "Sapatilhas Running Rosa",
    category: "Calçado",
    price: 89.90,
    image: "/images/Gemini_Generated_Image_jbyx22jbyx22jbyx.png",
    tag: "Exclusivo",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: [
      { name: "Preto/Rosa", hex: "#E91E8C" },
      { name: "Preto/Azul", hex: "#1565C0" },
      { name: "Preto/Branco", hex: "#EFEFEF" },
    ],
    description: "Sapatilhas de running com amortecimento avançado e cabedal em malha técnica respirável. Sola com padrão geométrico para aderência máxima em piso seco e húmido.",
  },
  {
    id: 7,
    name: "T-Shirt AURA Signature Verde",
    category: "T-Shirts",
    price: 34.90,
    image: "/images/Gemini_Generated_Image_myzvz2myzvz2myzv.png",
    tag: "Destaque",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Verde", hex: "#2E7D32" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
    description: "T-shirt em algodão premium com estampado AURA Signature nas costas. Corte relaxed para máximo conforto. O grafismo em alto relevo destaca a identidade da marca.",
  },
  {
    id: 8,
    name: "Polo Classic Azul Marinho",
    category: "Polos",
    price: 44.90,
    image: "/images/Gemini_Generated_Image_ry32xhry32xhry32.png",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Azul Marinho", hex: "#1A237E" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
    description: "Polo em piqué de algodão com gola e punhos em contraste. Corte clássico e atemporal com bolso no peito. Versátil para look casual ou smart casual.",
  },
  {
    id: 9,
    name: "Sapatilha Urbana Preta",
    category: "Calçado",
    price: 79.90,
    image: "/images/Gemini_Generated_Image_ulx4nrulx4nrulx4.png",
    tag: "Novo",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Cinza", hex: "#9E9E9E" },
    ],
    description: "Sapatilha de cano alto com design urbano arrojado. Sistema de fecho rápido com elásticos laterais. Sola em borracha resistente e cabedal técnico impermeável.",
  },
  {
    id: 10,
    name: "Boné AURA Signature",
    category: "Acessórios",
    price: 29.90,
    image: "/images/Gemini_Generated_Image_vrebz4vrebz4vreb.png",
    sizes: ["Único"],
    colors: [
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Verde", hex: "#2E7D32" },
      { name: "Cinza", hex: "#9E9E9E" },
    ],
    description: "Boné de pala curva com logo AURA bordado em tom-sobre-tom na frente. Regulação traseira ajustável para conforto perfeito. Tecido técnico de secagem rápida.",
  },
  {
    id: 11,
    name: "T-Shirt Pocket Verde Floresta",
    category: "T-Shirts",
    price: 29.90,
    image: "/images/Gemini_Generated_Image_w71kzxw71kzxw71k.png",
    tag: "Novo",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Verde Floresta", hex: "#2D5A27" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Caqui", hex: "#8D8D5F" },
    ],
    description: "T-shirt oversized em algodão pesado (280g) com mini bolso no peito e branding discreto. Estilo casual com acabamento premium. Lavagem a 30°C.",
  },
];

export const categories = ["Todos", "Conjuntos", "Casacos", "T-Shirts", "Tops", "Polos", "Calçado", "Acessórios"];

export function calcularPrestacoes(valor: number, maxPrestacoes = 6): { prestacoes: number; valorPrestacao: number; total: number }[] {
  return Array.from({ length: maxPrestacoes }, (_, i) => {
    const n = i + 1;
    if (n <= 3) {
      return { prestacoes: n, valorPrestacao: valor / n, total: valor };
    }
    const taxa = 0.012;
    const valorPrestacao = (valor * taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1);
    return { prestacoes: n, valorPrestacao, total: valorPrestacao * n };
  });
}

export const calcularParcelas = calcularPrestacoes;

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

const envioPorRegiao: Record<string, { normal: number; azul: number; expresso: number; prazo: [number, number, number] }> = {
  "1": { normal: 3.50, azul: 5.90, expresso: 9.90, prazo: [5, 2, 1] },
  "2": { normal: 3.50, azul: 5.90, expresso: 9.90, prazo: [5, 2, 1] },
  "3": { normal: 3.90, azul: 6.50, expresso: 10.50, prazo: [6, 3, 1] },
  "4": { normal: 3.90, azul: 6.50, expresso: 10.50, prazo: [6, 3, 1] },
  "5": { normal: 4.50, azul: 7.50, expresso: 12.00, prazo: [7, 3, 2] },
  "6": { normal: 4.50, azul: 7.50, expresso: 12.00, prazo: [7, 3, 2] },
  "7": { normal: 4.90, azul: 8.50, expresso: 13.50, prazo: [8, 4, 2] },
  "8": { normal: 4.90, azul: 8.50, expresso: 13.50, prazo: [8, 4, 2] },
  "9": { normal: 6.90, azul: 11.90, expresso: 18.90, prazo: [10, 5, 3] },
};

export function calcularEnvio(codigoPostal: string) {
  const prefix = codigoPostal.replace(/\D/g, "")[0] ?? "1";
  const regiao = envioPorRegiao[prefix] ?? envioPorRegiao["1"]!;
  return [
    { nome: "Correio Normal", valor: regiao.normal, prazo: regiao.prazo[0], icon: "📦" },
    { nome: "Correio Azul", valor: regiao.azul, prazo: regiao.prazo[1], icon: "⚡" },
    { nome: "CTT Expresso", valor: regiao.expresso, prazo: regiao.prazo[2], icon: "🚀" },
  ];
}

export const calcularFrete = calcularEnvio;
