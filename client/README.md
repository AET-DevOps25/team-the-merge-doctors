# MentorPulse Client

# Docker

In the client directory execute the following commands

To build the image:

```
docker build -t mentor-pulse-client-image .
```

To run the container:

```
docker run -d --name mentor-pulse-client-container -p 80:80 mentor-pulse-client-image
```
