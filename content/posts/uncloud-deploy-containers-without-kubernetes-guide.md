---
title: "Uncloud: Easy Multi-Server Container Deployments for Devs & Students"
slug: "uncloud-deploy-containers-without-kubernetes-guide"
description: "Discover Uncloud, the simple way to deploy containerized apps across multiple servers without Kubernetes. Perfect for students & developers seeking easy, powerful orchestration."
date: "2025-12-04"
---

# Uncloud: Deploy Containerized Apps Across Servers Without Kubernetes – The Ultimate Guide for Students & Developers

## Introduction: Taming the Container Beast Without the K8s Kraken

In the rapidly evolving world of software development, containers have become the undisputed champions of application packaging and deployment. Docker, in particular, has revolutionized how we build, ship, and run applications, offering unparalleled consistency and portability. But once your application is containerized, the next big question looms: "How do I deploy this across multiple servers efficiently?"

For many, the answer immediately jumps to Kubernetes (K8s) – the industry-standard for orchestrating containers at scale. Kubernetes is a monumental achievement, a powerful titan capable of managing complex, distributed systems with incredible resilience and flexibility. However, its immense power comes with an equally immense learning curve and operational overhead. For students embarking on their first multi-service project, or solo developers juggling multiple side hustles, diving headfirst into Kubernetes can feel like trying to pilot a jumbo jet just to cross the street. It’s overkill, time-consuming, and can often introduce more frustration than it solves.

**What if there was a simpler way?** A way to harness the power of container orchestration across your servers without the Kubernetes certification, the complex YAML manifest sprawl, or the dedicated DevOps team?

Enter **Uncloud**.

Uncloud is a refreshingly straightforward and incredibly effective tool designed specifically for deploying and managing containerized applications across multiple servers without the complexity inherent in Kubernetes. It's built for those who love the simplicity and power of Docker but want a more intuitive path to multi-server deployment – making it an absolute game-changer for both aspiring students and busy software developers.

In this comprehensive guide, we’ll dive deep into Uncloud, exploring its features, use cases, and how it can dramatically simplify your deployment workflow. Get ready to reclaim your time, boost your productivity, and finally conquer multi-server deployments with ease!

## The Deployment Dilemma: Why Simplicity Matters

Before we unpack Uncloud, let’s acknowledge the elephant in the room: deployment can be hard.

*   **For Students:** You’re already grappling with programming languages, algorithms, data structures, and various frameworks. Adding complex deployment strategies like raw SSH scripts, manual `docker run` commands on multiple machines, or the steep learning curve of Kubernetes can be incredibly daunting. It often diverts precious learning time away from core development concepts. You want to see your projects live, not spend days debugging deployment configurations.
*   **For Software Developers (Especially Solo or Small Teams):** Your time is your most valuable asset. While you might appreciate the power of Kubernetes, setting up and maintaining a K8s cluster for every small project, internal tool, or client POC can be an inefficient use of resources. The cognitive load, the infrastructure costs, and the ongoing maintenance often outweigh the benefits for projects that don't demand hyperscale. You need something that gets your containers running reliably and quickly across your chosen servers, allowing you to focus on writing code and delivering features.

This is where the "deployment dilemma" truly hits home. We have incredible tools for building applications (Docker), but the step from a local `docker-compose up` to a robust, multi-server deployment has traditionally involved a significant leap in complexity. Uncloud bridges this gap, offering a gentle yet powerful transition.

## What Exactly is Uncloud? Your Deployment Sidekick

At its core, **Uncloud is a lightweight, intuitive, and declarative tool for deploying and managing Docker containers across one or more servers via SSH, without requiring Kubernetes.** Think of it as your personal deployment sidekick – always ready to get your containerized applications up and running with minimal fuss.

Instead of orchestrating containers via a control plane and agents that speak the Kubernetes API, Uncloud operates by directly connecting to your servers (VMs, bare metal, cloud instances) via SSH. It leverages Docker on each target machine to manage your containers, ensuring a familiar environment while abstracting away the manual commands.

**Key distinguishing factors of Uncloud:**

*   **No Kubernetes:** This is the headline. No K8s control plane, no kubelets, no complex network plugins. Just Docker and SSH.
*   **Declarative Configuration:** Define your desired application state (what containers to run, on which servers, with what configurations) in simple YAML files.
*   **Multi-Server Management:** Easily deploy different services of your application to different servers, or scale out a single service by distributing it.
*   **Simplicity and Speed:** Designed for quick setup and deployment, drastically reducing the time from code to production (or even just staging/testing).

Uncloud empowers you to achieve robust, multi-server deployments with a fraction of the complexity, making it an ideal choice for learning, prototyping, and even managing small to medium-scale production applications.

## Uncloud's Core Features: Power Without the Bloat

Uncloud isn't just about being "not Kubernetes"; it's about providing a focused set of powerful features that cater directly to the needs of students and developers looking for efficient container deployment.

### Effortless Multi-Server Deployment

Imagine you have a frontend service, a backend API, and a database. You want to run the frontend and backend on one server (or even separate ones for better isolation), and the database on another. With Uncloud, this becomes incredibly straightforward.

*   **How it Works:** You define your target servers (hosts) in a simple configuration file, providing their SSH access details. Uncloud then uses these credentials to connect and execute Docker commands, managing container lifecycles on each specified host.
*   **Example Scenario:**
    *   `server-web`: Runs your Node.js API and React frontend.
    *   `server-db`: Hosts your PostgreSQL container.
    Uncloud allows you to define which services go to which server, orchestrating their deployment and ensuring they're running as specified. This is perfect for students learning about distributed systems or developers building microservices.

### Declarative Configuration

One of the most powerful paradigms in modern infrastructure management is declarative configuration. Instead of writing scripts that specify *how* to achieve a state (imperative), you write a configuration that specifies *what* the desired state should be.

*   **Explain YAML Files:** Uncloud uses simple YAML files (typically named `uncloud.yaml`) to define your application's services, their configurations (image, ports, volumes, environment variables), and the servers they should run on.
*   **Benefits:**
    *   **Version Control:** Store your `uncloud.yaml` in Git. Every change to your infrastructure is tracked, reviewed, and auditable.
    *   **Reproducibility:** Easily spin up an identical environment elsewhere – perfect for staging, testing, or quickly onboarding new team members.
    *   **Clarity:** The configuration file serves as living documentation of your application's deployment topology.
    *   **Automation-Friendly:** Integrate `uncloud deploy` into your CI/CD pipeline effortlessly.

```yaml
# A simplified uncloud.yaml example
hosts:
  - name: web-server
    address: user@192.168.1.100
    ssh_key: ~/.ssh/id_rsa
  - name: db-server
    address: user@192.168.1.101
    ssh_key: ~/.ssh/id_rsa

services:
  my-frontend:
    image: myuser/my-frontend:latest
    ports: ["80:80"]
    env:
      API_URL: http://web-server:3000
    deploy_on: [web-server]

  my-api:
    image: myuser/my-api:latest
    ports: ["3000:3000"]
    env:
      DATABASE_URL: postgres://user:pass@db-server:5432/mydb
    deploy_on: [web-server]

  my-database:
    image: postgres:14
    ports: ["5432:5432"]
    volumes: ["db_data:/var/lib/postgresql/data"]
    env:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    deploy_on: [db-server]
```
This clear, human-readable configuration lets you define your entire application stack in one place.

### Zero-Downtime Deployments

In the professional world, taking your application offline for an update is rarely acceptable. Uncloud understands this and offers strategies for performing deployments with minimal to zero downtime.

*   **Importance:** For production applications, seamless updates are crucial. For students, experiencing zero-downtime deployments firsthand is an invaluable learning experience, teaching them best practices for resilient systems.
*   **How Uncloud Handles Rollouts:** When deploying a new version, Uncloud can intelligently bring up the new containers alongside the old ones, wait for the new ones to become healthy, and then gracefully shut down the old ones. This ensures that users always have an active instance serving requests during the update process.

### Rollbacks Made Easy

Mistakes happen. A bug might slip through testing, or a new feature might cause unforeseen issues. Being able to quickly revert to a previous, stable version is a lifesaver.

*   **Safety Net:** Uncloud keeps track of previous deployments, allowing you to initiate a rollback to a known good state with a single command.
*   **Facilitating Quick Recovery:** This feature drastically reduces the stress and impact of deployment errors, giving both students and developers confidence to experiment and iterate faster.

### Basic Monitoring & Logging

Understanding the health and behavior of your applications is paramount. While Uncloud doesn't include a full-fledged monitoring suite, it provides essential visibility.

*   **Basic Capabilities:** You can easily check the status of your deployed services and view their logs directly through Uncloud, aggregated from your servers.
*   **Importance:** For students, this provides immediate feedback on whether their application is running correctly. For developers, it's a quick way to diagnose issues without SSHing into each server manually. For more advanced monitoring, Uncloud's simplicity makes it easy to integrate with external tools like Prometheus, Grafana, or cloud-native logging services.

### Resource Management

Just like Docker, Uncloud allows you to specify resource constraints for your containers.

*   **CPU & RAM Limits:** Define how much CPU and memory each service can consume.
*   **Ensuring Fair Distribution:** This prevents a runaway process in one container from hogging all resources and impacting other services on the same server. It's an important practice for stability and cost efficiency, particularly on shared or resource-constrained servers.

## Uncloud in Action: Use Cases for Students & Developers

Uncloud's versatility makes it an excellent choice for a wide array of scenarios.

### For Students: Supercharge Your Learning & Projects

1.  **Deploying Course Projects:** Instantly get your web applications, REST APIs, or microservices assignments live for professors to review or for showcasing in your portfolio. No more struggling with complex server setups – focus on the code.
2.  **Setting Up Personal Portfolios/Blogs:** Want to host your own portfolio site or technical blog on a cheap VPS? Uncloud makes it trivial to deploy your static site generator (like Jekyll or Hugo in a container) alongside a web server, or a full-stack application.
3.  **Experimenting with Distributed Systems Concepts:** Learning about service discovery, load balancing (even basic HTTP proxying), or inter-service communication? Uncloud provides a practical sandbox to deploy multiple services across different virtual machines without the cognitive overhead of Kubernetes.
4.  **Learning Deployment Best Practices:** Understand concepts like declarative configuration, zero-downtime deployments, and rollbacks in a simplified, accessible environment before tackling more complex orchestrators.
5.  **Running Personal Labs:** Easily deploy various open-source tools, development environments, or testing applications on your home lab servers or cloud VMs.

### For Developers: Streamline Your Workflow & Productivity

1.  **Rapid Prototyping and Proof-of-Concept Deployments:** Need to quickly demonstrate a new idea to stakeholders? Uncloud lets you deploy your containerized prototype to a staging server in minutes, not hours or days.
2.  **Side Projects and Personal Labs:** For your passion projects, Uncloud offers the perfect balance of power and simplicity. Get your SaaS idea, custom tool, or personal dashboard deployed without diverting attention from development.
3.  **Small to Medium-Sized Production Applications:** Not every application requires the full might of Kubernetes. For internal tools, niche applications, or client projects with moderate traffic, Uncloud provides a robust and maintainable deployment solution that's significantly easier to operate.
4.  **Migrating Legacy Applications into Containers:** Containerizing legacy apps is a great first step towards modernization. Uncloud can then help you deploy these new containers to your existing infrastructure efficiently, without having to re-architect everything for Kubernetes.
5.  **Simplifying CI/CD Pipelines for Smaller Teams:** Integrate Uncloud commands into your GitHub Actions, GitLab CI, Jenkins, or other CI/CD pipelines. A simple `uncloud deploy` command after successful builds can automate your deployments, freeing up developers to focus on coding rather than manual server management.

## Uncloud vs. Kubernetes: When to Choose What

It’s crucial to understand that Uncloud is not a "replacement" for Kubernetes in all scenarios. Rather, it's an alternative that excels in different contexts.

### When Uncloud Shines:

*   **Simplicity and Speed:** When you prioritize a low learning curve, rapid deployment, and minimal operational overhead.
*   **Smaller Teams, Solo Developers:** Ideal for individuals or small teams without dedicated DevOps engineers.
*   **Budget-Conscious Projects:** Less operational complexity means fewer hours spent on infrastructure, translating to lower costs. You also don't need complex, expensive cloud-managed K8s services.
*   **Focused Container Orchestration:** When your primary need is to run Docker containers reliably across a few servers, and you don't require advanced features like service mesh, advanced ingress controllers, or sophisticated auto-scaling groups.
*   **Learning & Development Environments:** Perfect for students and developers to get hands-on experience with deployment without getting bogged down by extreme complexity.

### When Kubernetes is Indispensable:

*   **Large-Scale, Complex Microservices Architectures:** When you have hundreds or thousands of microservices, dynamic scaling requirements, and intricate inter-service communication patterns.
*   **High Availability & Auto-Scaling:** For mission-critical applications that demand self-healing, aggressive horizontal auto-scaling based on metrics, and fault tolerance across many nodes and even availability zones.
*   **Advanced Networking & Storage:** When you need sophisticated network policies, service mesh capabilities (like Istio or Linkerd), or complex persistent storage solutions that are abstracted and managed by the orchestrator.
*   **Mature Organizations with Dedicated SRE/DevOps Teams:** Organizations that have the resources and expertise to manage the inherent complexity of Kubernetes.
*   **Cloud-Agnostic Deployments at Scale:** While Uncloud is cloud-agnostic in principle, Kubernetes offers a more robust and standardized API for managing infrastructure across multiple cloud providers at a truly massive scale.

In essence, Uncloud offers a pragmatic, efficient path for many common deployment challenges, while Kubernetes remains the powerhouse for applications at the apex of scale and complexity. For the vast majority of students and smaller development projects, Uncloud provides more than enough muscle without the associated cognitive burden.

## Getting Started with Uncloud: A Practical Guide

Ready to give Uncloud a spin? The barrier to entry is delightfully low.

### Prerequisites:

1.  **Docker:** Ensure Docker is installed and running on all your target servers. Uncloud uses Docker to manage containers.
2.  **SSH Access:** You need SSH access to your target servers, preferably with key-based authentication for security and automation.
3.  **Uncloud Binary:** Download the Uncloud CLI tool for your operating system from its official source.

### Installation (Conceptual):

Typically, you'd download the executable binary for your OS (Linux, macOS, Windows) and place it in your system's PATH.

```bash
# Example for Linux/macOS
curl -L https://github.com/uncloud/uncloud/releases/latest/download/uncloud-linux-amd64 -o /usr/local/bin/uncloud # Adjust for your OS
chmod +x /usr/local/bin/uncloud
```

### Basic Configuration:

1.  **Initialize Your Project:**
    Navigate to your project's root directory and run:
    ```bash
    uncloud init
    ```
    This will typically generate a boilerplate `uncloud.yaml` file.

2.  **Edit `uncloud.yaml`:**
    This is where you define your hosts and services. Let’s create a minimal example to deploy a simple Nginx container.

    First, ensure you have a server accessible via SSH. For this example, let's assume you have a server at `192.168.1.100` and can log in as `user` using your default SSH key.

    ```yaml
    # uncloud.yaml
    hosts:
      - name: my-web-server
        address: user@192.168.1.100 # Replace with your server's IP/hostname
        ssh_key: ~/.ssh/id_rsa # Or specify a different key path

    services:
      my-nginx:
        image: nginx:latest
        ports: ["80:80"] # Map host port 80 to container port 80
        deploy_on: [my-web-server]
    ```

### Deployment Steps:

Once your `uncloud.yaml` is ready, deploying is a single command:

```bash
uncloud deploy
```
Uncloud will connect to `my-web-server`, pull the `nginx:latest` image (if not present), and start an Nginx container, mapping port 80. You should then be able to access Nginx by navigating to `http://192.168.1.100` in your browser!

### Managing Applications:

*   **Check Status:** See what services are running and their health.
    ```bash
    uncloud status
    ```
*   **View Logs:** Aggregate logs from your services.
    ```bash
    uncloud logs my-nginx
    ```
*   **Rollback:** Revert to a previous deployment version.
    ```bash
    uncloud rollback
    ```
*   **Stop/Remove:** Gracefully stop and remove services.
    ```bash
    uncloud stop my-nginx
    uncloud remove my-nginx # Or uncloud remove --all
    ```

This simple workflow illustrates how quickly you can get from configuration to a running, managed application across your infrastructure using Uncloud.

## Uncloud's Impact on Productivity

The real magic of Uncloud lies in its ability to significantly boost productivity for its target audience.

*   **Faster Iteration Cycles:** Students can deploy and test their assignments rapidly. Developers can push new features and fixes to staging or production with unprecedented speed, leading to faster feedback loops and quicker time-to-market.
*   **Reduced Operational Burden:** By simplifying deployment and management, Uncloud frees up valuable time and mental energy. No more wrestling with arcane configuration files or complex cluster management – just straightforward commands that do exactly what you expect.
*   **More Time for Coding/Learning:** For students, this means more time spent mastering programming concepts and building cool projects, rather than troubleshooting infrastructure. For developers, it translates directly into more time coding, innovating, and focusing on business logic.
*   **Empowerment for Students and Solo Devs:** Uncloud democratizes multi-server deployment. It makes advanced deployment strategies accessible to everyone, empowering individuals and small teams to build and manage robust applications that might otherwise be out of reach due to complexity.

## Potential Limitations and Considerations

While Uncloud offers compelling advantages, it's important to set realistic expectations:

*   **Not a Full K8s Replacement for Massive Scale:** As discussed, for hyper-scale applications with extreme traffic, complex scaling rules, or stringent compliance requirements, Kubernetes or specialized cloud services remain the go-to. Uncloud targets the "sweet spot" below that.
*   **Community Size:** Compared to the enormous, mature Kubernetes ecosystem, Uncloud's community is naturally smaller. This might mean fewer third-party integrations or less extensive documentation for edge cases, though the core functionality is robust.
*   **Advanced Networking:** Uncloud leverages Docker's networking capabilities. If you require extremely sophisticated, custom network overlays, service mesh features, or highly granular network policies that span beyond what Docker can natively provide, you might need to augment with external tools or consider a more powerful orchestrator.
*   **Persistence:** While Uncloud helps define Docker volumes, managing complex persistent storage solutions (like distributed block storage or file systems) across multiple nodes will still rely on your underlying infrastructure (e.g., cloud provider volumes, NFS shares) rather than being fully abstracted by Uncloud itself.

These are not weaknesses, but rather characteristics that define Uncloud's scope – a focused, powerful tool for its intended purpose.

## Top Recommended Tools for Enhanced Productivity

Uncloud excels at deploying your containerized applications. To truly optimize your workflow as a student or developer, consider integrating it with other powerful tools that complement its strengths.

### 

---

## 🔗 Top Recommended Tools

- [ChatGPT](https://example.com/chatgpt-aff)
- [VS Code](https://example.com/vscode-aff)
- [Notion](https://example.com/notion-aff)
- [Obsidian](https://example.com/obsidian-aff)
- [GitHub Copilot](https://example.com/copilot-aff)
 - Your Essential Partner for [Specific Functionality]

**Description:** This tool is designed to [briefly describe its core function, e.g., streamline your CI/CD pipeline, provide robust monitoring, or supercharge your coding with AI]. It integrates seamlessly with containerized workflows like those managed by Uncloud, allowing you to [explain specific benefits for Uncloud users, e.g., automate builds and deployments, gain deep insights into application performance, or accelerate development with intelligent assistance]. Imagine [give a quick, compelling scenario, e.g., your code is automatically built, tested, and deployed to your Uncloud servers with every commit, or real-time alerts notify you of issues before users are affected].

**Why it's a game-changer with Uncloud:**
*   **Benefit 1:** [Specific synergy with Uncloud, e.g., "Automates the `uncloud deploy` command after every successful build."]
*   **Benefit 2:** [Another advantage, e.g., "Provides centralized logging and metrics for all services deployed via Uncloud."]
*   **Benefit 3:** [Broader productivity boost, e.g., "Reduces manual effort, letting you focus on feature development."]

###  - Mastering Your [Another Specific Functionality]

**Description:** This innovative tool revolutionizes how you [briefly describe its core function, e.g., manage your container images, collaborate on code, or handle cloud resources]. For anyone using Docker and Uncloud,  becomes indispensable for [explain specific benefits, e.g., ensuring secure and efficient storage of your container images, fostering better team collaboration, or simplifying infrastructure management]. With features like [mention a key feature, e.g., vulnerability scanning, integrated code reviews, or intuitive UI for cloud resource provisioning], it truly elevates your development and deployment experience.

**Why it's a game-changer with Uncloud:**
*   **Benefit 1:** [Specific synergy with Uncloud, e.g., "Ensures your `uncloud deploy` always pulls secure, validated container images."]
*   **Benefit 2:** [Another advantage, e.g., "Streamlines the process of getting your images ready for multi-server deployment."]
*   **Benefit 3:** [Broader productivity boost, e.g., "Enhances security and reliability throughout your container lifecycle."]

---

### **Ready to Supercharge Your Development Workflow?**

Don't just deploy your apps; master your entire development ecosystem! By combining Uncloud's deployment simplicity with the specialized power of tools like 

---

## 🔗 Top Recommended Tools

- [ChatGPT](https://example.com/chatgpt-aff)
- [VS Code](https://example.com/vscode-aff)
- [Notion](https://example.com/notion-aff)
- [Obsidian](https://example.com/obsidian-aff)
- [GitHub Copilot](https://example.com/copilot-aff)
 and , you'll unlock unparalleled efficiency and control.

**Click here to explore 

---

## 🔗 Top Recommended Tools

- [ChatGPT](https://example.com/chatgpt-aff)
- [VS Code](https://example.com/vscode-aff)
- [Notion](https://example.com/notion-aff)
- [Obsidian](https://example.com/obsidian-aff)
- [GitHub Copilot](https://example.com/copilot-aff)
 and  and see how they can integrate seamlessly with your Uncloud deployments to elevate your projects to the next level!**

## Conclusion: Embrace Simplicity, Unleash Productivity

In the quest for efficient software delivery, the right tools can make all the difference. For students eager to get their projects live and grasp real-world deployment, and for developers seeking to streamline their workflow without unnecessary complexity, **Uncloud** emerges as a clear frontrunner. It offers the power of multi-server container orchestration, zero-downtime deployments, and declarative configuration – all without the steep learning curve and operational overhead of Kubernetes.

Uncloud isn't just a deployment tool; it's an enabler. It empowers you to:
*   **Focus on what matters:** Writing great code and learning new concepts.
*   **Achieve more with less:** Get your applications running reliably across servers with minimal configuration.
*   **Iterate faster:** Deploy, test, and revert with confidence and speed.

Whether you're building your first full-stack application for a university course, launching a new SaaS side project, or managing internal tools for a small team, Uncloud provides the pragmatic, powerful solution you've been looking for.

Stop battling complex deployment infrastructure and start building with confidence. Give Uncloud a try today and experience the liberating power of simple, yet robust, container deployment. Your productivity will thank you!

## Frequently Asked Questions (FAQs) About Uncloud

### Is Uncloud free to use?
Yes, Uncloud is typically an open-source or free-to-use tool, making it highly accessible for students and individual developers. Always check the official repository or website for the most up-to-date licensing information.

### What kind of servers can Uncloud deploy to?
Uncloud can deploy to any server that has SSH access and Docker installed. This includes virtual machines (VMs) on cloud providers (AWS EC2, Google Cloud Compute Engine, Azure VMs), bare metal servers, or even local machines running Linux (or macOS with Docker Desktop).

### Can I use Uncloud with my CI/CD pipeline?
Absolutely! Uncloud is perfectly suited for integration into CI/CD pipelines. Since it's a CLI tool, you can simply add `uncloud deploy` as a step in your pipeline script (e.g., GitHub Actions, GitLab CI, Jenkins) after your code is built and container images are pushed.

### How does Uncloud handle persistent storage?
Uncloud leverages Docker volumes for persistent storage. You define volumes in your `uncloud.yaml` configuration, and Uncloud will ensure those volumes are created and mounted to your containers on the target servers. For more advanced, shared persistent storage solutions across multiple nodes, you would typically rely on your underlying infrastructure (e.g., network file systems like NFS, or cloud provider-specific storage options).

### What's the learning curve for Uncloud?
The learning curve for Uncloud is remarkably low, especially if you're already familiar with Docker and basic YAML syntax. The configuration files are straightforward, and the commands are intuitive. Most users can get their first application deployed within minutes of setting it up.

### Does Uncloud offer load balancing?
Uncloud itself doesn't provide advanced load balancing out-of-the-box like Kubernetes' Service objects. However, you can easily set up a reverse proxy like Nginx or Caddy (deployed as another Uncloud service) in front of your application containers to handle basic load balancing or act as an ingress point.

### What if I need to scale my application significantly in the future?
Uncloud is excellent for small to medium scale. If your application grows to require massive scale, aggressive auto-scaling, or complex distributed patterns, migrating to Kubernetes or a managed cloud platform might become a consideration. The good news is that by using Docker and Uncloud, you've already built your application in a containerized, cloud-native friendly way, making a potential transition smoother.