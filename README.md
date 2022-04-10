# Dependencies

- Docker & Kubernetes

# Development

Start up listening to code changes and re-build the app:

```console
skaffold dev
```

Publish the common npm library:

```console
npm run pub
```

### Steps for new microservice creation

1. Create a package.json and install dependecies
2. Build a Docker image and push it to Docker Hub
3. Write the k8s files for deployment and service of the microservice
4. Write the k8s files for Mongodb deployment and service
5. Set up file sync options in the _skaffold.yaml_ file
6. Set up routing rules in the ingress service

### Usefull cmds

Kubernetes:

```console
  kubectl port-forwarding <pod_name> <source>:<target>
```

Docker:

- build image:

  ```console
    docker build -t <dockeruname/service> .
  ```

- push:
  ```console
    docer push <dockeruname/service>
  ```
