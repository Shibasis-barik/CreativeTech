import { motion } from "framer-motion";
import logo from "../../assets/logo.jpeg";
import loginIllustration from "../../assets/login-ai.png";
import FloatingParticles from "./FloatingParticles";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <section className="auth-theme relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F14]">

      {/* Blueprint Grid */}
    <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
        backgroundImage:
            "linear-gradient(#6E8AA6 1px, transparent 1px), linear-gradient(90deg,#6E8AA6 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        }}
    />

    {/* Floating Particles */}
    <FloatingParticles />

      {/* Glow Effects */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">

        <div className="grid w-full items-center gap-14 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="hidden lg:flex flex-col justify-center"
>

  {/* Logo */}

  <div className="flex items-center gap-4">

    <img
      src={logo}
      alt="Kreative Technology"
      className="h-14 w-14 rounded-xl bg-white p-1"
    />

    <div>

      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
        Kreative Technology
      </h2>

      <p className="text-slate-600 dark:text-slate-400">
        Software • Cloud • AI
      </p>

    </div>

  </div>

  {/* Heading */}

  <h1 className="mt-12 text-6xl font-bold leading-tight text-slate-900 dark:text-white">
    Welcome Back
  </h1>

  <p className="mt-6 max-w-xl text-xl leading-9 text-slate-600 dark:text-slate-400">
    Sign in to access your dashboard, monitor your projects,
    collaborate with your engineering team, and manage
    your digital infrastructure securely.
  </p>

  {/* Illustration */}

  <div className="mt-10 flex justify-center">

    <img
      src={loginIllustration}
      alt="AI Illustration"
      className="w-full max-w-2xl object-contain drop-shadow-[0_0_60px_rgba(6,182,212,.45)]"
    />

  </div>

</motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="mx-auto w-full max-w-lg"
          >

            {children}

          </motion.div>

        </div>

      </div>

    </section>
  );
}
