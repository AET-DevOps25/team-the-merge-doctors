# Kubernetes and Helm

## Kubernetes Setup

1. Download kube config file from cluster.
2. Place it at `~/.kube/config`

## Project Setup

1. Copy `values.yaml.template` and rename it to `values.yaml`.

## Deploy

Run the following command in this directory to deploy the application to the cluster.

```
helm upgrade --install mentor-pulse . --namespace team-the-merge-doctors
```
