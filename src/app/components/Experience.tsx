export default function Experience() {
  return (
    <section
      id="experience"
      className="
        bg-white text-black"
    >
      <div
        className="
          mx-auto max-w-6xl px-4
          py-12 sm:py-16 lg:py-28
          space-y-8 lg:space-y-12
        "
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
          Experience
        </h2>

        {/* Example Job 1 */}
        <div className="space-y-3 sm:space-y-4 rounded-lg border border-gray-200 bg-white/60 p-4 sm:p-5 lg:border-0 lg:p-0 lg:bg-transparent">
          <h3 className="text-xl sm:text-2xl font-semibold">
            CodeLance IT — Software Developer (Jan 2024 – Present)
          </h3>
          <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800">
            When I joined CodeLance IT, there I worked on the banking transaction platform which was 
            struggling with security gaps and instability during peak transaction hours and also access 
            permission model was error-prone, which created risks of privilege escalation, and high-volume 
            traffic often strained system performance. To address this, I designed and deployed scalable 
            microservices with Spring Boot and Kafka to decouple workflows, and I implemented graph-based 
            validation logic to trace user-role relationships, eliminating hidden vulnerabilities. 
            I reinforced security with OAuth2 and JWT, containerized deployments on AWS EKS, and automated 
            CI/CD pipelines through GitHub Actions and Jenkins. These combined improvements brought the platform 
            to 99.95% availability, cut misconfiguration issues by 30%, boosted scalability by nearly 40% during 
            heavy loads, and shortened release cycles from three days to under six hours.
          </p>
        </div>

        {/* Example Job 2 */}
        <div className="space-y-3 sm:space-y-4 rounded-lg border border-gray-200 bg-white/60 p-4 sm:p-5 lg:border-0 lg:p-0 lg:bg-transparent">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Cognizant — Full Stack Java Developer (Feb 2022 – Jun 2023)
          </h3>
          <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800">
            At Cognizant, I worked on healthcare applications where clinicians often struggled with 
            slow, unreliable access to patient records, especially under high data volumes. To solve 
            this, I redesigned backend services with Spring Boot and GraphQL, introduced Redis caching, 
            and optimized database queries so that information could be delivered faster and more consistently.
            On the frontend, I built responsive interfaces with Next.js, React, and Tailwind CSS, making the 
            platform usable even in low-bandwidth hospital environments. I also set up CI/CD pipelines with 
            Azure DevOps and Docker to make deployments more reliable and quicker to roll back if needed. As 
            a result, API response times improved by up to 30%, deployment rollbacks were cut by 60%, and system 
            uptime reached 99.9%, directly improving the day-to-day experience of doctors and patients.
          </p>
        </div>

        {/* Example Job 3 */}
        <div className="space-y-3 sm:space-y-4 rounded-lg border border-gray-200 bg-white/60 p-4 sm:p-5 lg:border-0 lg:p-0 lg:bg-transparent">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Adobe — Associate Java Developer (Jan 2020 – Feb 2022)
          </h3>
          <p className="text-base sm:text-[17px] lg:text-lg leading-relaxed text-gray-800">
            At Adobe, I supported a digital media management platform that needed to be faster and more 
            reliable to meet user expectations. The legacy system had performance bottlenecks and inconsistent 
            testing practices, so I migrated key modules into Spring Boot, redesigned components for modularity, 
            and adopted Test-Driven Development with JUnit and Mockito to ensure quality before release. I also 
            optimized MySQL schemas and indexing to speed up queries, while implementing centralized error handling 
            so APIs behaved consistently. These improvements reduced response times by 25–35%, raised test coverage 
            to 85%, and cut post-release bugs by 40%, leaving the platform not only quicker but also more stable and 
            easier to maintain.
          </p>
        </div>
      </div>
    </section>
  );
}
