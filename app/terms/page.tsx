import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — AURA Fashion",
  description: "Leia os termos e condições de uso da plataforma AURA Fashion.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-xs tracking-widest text-[#C9A84C] uppercase hover:underline mb-8 block">
          ← Voltar para AURA
        </Link>

        <span className="text-xs tracking-widest text-[#C9A84C] uppercase">Legal</span>
        <h1 className="text-3xl font-light text-charcoal mt-2 mb-2">Termos de Uso</h1>
        <p className="text-sm text-charcoal/40 mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-sm max-w-none text-charcoal/70 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao aceder e utilizar o site da AURA Fashion, concorda com estes Termos de Uso.
              Caso não concorde com qualquer disposição, não utilize os nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">2. Uso da Plataforma</h2>
            <p>O utilizador compromete-se a:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Fornecer informações verdadeiras e atualizadas no registo</li>
              <li>Manter a confidencialidade das suas credenciais de acesso</li>
              <li>Utilizar a plataforma apenas para fins lícitos e legítimos</li>
              <li>Não tentar aceder a sistemas, contas ou dados de outros utilizadores</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">3. Proibições</h2>
            <p>É expressamente proibido:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Reproduzir, copiar ou distribuir conteúdo do site sem autorização</li>
              <li>Realizar engenharia reversa ou tentativas de intrusão ao sistema</li>
              <li>Utilizar bots, scrapers ou automatizações sem autorização prévia</li>
              <li>Publicar conteúdo falso, difamatório ou que viole direitos de terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">4. Compras e Pagamentos</h2>
            <p>
              Todos os preços são expressos em Euros (€) e incluem IVA à taxa legal em vigor.
              Oferecemos prestações até 6 vezes, sendo as primeiras 3 prestações sem juros e
              de 4x a 6x com acréscimo de 1,5% ao mês.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">5. Envio e Entrega</h2>
            <p>
              O envio é calculado com base no código postal de entrega. Oferecemos opções via
              CTT: Correio Normal, Correio Azul e CTT Expresso.
              Os prazos são contados a partir da confirmação do pagamento. A AURA Fashion não se
              responsabiliza por atrasos causados pelos CTT ou transportadoras.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">6. Política de Troca e Devolução</h2>
            <p>
              Nos termos do Decreto-Lei n.º 24/2014, de 14 de fevereiro, o cliente tem direito
              à resolução do contrato no prazo de 14 dias a contar da receção do produto, sem
              necessidade de indicar motivo. Produtos com defeito beneficiam de garantia legal
              de 2 anos, conforme a legislação europeia de defesa do consumidor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma — incluindo imagens, textos, logótipos e design —
              é propriedade exclusiva da AURA Fashion e protegido pela legislação de direitos de autor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">8. Limitação de Responsabilidade</h2>
            <p>
              A AURA Fashion não se responsabiliza por danos indiretos, incidentais ou consequentes
              decorrentes do uso da plataforma, exceto nos casos previstos pela legislação
              portuguesa de defesa do consumidor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">9. Foro</h2>
            <p>
              Fica eleito o foro da Comarca de Lisboa para dirimir quaisquer controvérsias
              decorrentes destes Termos de Uso, com renúncia a qualquer outro, por mais privilegiado
              que seja.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">10. Contacto</h2>
            <p>
              Dúvidas sobre estes termos:{" "}
              <a href="mailto:contacto@aurafashion.pt" className="text-[#C9A84C] hover:underline">
                contacto@aurafashion.pt
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
