export default function About() {
  return (
    <section
      id="about"
      className="
        bg-white text-black w-full min-h-screen
        /* Mobile/top-aligned; desktop keeps original centering */
        lg:flex lg:items-center
      "
    >
      <div
        className="
          mx-auto max-w-5xl px-4
          /* Top padding on mobile so content starts at the top */
          pt-12 sm:pt-16 lg:pt-0
          /* Keep your original bottom spacing */
          pb-12 sm:pb-16 lg:pb-28
          space-y-10 lg:space-y-8
        "
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left lg:text-center">
          About Me
        </h2>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          Over the past years, I’ve grown from building enterprise-grade microservices
          and scalable backend systems to architecting intelligent AI-driven applications.
          Alongside designing secure distributed systems using <strong>Java, Spring Boot,
          NestJS</strong>, and messaging platforms like <strong>Kafka</strong>, I’ve developed
          high-performance front-end experiences with <strong>Next.js, TypeScript,</strong> and
          <strong> Tailwind CSS</strong> for large e-commerce and training platforms.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          My recent work expands into <strong>AI agent development</strong> - building LLM-powered
          assistants using <strong>Azure OpenAI</strong> and <strong>Anthropic Claude</strong>,
          creating real-time streaming chat interfaces, and implementing
          <strong> Retrieval-Augmented Generation (RAG)</strong> pipelines with vector
          embeddings and custom data indexing. I also engineer secure serverless workflows,
          optimized prompts, and low-latency inference to ensure reliable AI-powered
          interactions across platforms.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          Beyond architecture and backend engineering, I enjoy connecting design,
          performance, and AI automation to build intuitive, scalable, user-focused products.
          I’ve worked extensively with <strong>Docker, Kubernetes, OAuth2, JWT</strong>,
          distributed caching, and CI/CD pipelines to deliver fault-tolerant, cloud-native
          applications across AWS and Azure.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          Apart from my professional experience, I hold a
          <strong> Master’s degree in Computer & Information Systems</strong> from
          <strong> Saint Louis University</strong>, where I completed coursework in
          applied analytics, information retrieval, enterprise architecture, and
          advanced software development — strengthening both my engineering foundations
          and my understanding of modern AI-driven systems.
        </p>
      </div>
    </section>
  );
}
