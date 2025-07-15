# Kubernetes and Helm

## Kubernetes Setup

1. Download kube config file from cluster.
2. Place it at `~/.kube/config`

## Deploy

Run the following command in this directory to deploy the application to the cluster.

```
helm upgrade --install mentor-pulse . --namespace team-the-merge-doctors
```

## Remove Deployment

To remove the deployment and delete everything from cluster, execute the following command.

```
kubectl delete all --all -n team-the-merge-doctors
```
