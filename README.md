# Enigmus Project - CI/CD Pipeline with Jenkins, Kubernetes, and Security Scanning

## **Overview**
This project automates the deployment of an application using **Terraform, Ansible, Jenkins, Docker, and Kubernetes (Minikube)**. The CI/CD pipeline integrates **SonarQube, Trivy, and OWASP Dependency-Check** for security and quality analysis.

---

## **Project Workflow**
1. **Provisioning EC2 Instances** 🖥️  
   - Used **Terraform** to create **two EC2 instances** (Master & Slave).  
   - Terraform scripts are available in the **Terraform/** folder.

2. **Configuring Master & Slave Nodes** 🔗  
   - Installed **Ansible on the Master node**.  
   - Configured **SSH key-based authentication** to allow Master to communicate with the Slave.  
   - Installed essential tools (**Docker, Java, Minikube**) on the Slave using an **Ansible Playbook (`install_tool.yaml`)**.  
   - Inventory file (`hosts`) is set up on the Master.

3. **Installing Jenkins & CI/CD Setup** ⚙️  
   - Installed **Jenkins** on the Master.  
   - Installed required **plugins and tools** (Docker, SonarQube, Trivy, Dependency-Check).  
   - Created necessary **credentials** in Jenkins.

4. **CI/CD Pipeline** 🚀  
   - **Pulls code** from GitHub.  
   - **Cleans workspace**.  
   - **Performs security analysis**:
     - **SonarQube Analysis** for code quality.
     - **OWASP Dependency Check** for vulnerabilities.
     - **Trivy Scans** for filesystem & Docker image security.
   - **Builds and pushes Docker image** to [DockerHub](https://hub.docker.com/r/priyansh21).  
   - **Deploys the application** on the Slave node using Kubernetes.  
   - **Creates a new Kubernetes namespace** and exposes the service.  

---

## **Technologies Used**
| Tool | Purpose |
|------|---------|
| Terraform | Infrastructure as Code (Provisioning EC2 instances) |
| Ansible | Configuration Management (Installing tools on Slave) |
| Jenkins | CI/CD Automation |
| Docker | Containerization |
| Kubernetes (Minikube) | Orchestration |
| SonarQube | Code Quality Analysis |
| Trivy | Security Scanning (Filesystem & Docker images) |
| OWASP Dependency-Check | Dependency Security Analysis |

---

## Pipeline Stages in Jenkins
Clean Workspace 🧹
Git Checkout 📥
SonarQube Analysis 🔍
OWASP Dependency Check 🔒
Trivy File System Scan 🛡️
Build Docker Image 🏗️
Trivy Docker Image Scan ⚠️
Push to DockerHub 📦
Run Container on Slave 🖥️
Create Kubernetes Namespace 📂
Deploy Application to Kubernetes ☸️
Expose Application 🌍

# Results

### Pipeline Flow
 ![Pipeline](Pictures/pipeline.png)
### Exported Ports ON Slave Node
   ![Exported Ports](Pictures/Export%20ports%20Slave.png)

### Project Info
   ![Projectinfo](Pictures/ProjectInfo.png)

### Application
   ![Application](Pictures/Export%20Application.png)


