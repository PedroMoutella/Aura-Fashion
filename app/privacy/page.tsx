import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — AURA Fashion",
  description: "Saiba como coletamos e protegemos seus dados pessoais.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-xs tracking-widest text-[#C9A84C] uppercase hover:underline mb-8 block">
          ← Voltar para AURA
        </Link>

        <span className="text-xs tracking-widest text-[#C9A84C] uppercase">Legal</span>
        <h1 className="text-3xl font-light text-charcoal mt-2 mb-2">Política de Privacidade</h1>
        <p className="text-sm text-charcoal/40 mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-sm max-w-none text-charcoal/70 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">1. Dados Coletados</h2>
            <p>A AURA Fashion coleta os seguintes dados pessoais no momento do cadastro:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Nome e sobrenome</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Idade</li>
              <li>Senha (armazenada exclusivamente em forma de hash criptográfico — nunca em texto plano)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">2. Finalidade do Tratamento</h2>
            <p>Seus dados são utilizados para:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Criação e gestão da sua conta de cliente</li>
              <li>Processamento e entrega de pedidos</li>
              <li>Comunicações sobre pedidos, ofertas exclusivas e novidades da coleção</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">3. Base Legal (LGPD)</h2>
            <p>
              O tratamento de seus dados é realizado com base no consentimento expresso (Art. 7º, I da Lei 13.709/2018 — LGPD)
              obtido no momento do cadastro, e na execução do contrato de compra e venda.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">4. Compartilhamento de Dados</h2>
            <p>
              A AURA Fashion não vende, aluga ou compartilha seus dados pessoais com terceiros para fins comerciais.
              Dados poderão ser compartilhados apenas com transportadoras para fins de entrega e quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">5. Segurança</h2>
            <p>Adotamos as seguintes medidas técnicas para proteger seus dados:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Senhas armazenadas com hash bcrypt (salt rounds: 12)</li>
              <li>Autenticação via JWT em cookies HttpOnly (protegido contra XSS)</li>
              <li>Headers de segurança: X-Frame-Options, X-Content-Type-Options, Content-Security-Policy</li>
              <li>Transmissão de dados via HTTPS (em produção)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">6. Seus Direitos (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Acesso:</strong> solicitar cópia dos seus dados</li>
              <li><strong>Correção:</strong> atualizar dados incompletos ou incorretos</li>
              <li><strong>Exclusão:</strong> solicitar a remoção dos seus dados</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato legível</li>
              <li><strong>Revogação:</strong> retirar o consentimento a qualquer momento</li>
            </ul>
            <p className="mt-3">
              Para exercer esses direitos, entre em contato:{" "}
              <a href="mailto:privacidade@aurafashion.com.br" className="text-[#C9A84C] hover:underline">
                privacidade@aurafashion.com.br
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">7. Retenção de Dados</h2>
            <p>
              Seus dados são mantidos enquanto sua conta estiver ativa. Após solicitação de exclusão,
              os dados são removidos em até 30 dias, salvo obrigação legal de retenção.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-charcoal mb-3">8. Contato</h2>
            <p>
              AURA Fashion — Encarregado de Proteção de Dados (DPO)
              <br />
              E-mail:{" "}
              <a href="mailto:privacidade@aurafashion.com.br" className="text-[#C9A84C] hover:underline">
                privacidade@aurafashion.com.br
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
