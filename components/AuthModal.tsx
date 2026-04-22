"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao entrar");
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); }, 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.acceptedTerms || !registerData.acceptedPrivacy) {
      setError("Aceite os termos e a política de privacidade para continuar.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar");
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setTab("login"); }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[#F8F8F5] border border-[#E8E8E0] rounded-xl text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-[#C9A84C] transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-cream rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-light tracking-[0.3em] gold-shimmer">AURA</span>
                <button onClick={onClose} className="p-1.5 text-charcoal/40 hover:text-charcoal transition-colors rounded-full hover:bg-[#F0F0EC]">
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-[#F0F0EC] rounded-full p-1">
                {(["login", "register"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setError(""); }}
                    className={`flex-1 py-2 text-sm rounded-full transition-all duration-300 font-medium ${
                      tab === t ? "bg-white text-charcoal shadow-sm" : "text-charcoal/50"
                    }`}
                  >
                    {t === "login" ? "Entrar" : "Criar conta"}
                  </button>
                ))}
              </div>
            </div>

            {/* Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-8 mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm text-green-700">
                    {tab === "login" ? "Bem-vinda de volta!" : "Conta criada com sucesso!"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div className="mx-8 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="px-8 pb-8">
              {tab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className={inputClass}
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={inputClass + " pr-12"}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide hover:bg-[#C9A84C] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nome"
                      required
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      required
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Telefone"
                      required
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="number"
                      placeholder="Idade"
                      required
                      min="14"
                      max="120"
                      value={registerData.age}
                      onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha (mín. 8 chars, 1 maiúscula, 1 número)"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={inputClass + " pr-12"}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={registerData.acceptedTerms}
                        onChange={(e) => setRegisterData({ ...registerData, acceptedTerms: e.target.checked })}
                        className="mt-0.5 accent-[#C9A84C]"
                      />
                      <span className="text-xs text-charcoal/60 leading-relaxed">
                        Li e aceito os{" "}
                        <a href="/terms" target="_blank" className="text-[#C9A84C] hover:underline">Termos de Uso</a>
                      </span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={registerData.acceptedPrivacy}
                        onChange={(e) => setRegisterData({ ...registerData, acceptedPrivacy: e.target.checked })}
                        className="mt-0.5 accent-[#C9A84C]"
                      />
                      <span className="text-xs text-charcoal/60 leading-relaxed">
                        Li e aceito a{" "}
                        <a href="/privacy" target="_blank" className="text-[#C9A84C] hover:underline">Política de Privacidade</a>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide hover:bg-[#C9A84C] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Criando conta..." : "Criar conta"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
