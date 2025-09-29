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
          Over the past five years, I’ve designed and developed enterprise-grade
          <strong>{' '}microservices</strong>, <strong>APIs</strong>, and 
          <strong>{' '}responsive interfaces</strong> across industries such as
          <strong>{' '}banking, healthcare, and media</strong>. My expertise spans
          <strong>{' '}Java (8–17), Spring Boot,</strong> and <strong>distributed systems</strong> 
          on the backend, and <strong>React/Next.js</strong> with 
          <strong>{' '}Tailwind CSS</strong> on the frontend, all deployed through
          <strong>{' '}CI/CD pipelines</strong> on AWS and Azure.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          I’ve implemented secure architectures with <strong>OAuth2</strong>, 
          <strong>{' '}JWT</strong>, and <strong>Kafka</strong> for real-time messaging,
          while containerizing applications with <strong>Docker</strong> and 
          <strong>{' '}Kubernetes</strong> to ensure high availability.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          With proven experience in <strong>Data Structures and Algorithms</strong>,
          I apply graph-based models, optimization techniques, and efficient query
          strategies to improve performance and stability.
        </p>

        <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800 text-left">
          Experienced in <strong>agile delivery</strong> and
          <strong>{' '}cross-functional collaboration</strong>, I’m passionate about
          roles that challenge me to architect scalable microservices, optimize
          performance, and create engaging user experiences in full-stack or
          frontend engineering.
        </p>
      </div>
    </section>
  );
}
