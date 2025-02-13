# **Monitoring Setup Guide**

## **Step 1: Installed Prometheus and Grafana using Helm**
- I installed Helm and added the Prometheus community Helm repository.
- Then, I installed Prometheus and Grafana using the following Helm commands

## **Step 2: Exposed Ports for Prometheus and Grafana**
- I configured Prometheus to be accessible on port **9090** (Port Forwarding )
- I configured Grafana to be accessible on port **3000** (Port Forwarding)

## **Step 3: Accessed Prometheus and Ran Queries**
- I accessed **Prometheus** on port no. **9090**.
- I executed **PromQL queries** to fetch relevant metrics.

## **Step 4: Set Up Grafana Dashboard for Kubernetes Metrics**
- I accessed **Grafana** at  port number **3000**, logged in with default credentials (admin/prom-operator.
- I added **Prometheus** as a data source.
- Then, I imported a predefined Kubernetes monitoring dashboard from Grafana Labs for better visualization.

## **Step 5: Visualizing Metrics in Grafana**
- I created panels in Grafana to track resource usage, pod performance, and alerts.
- The setup provides a clear and insightful monitoring system for the Kubernetes cluster.

The monitoring system is fully set up and running efficiently!

