# Kubernetes and Helm

## Kubernetes Setup

1. Download kube config file from cluster.
2. Place it at `~/.kube/config`

## Deploy

Run the following commands in this directory to deploy the application to the cluster.
The first two commands only need to be executed once.

1. Generate JWT secret key

```
../docker/backend_config_files/jwk-key-generator.sh
```

2. Create Secret in Kubernetes

```
kubectl create secret generic jwt-secret \
  --from-file=jwt-secret.key=</path/to/local>/jwt-secret.key \
  -n <namespace>
```

3. Deploy to cluster

```
helm upgrade --install mentor-pulse . --namespace team-the-merge-doctors
```

## Remove Deployment

To remove the deployment and delete everything from cluster, execute the following command.

```
kubectl delete all --all -n team-the-merge-doctors
```
