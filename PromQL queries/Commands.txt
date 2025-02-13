1) Check Running Pods in "enigmus-namespace" 
```
count by (pod) (kube_pod_status_phase{namespace="enigmus-namespace", phase="Running"})

```

2) Check CPU Usage for All Pods
```
sum(rate(container_cpu_usage_seconds_total{namespace="enigmus-namespace"}[1m])) by (pod)

```

3) Check Memory Usage for All Pods
```
sum(container_memory_usage_bytes{namespace="enigmus-namespace"}) by (pod)

```

4) Check Disk Usage for All Pods
```
sum(container_fs_usage_bytes{namespace="enigmus-namespace"}) by (pod)

```
